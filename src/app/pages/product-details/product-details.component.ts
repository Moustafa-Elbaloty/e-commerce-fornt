import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/products.service';


export interface Product {
  _id?: string;
  name: string;
  price: number;
  description: string;
  image: string;
  images?: string[];
  brand?: string;
  category?: string;
  stock?: number;
}



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  product!: Product;
  loading = true;
  error = false;

  // Gallery
  mainImage = '';
  thumbnails: string[] = [];

  // Quantity
  quantity = 1;

  // Reviews
  expandedReviewIndex: number | null = 0;

  private routeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // ✅ react to route param changes
    this.routeSub = this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.fetchProduct(productId);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  /* ===============================
     Fetch product
  ================================ */
  fetchProduct(productId: string): void {
    this.loading = true;
    this.error = false;

    this.productService.getProductById(productId).subscribe({
      next: (res) => {
        if (!res?.product) {
          this.error = true;
          this.loading = false;
          return;
        }

        this.product = res.product;

        // Gallery safety
        this.mainImage = this.product.image || '';
        this.thumbnails = this.product.images?.length
          ? this.product.images
          : this.product.image
          ? [this.product.image]
          : [];

        this.quantity = 1;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  /* ===============================
     Gallery
  ================================ */
  changeProductImage(img: string): void {
    this.mainImage = img;
  }

  /* ===============================
     Quantity
  ================================ */
  updateQuantity(change: number): void {
    this.quantity = Math.max(1, this.quantity + change);
  }

  /* ===============================
     Cart
  ================================ */
  addToCart(): void {
    if (!this.product) return;

    console.log('Added to cart:', {
      product: this.product,
      quantity: this.quantity,
    });

    // لاحقًا:
    // this.cartService.add(this.product, this.quantity);
  }

  /* ===============================
     Reviews
  ================================ */
  toggleReview(index: number): void {
    this.expandedReviewIndex =
      this.expandedReviewIndex === index ? null : index;
  }
}
