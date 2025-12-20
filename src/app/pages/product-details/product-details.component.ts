import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';

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
  product: Product | null = null;
  loading = true;
  error = false;

  // Gallery
  mainImage = '';
  thumbnails: string[] = [];

  // Quantity
  quantity = 1;

  private routeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  // ===============================
  // Lifecycle
  // ===============================
  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');

      if (!productId) {
        this.error = true;
        this.loading = false;
        return;
      }

      this.fetchProduct(productId);
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  // ===============================
  // Fetch product
  // ===============================
  fetchProduct(productId: string): void {
    this.loading = true;
    this.error = false;

    this.productService.getProductById(productId).subscribe({
      next: (res: any) => {
        // ✅ backend بيرجع المنتج داخل data
        const product = res?.data;

        if (!product) {
          this.error = true;
          this.loading = false;
          return;
        }

        this.product = product;

        // 🖼 Gallery
        this.mainImage = product.image;
        this.thumbnails = product.images?.length
          ? product.images
          : [product.image];

        this.quantity = 1;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  // ===============================
  // Gallery
  // ===============================
  changeProductImage(img: string): void {
    this.mainImage = img;
  }

  // ===============================
  // Quantity
  // ===============================
  updateQuantity(change: number): void {
    this.quantity = Math.max(1, this.quantity + change);
  }

  // ===============================
  // Cart
  // ===============================
  addToCart(): void {
    if (!this.product?._id) return;

    this.cartService.addToCart(this.product._id, this.quantity).subscribe({
      next: () => {
        alert(`✅ ${this.product?.name} added to cart`);
      },
      error: () => {
        alert('❌ Failed to add product');
      },
    });
  }
}
