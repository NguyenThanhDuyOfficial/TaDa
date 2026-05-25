export interface Product {
  id: string;
  name: string;
  sku: string | undefined;
  price: number;
  stock: number;
  category: string | undefined;
  status: 'active' | 'inactive' | 'draft';
  description?: string;
  supplier?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFormData {
  name: string;
  sku: string | undefined;
  price: number;
  stock: number;
  category: string | undefined;
  status: 'active' | 'inactive' | 'draft';
  description?: string;
  supplier?: string;
}
