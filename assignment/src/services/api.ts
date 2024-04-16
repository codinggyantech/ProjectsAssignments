import axios from 'axios';
import { Category, Product } from '../interfaces/types';
export const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get('https://dummyjson.com/products/categories');
  return response.data.map((name: string, index: number) => ({ id: index, name }));
};



export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get('https://dummyjson.com/products');
  return response.data.products as Product[];
};
