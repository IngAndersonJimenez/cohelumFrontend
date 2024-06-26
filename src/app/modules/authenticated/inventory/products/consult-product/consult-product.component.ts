import {Component, OnInit} from '@angular/core';
import {ProductFull} from "../../../../../interface/products/ProductFull";
import {InventoryService} from "../../../../../services/inventory.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../../../notifications/notification.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {InventoryImage} from "../../../../../interface/InventoryImage";
import {InventoryCategory} from "../../../../../interface/products/inventoryCategory";
import {SubCategory} from "../../../../../interface/products/SubCategory";
import {CategoryService} from "../../../../../services/category.service";
import {environment} from "../../../../../environments/environment";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


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
    public Editor = ClassicEditor;
    showUpdateDatasheetDialog: boolean = false;

    constructor(private fb: FormBuilder, private inventoryService: InventoryService, private sanitizer: DomSanitizer,
                private notificationService: NotificationService, private categoryService:CategoryService) {
        this.consultForm = this.fb.group({
            name: new FormControl('', Validators.required),
            reference: new FormControl('', Validators.required),

        });
        this.updateForm = this.fb.group({
            name: ['', Validators.required],
            reference: ['', Validators.required],
            price: ['', [Validators.required, Validators.pattern(/^\d+\.?\d*$/)]],
            unitsAvailable: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
            idCategory: [null, Validators.required],
            idSubCategory: [null],
            characteristic: [''],
            description: [''],
            datasheet: [''],
            image: [''],
            idInventoryImage: ['']
        });


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

    loadProducts(product: ProductFull) {
        const productName = product.name;
        const productReference = product.reference;
        if (productName.trim() !== '' && productReference.trim() !== '') {
            this.products = [];
            this.imageList = [];
            this.inventoryService.getInventoryByNameAndReference(productName,productReference).subscribe(
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
                            responseDTO.getInventorySubCategoryDTO.idSubCategory,
                            responseDTO.getInventoryDTO.reference
                        );
                        this.products.push(product);
                        this.getImageByProduct(responseDTO.getInventoryImageDTO);
                    }
                }
            );
        }
    }


    getImageByProduct(inventory: any) {
        const productName = this.consultForm.get('name')?.value;
        for (let iter of inventory) {
            const imageName = iter.image
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
            const productName = this.products[0].name;

            this.inventoryService.createImageProduct(this.products[0].idInventory, this.selectedFile, productName).subscribe(
                (data: any) => {
                    this.notificationService.showSuccess("Imagen Añadida al producto", "Correctamente");
                    // Actualiza la ruta de la imagen en el modelo de datos local
                    const newImageRoute = this.pathImage + data.responseDTO.image;
                    this.products[0].image = newImageRoute;

                    // Actualiza la lista local de imágenes
                    const newInventoryImage: InventoryImage = {
                        "idInventoryImage": data.responseDTO.idInventoryImage,
                        "image": newImageRoute,
                    };
                    this.imageList.push(newInventoryImage);
                    this.loadProducts(new ProductFull(
                        this.products[0].idInventory,
                        productName,
                        this.updateForm.get('price')?.value,
                        this.updateForm.get('unitsAvailable')?.value,
                        this.products[0].active,
                        this.updateForm.get('characteristic')?.value,
                        this.sanitizer.bypassSecurityTrustResourceUrl(newInventoryImage?.image ?? ''),
                        this.updateForm.get('idCategory')?.value,
                        this.updateForm.get('description')?.value,
                        this.updateForm.get('idInventoryImage')?.value,
                        this.updateForm.get('image')?.value,
                        this.updateForm.get('descriptionSubCategory')?.value,
                        this.updateForm.get('idSubCategory')?.value,
                        this.updateForm.get('reference')?.value,
                    ));
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
                input.value = null; // Limpiar la selección del archivo
                return;
            }

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

            if (type === 'image') {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.selectedImage = e.target.result;
                };
                reader.readAsDataURL(newFile);
                this.updateForm.patchValue({ image: newFile });
            }

            else if (type === 'pdf' && newFile !== this.updateForm.get('datasheet')?.value) {
                this.selectedPDFName = newFile.name;

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
        const product = this.products[0];
        const formData = this.createFormData(this.updateForm.value, product);

        this.inventoryService.updateProduct(formData, product.idInventory).subscribe(
            data => {
                this.closeUpdateDialog();
                this.reloadProductData();
            }
        );
    }



    createFormData(data: any, product?: ProductFull): FormData {
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('reference', data.reference);
        formData.append('price', data.price);
        formData.append('unitsAvailable', data.unitsAvailable);
        formData.append('idCategory', data.idCategory);
        formData.append('idSubCategory', data.idSubCategory);
        formData.append('characteristic', data.characteristic);
        return formData;
    }





    openUpdateDialog(product: ProductFull): void {
        this.subcategoriesFilter = [];
        this.updateForm.setValue({
            name: product.name,
            reference: product.reference,
            price: product.price,
            unitsAvailable: product.unitsAvailable,
            idCategory: product.idCategory,
            idSubCategory: product.idSubCategory || null,
            description: product.description,
            characteristic: product.characteristic,
            datasheet: '',
            image: '',
            idInventoryImage: ''
        });
        this.inventoryService.getCategory().subscribe((response: any) => {
            this.categories = response.responseDTO;
            this.showUpdateDialog = true;
            this.loadingCategories = false;
            this.subCategoryLoad({ target: { value: this.updateForm.get('idCategory')?.value } });
        });
    }



    openUpdateDialog2(productData: any): void {
        this.subcategoriesFilter = [];
        this.updateForm.get('idInventoryImage')?.setValue(productData)
        this.showUpdateImageDialog = true;
    }




    updateImage(): void {
        const formData = new FormData();
        const file: File = this.updateForm.get('image')?.value;
        const idInventoryImage = this.updateForm.get('idInventoryImage')?.value;

        if (file && file instanceof File) {
            formData.append('image', file);
            const fileName = file.name;

            this.inventoryService.updateImageProduct(formData, idInventoryImage, fileName).subscribe(
                (data: any) => {
                    const index = this.imageList.findIndex(image => image.idInventoryImage === idInventoryImage);
                    if (index !== -1) {
                        this.imageList[index].image = this.pathImage + data.responseDTO.image;
                        this.imageList = [...this.imageList];
                    }
                    this.closeUpdateImageDialog();
                }
            );
        }
    }


    loadImage(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.updateForm.get('image')?.setValue(file);
        }
    }
    closeUpdateImageDialog() {
        this.showUpdateImageDialog = false;
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
                this.sanitizer.bypassSecurityTrustResourceUrl( (this.updateForm.get('datasheet')?.value || '')),
                this.updateForm.get('idCategory')?.value,
                this.updateForm.get('description')?.value,
                this.updateForm.get('idInventoryImage')?.value,
                this.updateForm.get('image')?.value,
                this.updateForm.get('descriptionSubCategory')?.value,
                this.updateForm.get('idSubCategory')?.value,
                this.updateForm.get('reference')?.value
            ));
        }
    }

    deleteImage(idInventoryImage: number) {
        this.inventoryService.deleteInventoryImage(idInventoryImage).subscribe(
            data =>{
                this.imageList = this.imageList.filter(image => image.idInventoryImage !== idInventoryImage);
            }
        );
    }

    openUpdateDatasheetDialog(): void {
        this.showUpdateDatasheetDialog = true;
    }

    closeUpdateDatasheetDialog(): void {
        this.showUpdateDatasheetDialog = false;
    }

// Función para manejar la actualización del datasheet
    submitDatasheetUpdate(): void {
        if (this.updateForm.get('datasheet')?.value) {
            const datasheetFile = this.updateForm.get('datasheet')?.value;
            const inventoryId = this.products[0]?.idInventory;

            if (datasheetFile && inventoryId) {
                this.inventoryService.updatePDF(inventoryId, this.products[0].name, datasheetFile).subscribe(
                    response => {
                        this.notificationService.showSuccess("Actualización exitosa", "El datasheet se ha actualizado correctamente");
                        this.loadProducts(this.products[0]);
                    }
                );
            }
        }
        this.closeUpdateDatasheetDialog();
    }







    protected readonly environment = environment;
}
