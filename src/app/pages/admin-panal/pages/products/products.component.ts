import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];
  loading = false;
  error = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';

    this.adminService.getAllProducts().subscribe({
      next: (res: any) => {
        console.log('ADMIN PRODUCTS RESPONSE:', res);

        if (Array.isArray(res)) {
          this.products = res;
        } else if (res?.data && Array.isArray(res.data)) {
          this.products = res.data;
        } else if (res?.products && Array.isArray(res.products)) {
          this.products = res.products;
        } else {
          this.products = [];
        }

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load products';
        this.loading = false;
      }
    });
  }

  deleteProduct(productId: string): void {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.adminService.deleteProduct(productId).subscribe({
      next: () => {
        this.products = this.products.filter(p => p._id !== productId);
      },
      error: () => {
        alert('Failed to delete product');
      }
    });
  }
}
