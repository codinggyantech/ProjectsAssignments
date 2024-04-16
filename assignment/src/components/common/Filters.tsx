// import React from 'react';
// import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import { Category } from '../../interfaces/types';

// interface FiltersProps {
//   categories: Category[]; 
//   onSelectCategory: (id: String) => void;
// }

// const Filters: React.FC<FiltersProps> = ({ categories, onSelectCategory }) => {
//   return (
//     <FormControl fullWidth>
//       <InputLabel id="category-select-label">Category</InputLabel>
//       <Select
//         labelId="category-select-label"
//         id="category-select"
//         onChange={(event) => {console.log(event.target.value) ; onSelectCategory(event.target.value as String)}}
//         label="Category"
//       >
//         {categories.map((category) => (
//           <MenuItem key={category.id} value={category.name}>
//             {category.name}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// };

// export default Filters;



import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { Category, Product } from '../../interfaces/types';
import MultipleSelectChip from './MultipleSelectChip';

interface FiltersProps {
  categories: Category[];
  products: Product[];
  data:Product[];
  selectedCategory: String | '';
  setSelectedCategory: React.Dispatch<React.SetStateAction<String | ''>>;
  selectedProduct: String [] ;
  setSelectedProduct: React.Dispatch<React.SetStateAction<String[] | []>>;
  handleRunReport:any;
  setRunReportEnabled : React.Dispatch<React.SetStateAction<boolean>>;
  runReportEnabled:boolean;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  products,
  data,
  selectedCategory,
  setSelectedCategory,
  selectedProduct,
  setSelectedProduct,
  handleRunReport,
  setRunReportEnabled,
  runReportEnabled
  
}) => {
  // const [runReportEnabled, setRunReportEnabled] = useState<boolean>(false);



  // const handleRunReport = () => {
  //   console.log('run report', selectedCategory)
  //   if (selectedCategory !== '' ) {
      
  //     // console.log('filtered products', filteredData)
  //     // setChartData(filteredData);
  //     setRunReportEnabled(false);  // Disable Run Report button after running the report
  //   }
  // };
   const names =  data.map((obj) => obj["brand"]);;
  return (
    <>
      {/* Category Select */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="category-select-label">Select Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={selectedCategory}
          label="Select Category"
          onChange={(e) => setSelectedCategory(e.target.value as String)}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Product Select */}
      {/* Similar structure to the category select, but filtering the products based on the selected category */}
      {/* <FormControl fullWidth margin="normal">
        <InputLabel id="category-select-label">Select Product</InputLabel>
        <Select
          labelId="select-label"
          id="product-select"
          value={selectedProduct}
          disabled={selectedCategory == ''}
          label="Select Product"
          onChange={(e) => setSelectedProduct(e.target.value as string)}
        >
            {products.map((product) => (
            <MenuItem key={product.id} value={product.title}>
              {product.title}
            </MenuItem>
          ))}
         
        </Select>
      </FormControl> */}
      <MultipleSelectChip names = {names} selectedCategory={selectedCategory} setSelectedProduct={setSelectedProduct} selectedProduct={selectedProduct}  />
      <Button
      onClick={handleRunReport}
      disabled={!runReportEnabled}
      sx={{ marginX: 1 }}
       variant="contained" color="primary" fullWidth>
        Run Report
      </Button>
    </>
  );
};

export default Filters;

