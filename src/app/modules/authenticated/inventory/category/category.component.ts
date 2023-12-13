import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {InventoryService} from "../../../../services/inventory.service";
import {CategoryProducts} from "../../../../interface/products/CategoryProducts";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../../notifications/notification.service";

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],

})
export class CategoryComponent implements OnInit {

    addingCategory = false;
    categoryList: CategoryProducts[] = [];
    displayedColumns: string[] = ['idCategory', 'description', 'statusCategory', 'image', 'action'];
    dataSource = new MatTableDataSource<CategoryProducts>(this.categoryList);
    @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort!: MatSort;
    public productForm!: FormGroup;
    selectedImage: string | undefined;
    showAddingCategoryDialog:boolean = false;


    constructor(private inventoryService: InventoryService, private formBuilder: FormBuilder, private notificationService: NotificationService) {
    }


    private buildForm() {
        this.productForm = this.formBuilder.group({
            descriptionCategory: ['', Validators.required],
            image: ['', Validators.required],

        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnInit(): void {
        this.loadData()
        this.buildForm()
    }

    loadData() {
        this.categoryList = [];
        this.inventoryService.getCategoryAll().subscribe(
            (data: any) => {
                for (let iterDate of data.responseDTO.categoryFullDTOList) {
                    const categoryProduct = new CategoryProducts(
                        iterDate.getInventoryCategoryDTO.idCategory,
                        iterDate.getInventoryCategoryDTO.description,
                        iterDate.getInventoryCategoryDTO.active,
                        'data:image/png;base64,' + iterDate.getCategoryImageDTO.image
                    );

                    this.categoryList.push(categoryProduct);

                }
                this.refreshTable();
            }
        );
    }


    refreshTable() {
        this.dataSource = new MatTableDataSource<CategoryProducts>(this.categoryList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    addCategory() {
        this.showAddingCategoryDialog = true;
    }

    cancelAdd() {
        this.showAddingCategoryDialog = false;

    }


    onSubmit() {

        if (this.productForm.valid) {
            const formData = new FormData();
            formData.append('descriptionCategory', this.productForm.get('descriptionCategory')?.value);
            const isImageAttached = this.productForm.get('image')?.value !== null;
            if (isImageAttached) {
                formData.append('image', this.productForm.get('image')?.value);
            }

            this.inventoryService.createCategoryAndImage(formData).subscribe(
                result => {
                    this.productForm.reset();
                    this.loadData();
                    this.showAddingCategoryDialog = false;
                }
            );
        } else {
            console.log('El formulario no está completo. No se llama al servicio.');
        }
    }

    onFileSelected(event: any, type: string): void {
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

            const fileExtension = newFile.name.split('.').pop().toLowerCase();

            if (type === 'image' && !allowedImageExtensions.includes(fileExtension)) {
                this.notificationService.showError("Solo se permiten archivos de imagen (jpg, jpeg, png, gif).", "Vuelve a intentar");
                input.value = null;
                return;
            }

            if (type === 'image' && newFile !== this.productForm.get('image')?.value) {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.selectedImage = e.target.result;
                };
                reader.readAsDataURL(newFile);

                const formData = new FormData();
                formData.append('image', newFile);
                this.productForm.patchValue({image: formData.get('image')});
            }
        }
    }

    editCategory(category: CategoryProducts) {
        category.isEditing = true;
    }

    saveEditedCategory(category: CategoryProducts) {
        this.inventoryService.updateCategory(category.getIdCategory(), category.getStatusCategory(), category.getDescription()).subscribe(
            (result: any) => {
                if (result != null && result.responseDTO && 'active' in result.responseDTO) {
                    category.isEditing = false;
                    this.loadData()

                }
            },
        );
    }


    onFileSelected1(event: any, idCategory: number): void {
        const file: string = event.target.files[0];
        this.uploadImage(idCategory, file);

    }

    uploadImage(idCategory: number, file: string): void {
        this.inventoryService.updateCategoryImage(idCategory, file)
            .subscribe(response => {
                console.log(response);
            });
    }


    cancelEdit(category: CategoryProducts) {
        category.isEditing = false;
    }

}
