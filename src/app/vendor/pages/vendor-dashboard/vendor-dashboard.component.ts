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
}

interface ProductForm {
  name: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
  description: string;
}
interface UpdateProductResponse {
  success: boolean;
  data: any;
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

  /* ===== Products ===== */
  products: any[] = [];
  loadingProducts = true;
  editingProduct: any = null;

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
    this.loadVendorProducts();
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
     Vendor Products
  ================================ */
  loadVendorProducts(): void {
    this.vendorService.getVendorProducts().subscribe({
      next: (res: any) => {
        this.products = res.data;
        this.loadingProducts = false;
      },
      error: (err) => {
        console.error(err);
        this.loadingProducts = false;
      },
    });
  }

  /* ===============================
     Stock Status
  ================================ */
  getStockStatus(stock: number): string {
    if (stock === 0) return 'out';
    if (stock <= 10) return 'low';
    return 'in';
  }

  /* ===============================
     Image Select
  ================================ */
  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    this.imageFile = input.files[0];
  }

  /* ===============================
     Create Product
  ================================ */
  createProduct(): void {
    this.creatingProduct = true;

    const formData = new FormData();
    Object.entries(this.product).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    this.vendorService.createProduct(formData).subscribe({
      next: () => {
        alert('✅ Product added successfully');
        this.resetForm();
        this.loadDashboard();
        this.loadVendorProducts();
        this.creatingProduct = false;
      },
      error: (err) => {
        alert(err.error?.message || '❌ Failed to add product');
        this.creatingProduct = false;
      },
    });
  }

  /* ===============================
     Edit Product
  ================================ */
  startEdit(product: any): void {
    this.editingProduct = { ...product };
  }

  cancelEdit(): void {
    this.editingProduct = null;
  }

  updateProduct(): void {
  if (!this.editingProduct?._id) return;

  this.productService
    .updateProduct(this.editingProduct._id, this.editingProduct)
    .subscribe({
      next: (res) => {
        const index = this.products.findIndex(
          (p) => p._id === this.editingProduct._id
        );

        if (index !== -1) {
          this.products[index] = res.data; // ✅ مفيش error دلوقتي
        }

        alert('✅ Product updated successfully');
        this.editingProduct = null;
      },
      error: () => {
        alert('❌ Failed to update product');
      },
    });
}

  /* ===============================
     Delete Product
  ================================ */
  deleteProduct(productId: string): void {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.products = this.products.filter((p) => p._id !== productId);
        alert('🗑 Product deleted');
        this.loadDashboard();
      },
      error: () => {
        alert('❌ Failed to delete product');
      },
    });
  }

  /* ===============================
     Helpers
  ================================ */
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
}
