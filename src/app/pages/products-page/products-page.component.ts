import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';

export interface Product {
  _id?: string;
  name: string;
  price: number;
  image: string;
  stars?: string;
  reviews?: number;
  category?: string;
  rating?: number;
  brand?: string;
  stock?: number;
}

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  // products
  products: Product[] = [];
  loading = false;
  product: Product | null = null;

  // pagination
  currentPage = 1;
  totalPages = 1;
  limit = 12;

  // filters
  selectedCategory: string | null = null;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;

  // ui
  isSidebarActive = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = +params['page'] || 1;
      this.limit = +params['limit'] || 12;

      this.selectedCategory = params['category'] || null;
      this.minPrice = params['minPrice']
        ? Number(params['minPrice'])
        : undefined;
      this.maxPrice = params['maxPrice']
        ? Number(params['maxPrice'])
        : undefined;
      this.rating = params['rating'] ? Number(params['rating']) : undefined;

      this.getProducts();

      // 👂 اسمع أي تغيير في المنتجات (search / load)
      this.productService.products$.subscribe((data) => {
        this.products = data;
      });
    });
  }

  // ===============================
  // API
  // ===============================
  getProducts(): void {
    this.loading = true;

    this.productService
      .getProducts({
        page: this.currentPage,
        limit: this.limit,
        category: this.selectedCategory,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        brand: this.selectedBrands.join(','),
      })
      .subscribe({
        next: (res: any) => {
          this.products = res.products.map((p: any) => ({
            ...p,
            stars: p.stars || this.buildStars(p.rating || this.rating || 4),
            reviews: p.reviews || Math.floor(Math.random() * 200) + 1,
          }));

          this.totalPages = res.totalPages;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        },
      });
  }

  // ===============================
  // Pagination
  // ===============================
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page !== this.currentPage) {
      this.updateQuery({ page });
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.updateQuery({ page: this.currentPage + 1 });
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.updateQuery({ page: this.currentPage - 1 });
    }
  }

  // ===============================
  // Filters
  // ===============================
  applyCategory(category: string): void {
    this.selectedCategory = category;
    this.updateQuery({ page: 1, category });
  }

  clearCategory(): void {
    this.selectedCategory = null;
    this.updateQuery({ page: 1, category: null });
  }

  applyFilters(): void {
    this.updateQuery({
      page: 1,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
    });
  }

  applyRating(r: number): void {
    this.rating = r;
    this.updateQuery({ page: 1, rating: r });
  }

  clearRating(): void {
    this.rating = undefined;
    this.updateQuery({ page: 1, rating: null });
  }

  // ===============================
  // Helpers
  // ===============================
  toggleSidebar(): void {
    this.isSidebarActive = !this.isSidebarActive;
  }

  private updateQuery(params: any): void {
    this.router.navigate([], {
      queryParams: {
        limit: this.limit,
        ...params,
      },
      queryParamsHandling: 'merge',
    });
  }

  private buildStars(rating: number): string {
    return '★★★★★☆☆☆☆☆'.slice(5 - rating, 10 - rating);
  }

  // ===============================
  // Brands
  // ===============================

  brand: string[] = ['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Huawei', 'Other'];

  selectedBrands: string[] = [];
  brandSearch = '';

  get filteredBrands(): string[] {
    return this.brand.filter((b) =>
      b.toLowerCase().includes(this.brandSearch.toLowerCase())
    );
  }

  toggleBrand(brand: string): void {
    if (this.selectedBrands.includes(brand)) {
      this.selectedBrands = this.selectedBrands.filter((b) => b !== brand);
    } else {
      this.selectedBrands = [...this.selectedBrands, brand];
    }

    this.updateQuery({
      page: 1,
      brand: this.selectedBrands.join(','),
    });
  }

  clearBrands(): void {
    this.selectedBrands = [];
    this.updateQuery({
      page: 1,
      brand: null,
    });
  }
  quantity = 1;

  // ===============================
  // Cart
  // ===============================
  addToCart(product: Product, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    if (!product._id) return;

    this.cartService.addToCart(product._id, 1).subscribe({
      next: () => {
        alert(`✅ ${product.name} added to cart`);
      },
      error: () => {
        alert('❌ Failed to add product');
      },
    });
  }
}
