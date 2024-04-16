import { useMemo } from 'react';
import { Category, Product } from '../interfaces/types';

const useFilteredData = (products: Product[], categoryId: String) => {
  const filteredData = useMemo(() => products.filter(p => p.category === categoryId), [products, categoryId]);
  return filteredData;
};

export default useFilteredData;
