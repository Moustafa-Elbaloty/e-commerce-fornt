import { Component } from '@angular/core';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'app-upload-product',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css'],
})
export class VendorDashboardComponent {
  product: any = {
    name: '',
    price: 0,
    stock: 0, // ✅ stock
    category: '',
    brand: '',
    description: '',
  };

  imageFile!: File;

  constructor(private productService: ProductService) {}

  onImageSelect(event: any): void {
    this.imageFile = event.target.files[0];
  }

  createProduct(): void {
    const formData = new FormData();

    formData.append('name', this.product.name);
    formData.append('price', this.product.price);
    formData.append('show', this.product.stock); // ❌ غلط (مثال)
    formData.append('stock', this.product.stock); // ✅ صح
    formData.append('category', this.product.category);
    formData.append('brand', this.product.brand);
    formData.append('description', this.product.description);

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    this.productService.createProduct(formData).subscribe({
      next: () => {
        alert('Product created successfully');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
