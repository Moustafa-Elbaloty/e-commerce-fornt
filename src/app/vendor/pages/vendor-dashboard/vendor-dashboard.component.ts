import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/products.service';
import { VendorService } from '../../services/vendor.service';
/* ===============================
   Interfaces
================================ */

interface VendorStats {
  totalProducts: number;
  totalStock: number;
  totalValue: number;
  pendingOrders?: number;

  productsGrowth?: string;
  stockGrowth?: string;
  valueGrowth?: string;
}

interface ProductForm {
  name: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
  description: string;
}

/* ===============================
   Component
================================ */

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css'],
})
export class VendorDashboardComponent implements OnInit {
  /* ===== Dashboard ===== */
  stats!: VendorStats;
  loadingDashboard = true;

  /* ===== Product Form ===== */
  product: ProductForm = this.getEmptyProduct();
  imageFile: File | null = null;
  creatingProduct = false;

  constructor(
    private productService: ProductService,
    private vendorService: VendorService
  ) {}

  /* ===============================
     Lifecycle
  ================================ */
  ngOnInit(): void {
    this.loadDashboard();
    this.loadVendorProducts(); // 👈 المنتجات
  }

  /* ===============================
     Dashboard Data
  ================================ */
  loadDashboard(): void {
    this.vendorService.getVendorDashboard().subscribe({
      next: (res: any) => {
        this.stats = res.stats;
        this.loadingDashboard = false;
      },
      error: (err) => {
        console.error('❌ Error loading dashboard', err);
        this.loadingDashboard = false;
      },
    });
  }

  /* ===============================
     Image Select
  ================================ */
  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.imageFile = input.files[0];
  }

  /* ===============================
     Create Product
  ================================ */
  createProduct(): void {
    const formData = new FormData();

    formData.append('name', this.product.name);
    formData.append('price', this.product.price.toString());
    formData.append('stock', this.product.stock.toString());
    formData.append('category', this.product.category);
    formData.append('brand', this.product.brand);
    formData.append('description', this.product.description);

    if (this.imageFile) {
      formData.append('image', this.imageFile); // 👈 لازم الاسم image
    }

    this.vendorService.createProduct(formData).subscribe({
      next: (res: any) => {
        console.log(res);
        alert('✅ Product added successfully');

        this.resetForm();
        this.loadDashboard(); // تحديث الإحصائيات والجدول
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || '❌ Failed to add product');
      },
    });
  }

  /* ===============================
     Stock Status
  ================================ */
  products: any[] = [];

  getStockStatus(stock: number): string {
    if (stock === 0) return 'out';
    if (stock <= 10) return 'low';
    return 'in';
  }
  /* ===============================
     Helpers
  ================================ */
  private buildFormData(): FormData {
    const formData = new FormData();

    Object.entries(this.product).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    return formData;
  }

  private resetForm(): void {
    this.product = this.getEmptyProduct();
    this.imageFile = null;
  }

  private getEmptyProduct(): ProductForm {
    return {
      name: '',
      price: 0,
      stock: 0,
      category: '',
      brand: '',
      description: '',
    };
  }
  loadingProducts = true;
  /* ===============================
   Load Vendor Products
================================ */
  loadVendorProducts(): void {
  this.vendorService.getVendorProducts().subscribe({
    next: (res: any) => {
      console.log('PRODUCTS RESPONSE:', res); // 👈 هتشوف الداتا
      this.products = res.data;               // 👈 مهم
      this.loadingProducts = false;           // 👈 مهم
    },
    error: (err) => {
      console.error(err);
      this.loadingProducts = false;
    }
  });
}

}
