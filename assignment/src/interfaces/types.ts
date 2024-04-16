export interface Category {
    id: number;
    name: string;
  }
  
  export interface Product {
    id: number;
    name: string;
    category: String;
    title: String,
    price: number,
    brand: String
  }
  
 export interface ChartProps {
    selectedCategory: String | '';
    selectedProduct: String | '';
  }