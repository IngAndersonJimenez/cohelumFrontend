import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {InventoryService} from "../../../services/inventory.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {CommentService} from "../../../services/comment.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../../services/login.service";
import {InventoryComments} from "../../../interface/comment/InventoryComments";

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.scss']
})
export class InventoryDetailComponent implements OnInit{

  images: any[] | undefined;
  categoryId: number | null = null;
  details: any | null;
  pdfUrl: SafeResourceUrl;
  commentForm!:FormGroup
  selectedStarColor: string = '#808080';
  comments: InventoryComments[] = [];
  averageRating: number = 0;
  @ViewChild('reviewSection') reviewSection: ElementRef | undefined;


  position: string = 'bottom';

  scrollToReview() {
    if (this.reviewSection && this.reviewSection.nativeElement) {
      this.reviewSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  positionOptions = [
    {
      label: 'Bottom',
      value: 'bottom'
    },
    {
      label: 'Top',
      value: 'top'
    },
    {
      label: 'Left',
      value: 'left'
    },
    {
      label: 'Right',
      value: 'right'
    }
  ];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(private route: ActivatedRoute, private inventoryService:InventoryService,private sanitizer: DomSanitizer,
              private commentService:CommentService,private formBuilder: FormBuilder,private loginService:LoginService) {
    this.images =
      [
        {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg',
          alt: 'Description for Image 1',
          title: 'Title 1'
        },
        {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg',
          alt: 'Description for Image 2',
          title: 'Title 2'
        },
        {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3s.jpg',
          alt: 'Description for Image 3',
          title: 'Title 3'
        }
      ]
    this.reviewSection = undefined;
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/pdf/LM350.PDF');
  }

  private buildForm() {
    this.commentForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      review: ['', Validators.required],
      qualification:[null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.buildForm()
    this.categoryId = this.inventoryService.getSelectedCategoryId();
    this.details = this.inventoryService.getSelectedInventoryDetails();
    this.getTokenPublic();
  }

  private getTokenPublic() {
    this.loginService.getTokenPublicS().subscribe(data => {
          this.getComment(data.token);
        }
    );
  }



  getComment(token: string): void {
    this.commentService.getComment(token).subscribe(
        (data: any) => {
          console.log('Respuesta del servicio:', data);
          if (Array.isArray(data.responseDTO)) {
            this.comments = data.responseDTO;
            console.log('Comentarios:', this.comments);
            this.updateStarRating();
          }
        }
    );
  }

   getTokenPublic1() {
    this.loginService.getTokenPublicS().subscribe(data => {
          this.createComment(data.token);
        }
    );
  }


  createComment(token:string) {
    if (this.commentForm.valid) {
      const newComment: InventoryComments = this.commentForm.value;

      this.commentService.createInventoryComment(newComment,token).subscribe(
          response => {
            console.log('Respuesta del servidor:', response);
            this.commentForm.reset();
            this.getComment(token)
          }
      );
    }
  }


  setSelectedStarColor(color: string, index: number): void {
    this.selectedStarColor = color;
    this.commentForm.get('qualification')?.setValue(index + 1);
  }


  getRatingLabel(qualification: number | null): string {
    if (qualification === 1) {
      return ' Mala nota';
    } else if (qualification === 2) {
      return ' Más o menos';
    } else if (qualification === 3) {
      return ' Bueno';
    } else if (qualification === 4) {
      return ' Excelente';
    } else if (qualification === 5) {
      return ' Súper excelente';
    } else {
      return '';
    }
  }


  getStarsArray(qualification: number): number[] {
    return new Array(5).fill(0).map((_, index) => index < qualification ? index + 1 : 0);
  }

  updateStarRating() {
    if (this.comments.length === 0) {
      return;
    }

    const totalRatingsSum = this.comments.reduce((sum, comment) => sum + comment.qualification, 0);
    this.averageRating = totalRatingsSum / this.comments.length;

  }



}
