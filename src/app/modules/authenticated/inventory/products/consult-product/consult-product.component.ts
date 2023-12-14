import {Component, OnInit} from '@angular/core';
import {ProductFull} from "../../../../../interface/products/ProductFull";
import {InventoryService} from "../../../../../services/inventory.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NotificationService} from "../../../../../notifications/notification.service";
import {DomSanitizer} from "@angular/platform-browser";
import {InventoryImage} from "../../../../../interface/InventoryImage";
import {InventoryCategory} from "../../../../../interface/products/inventoryCategory";


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

    constructor(private fb: FormBuilder, private inventoryService: InventoryService, private sanitizer: DomSanitizer, private notificationService: NotificationService) {
        this.consultForm = this.fb.group({
            name: [''],
            price: [''],
            unitsAvailable: [''],
            description: [''],
            characteristic: [''],
            datasheet: [''],
            image: ['']
        });
        this.updateForm = this.fb.group({
            name: [''],
            price: [''],
            unitsAvailable: [''],
            idCategory: [null],
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

            this.inventoryService.getInventoryByName(productName).subscribe(
                (data: any) => {
                    const responseDTO = data.responseDTO;

                    if (responseDTO) {
                        const product = new ProductFull(
                            responseDTO.getInventoryDTO.idInventory,
                            responseDTO.getInventoryDTO.name,
                            responseDTO.getInventoryDTO.price,
                            responseDTO.getInventoryDTO.unitsAvailable,
                            responseDTO.getInventoryDTO.active,
                            responseDTO.getInventoryDetailsDTO.characteristic,
                            this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + (responseDTO.getInventoryDetailsDTO.datasheet || '')),
                            responseDTO.getInventoryCategoryDTO.idCategory,
                            responseDTO.getInventoryCategoryDTO.description,
                            responseDTO.getInventoryImageDTO[0].idInventoryImage,
                            'data:image/png;base64,' + responseDTO.getInventoryImageDTO[0].image
                        );

                        this.products.push(product);
                        this.getImageByProduct(responseDTO.getInventoryImageDTO)

                    }

                }
            );
        }
    }

    getImageByProduct(inventory:any){
        let inventoryImage : InventoryImage;
        for (let iter of inventory){

            inventoryImage = {
                "idInventoryImage":iter.idInventoryImage,
                "image":  'data:image/png;base64,' +  iter.image,
            }
            this.imageList.push(inventoryImage)

        }
    }


    ngOnInit(): void {
        this.consultForm.get('name')?.valueChanges.subscribe(() => {
            this.products = [];
        });
    }

    addImage(): void {
        if (this.products[0].idInventory && this.selectedFile) {

            this.inventoryService.createImageProduct(this.products[0].idInventory, this.selectedFile).subscribe(
                (data: InventoryImage) => {
                    this.notificationService.showSuccess("Imagen Añadida al producto", "Correctamente")
                    this.loadProducts(this.products[0])
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
    }

    updateProduct(formdata:FormData,idInventory:number){
        this.inventoryService.updateProduct(formdata,idInventory).subscribe(
            (data) =>{
                const updatedProductName = this.updateForm.get('name')?.value;
                this.closeUpdateDialog()
                this.loadProducts(updatedProductName)
            }
        )
    }

    submitUpdateForm() {
        const formdata = this.updateForm.value;
        this.updateProduct(this.createFormData(formdata),this.products[0].idInventory);
    }


    createFormData(data: any): FormData {

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('unitsAvailable', data.unitsAvailable);
        formData.append('idCategory', this.updateForm.get('idCategory')?.value);
        formData.append('characteristic', data.characteristic);
        formData.append('datasheet', this.updateForm.get('datasheet')?.value);

        return formData;
    }

    openUpdateDialog(product: ProductFull): void {

        this.updateForm.setValue({
            name: product.name,
            price: product.price,
            unitsAvailable: product.unitsAvailable,
            idCategory: product.idCategory,
            description:product.description,
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
            }
        );
    }

    openUpdateDialog2(productData: any): void {
        this.updateForm.get('idInventoryImage')?.setValue(productData)
        this.showUpdateImageDialog = true;
    }


    updateImage() {
        const formData = new FormData();
        formData.append('image', this.updateForm.get('image')?.value);

        const idInventoryImage = this.updateForm.get('idInventoryImage')?.value;

        this.inventoryService.updateImageProduct(formData, idInventoryImage).subscribe(
            (updatedProduct: ProductFull) => {
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


}
