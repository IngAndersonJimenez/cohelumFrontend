import {Component, OnInit} from '@angular/core';
import {ProductFull} from "../../../../../interface/products/ProductFull";
import {InventoryService} from "../../../../../services/inventory.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NotificationService} from "../../../../../notifications/notification.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {InventoryImage} from "../../../../../interface/InventoryImage";
import {InventoryCategory} from "../../../../../interface/products/inventoryCategory";
import {SubCategory} from "../../../../../interface/products/SubCategory";
import {CategoryService} from "../../../../../services/category.service";
import {environment} from "../../../../../environments/environment";


@Component({
    selector: 'app-consult-product',
    templateUrl: './consult-product.component.html',
    styleUrls: ['./consult-product.component.scss']
})
export class ConsultProductComponent implements OnInit {

    products: ProductFull[] = [];
    imageList: InventoryImage[] = [];
    consultForm: FormGroup;
    updateForm: FormGroup;
    responsiveOptions: any[] | undefined;
    selectedFile: string | undefined;
    currentImage: string | undefined;
    showImagePreview: boolean = false;
    categories!: InventoryCategory[];
    showUpdateDialog = false;
    loadingCategories: boolean = false;
    showUpdateImageDialog: boolean = false;
    selectedPDFName: string | undefined;
    selectedImage: string | undefined;
    subcategories: Array<SubCategory> = [];
    isActiveSubcategories: boolean = false;
    subcategoriesFilter: Array<SubCategory> = [];
    pathImage: string = environment.sourceImage;

    constructor(private fb: FormBuilder, private inventoryService: InventoryService, private sanitizer: DomSanitizer,
                private notificationService: NotificationService, private categoryService:CategoryService) {
        this.consultForm = this.fb.group({
            name: [''],
            price: [''],
            unitsAvailable: [''],
            description: [''],
            characteristic: [''],
            datasheet: [''],
            image: [''],
            descriptionSubCategory:['']
        });
        this.updateForm = this.fb.group({
            name: [''],
            price: [''],
            unitsAvailable: [''],
            idCategory: [null],
            idSubCategory:[null],
            characteristic: [''],
            description: [''],
            datasheet: [''],
            image: [''],
            idInventoryImage: []
        });

    }

    loadProducts(product: ProductFull) {
        const productName = product.name;
        if (productName && productName.trim() !== '') {
            this.products = [];
            this.imageList = [];
            this.inventoryService.getInventoryByName(productName).subscribe(
                (data: any) => {
                    const responseDTO = data.responseDTO;

                    if (data && data.responseDTO) {
                        const product = new ProductFull(
                            responseDTO.getInventoryDTO.idInventory,
                            responseDTO.getInventoryDTO.name,
                            responseDTO.getInventoryDTO.price,
                            responseDTO.getInventoryDTO.unitsAvailable,
                            responseDTO.getInventoryDTO.active,
                            responseDTO.getInventoryDetailsDTO.characteristic,
                            this.sanitizer.bypassSecurityTrustResourceUrl(environment.sourceImage + responseDTO.getInventoryDetailsDTO.datasheet),
                            responseDTO.getInventoryCategoryDTO.idCategory,
                            responseDTO.getInventoryCategoryDTO.description,
                            responseDTO.getInventoryImageDTO[0].idInventoryImage,
                            responseDTO.getInventoryImageDTO[0].image,
                            responseDTO.getInventorySubCategoryDTO.description,
                            responseDTO.getInventorySubCategoryDTO.idSubCategory
                        );
                        console.log('El pdf es:', product.datasheet);
                        this.products.push(product);
                        this.getImageByProduct(responseDTO.getInventoryImageDTO);
                    }
                }
            );
        }
    }


    getImageByProduct(inventory: any) {
        const productName = this.consultForm.get('name')?.value;
        console.log('Nombre que llega al get: ' , productName)
        for (let iter of inventory) {
            const imageName = iter.image
            console.log('Esto llega: ',this.pathImage + `${imageName}` )
            const inventoryImage: InventoryImage = {
                "idInventoryImage": iter.idInventoryImage,
                "image":this.pathImage + `${imageName}`,
            };
            this.imageList.push(inventoryImage);
        }
    }

    ngOnInit(): void {

    }

    addImage(): void {
        if (this.products[0].idInventory && this.selectedFile) {
            const idInventory = this.products[0].idInventory;
            const fileName = this.products[0].name;

            this.inventoryService.createImageProduct(idInventory, this.selectedFile, fileName).subscribe(
                (data: InventoryImage) => {
                    this.notificationService.showSuccess("Imagen Añadida al producto", "Correctamente");
                }
            );
        }
    }




    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0];
        if (this.selectedFile) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const imageSrc = e.target.result as string;
                this.openImagePreview(imageSrc);
            };
            reader.readAsDataURL(this.selectedFile as any);
        }
    }

    onFileSelected1(event: any, type: string): void {
        const input = event.target;
        const newFile = input.files ? input.files[0] : null;

        if (newFile) {
            const fileSizeInBytes = newFile.size;
            const maxSizeInBytes = 6 * 1024 * 1024;

            if (fileSizeInBytes > maxSizeInBytes) {
                this.notificationService.showError("El archivo excede el tamaño permitido (6 megabytes).", "Vuelve a intentar");
                input.value = null;
                return;
            }

            // Verificar la extensión del archivo
            const allowedImageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            const allowedPDFExtensions = ['pdf'];

            const fileExtension = newFile.name.split('.').pop().toLowerCase();

            if (type === 'image' && !allowedImageExtensions.includes(fileExtension)) {
                this.notificationService.showError("Solo se permiten archivos de imagen (jpg, jpeg, png, gif).", "Vuelve a intentar");
                input.value = null;
                return;
            } else if (type === 'pdf' && !allowedPDFExtensions.includes(fileExtension)) {
                this.notificationService.showError("Solo se permiten archivos PDF.", "Vuelve a intentar");
                input.value = null;
                return;
            }

            if (type === 'image' && newFile !== this.updateForm.get('image')?.value) {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.selectedImage = e.target.result;
                };
                reader.readAsDataURL(newFile);

                const formData = new FormData();
                formData.append('image', newFile);
                this.updateForm.patchValue({ image: formData.get('image') });
            } else if (type === 'pdf' && newFile !== this.updateForm.get('datasheet')?.value) {
                this.selectedPDFName = newFile.name;
                const reader = new FileReader();
                reader.onload = (e: any) => {
                };
                reader.readAsDataURL(newFile);

                const formData = new FormData();
                formData.append('datasheet', newFile);
                this.updateForm.patchValue({ datasheet: formData.get('datasheet') });
            }
        }
    }

    acceptImage(): void {
        this.addImage();
        this.closeImagePreview()
    }

    openImagePreview(imageSrc: string): void {
        this.currentImage = imageSrc;
        this.showImagePreview = true;
    }


    closeImagePreview(): void {
        this.showImagePreview = false;
    }

    closeUpdateDialog() {
        this.showUpdateDialog = false;
        this.subcategoriesFilter = [];
    }


    submitUpdateForm() {
        const formdata = this.updateForm.value;
        this.inventoryService.updateProduct(this.createFormData(formdata),this.products[0].idInventory).subscribe(
            data =>{
                this.closeUpdateDialog();
                this.reloadProductData()
            }
        )
    }


    createFormData(data: any): FormData {

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('unitsAvailable', data.unitsAvailable);
        formData.append('idCategory', this.updateForm.get('idCategory')?.value);
        formData.append('idSubCategory', this.updateForm.get('idSubCategory')?.value);
        formData.append('characteristic', data.characteristic);
        formData.append('datasheet', this.updateForm.get('datasheet')?.value);

        return formData;
    }

    openUpdateDialog(product: ProductFull): void {
        // Reinicia el array subcategoriesFilter
        this.subcategoriesFilter = [];

        this.updateForm.setValue({
            name: product.name,
            price: product.price,
            unitsAvailable: product.unitsAvailable,
            idCategory: '',
            idSubCategory: product.idSubCategory,
            description: product.description,
            characteristic: product.characteristic,
            datasheet: product.datasheet,
            image: '',
            idInventoryImage: ''
        });

        this.inventoryService.getCategory().subscribe(
            (response: any) => {
                this.categories = response.responseDTO;
                this.showUpdateDialog = true;
                this.loadingCategories = false;
                // Filtra las subcategorías iniciales
                this.subCategoryLoad({ target: { value: this.updateForm.get('idCategory')?.value } });
            }
        );
        this.categoryService.getSubcategory().subscribe(
            (response: any) => {
                for (let iter of response.responseDTO) {
                    this.subcategories.push(
                        new SubCategory(iter.idSubCategory, iter.description, iter.active, iter.idCategory)
                    );
                }

            },
        )
    }


    openUpdateDialog2(productData: any): void {
        this.subcategoriesFilter = [];
        this.updateForm.get('idInventoryImage')?.setValue(productData)
        this.showUpdateImageDialog = true;
    }


    updateImage() {
        const formData = new FormData();
        formData.append('image', this.updateForm.get('image')?.value);

        const idInventoryImage = this.updateForm.get('idInventoryImage')?.value;

        this.inventoryService.updateImageProduct(formData, idInventoryImage).subscribe(
            (data:any) => {
                this.reloadProductData()
                this.closeUpdateImageDialog();
            }
        );
    }


    closeUpdateImageDialog() {
        this.showUpdateImageDialog = false;
    }

    loadImage(image: any) {
        this.selectedFile = image.target.files[0];
        if (this.selectedFile) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
            };
            reader.readAsDataURL(this.selectedFile as any);
            this.updateForm.get('image')?.setValue(this.selectedFile)

        }
    }

    subCategoryLoad(event: any) {
        const idCategory = event.target.value;
        this.isActiveSubcategories = true;
        this.subcategoriesFilter = [];
        for (let iter of this.subcategories) {
            if (iter.getIdCategory() == idCategory) {
                this.subcategoriesFilter.push(iter);
            }
        }
    }


    reloadProductData() {
        const productName = this.consultForm.get('name')?.value;

        if (productName && productName.trim() !== '') {
            this.loadProducts(new ProductFull(
                this.products[0].idInventory,
                productName,
                this.updateForm.get('price')?.value,
                this.updateForm.get('unitsAvailable')?.value,
                this.products[0].active,
                this.updateForm.get('characteristic')?.value,
                this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + (this.updateForm.get('datasheet')?.value || '')),
                this.updateForm.get('idCategory')?.value,
                this.updateForm.get('description')?.value,
                this.updateForm.get('idInventoryImage')?.value,
                this.updateForm.get('image')?.value,
                this.updateForm.get('descriptionSubCategory')?.value,
                this.updateForm.get('idSubCategory')?.value
            ));
        }
    }


    protected readonly environment = environment;
}
