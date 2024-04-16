// import React, { useEffect, useState } from 'react';
// import { Container, Button, Box } from '@mui/material';
// import PieChart from './components/charts/PieChart';
// import BarChart from './components/charts/BarChart';
// import Filters from './components/common/Filters';
// import { fetchCategories, fetchProducts } from './services/api';
// import { Category, Product } from './interfaces/types';
// import useFilteredData from './hooks/useFilteredData';

// const App: React.FC = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<String | null>(null);
//   const [chartData, setChartData] = useState<Product[]>([]);
//   const [runReportEnabled, setRunReportEnabled] = useState<boolean>(false);
//   console.log(chartData)

//   useEffect(() => {
//     const initFetch = async () => {
//       const fetchedCategories = await fetchCategories();
//       const fetchedProducts = await fetchProducts();
//       setCategories(fetchedCategories);
//       setProducts(fetchedProducts);
//     };
//     initFetch();
//   }, []);

//   const handleCategoryChange = (categoryId: String) => {
//     setSelectedCategory(categoryId);
//     setRunReportEnabled(true);  // Enable the Run Report button when category changes
//   };

//   const handleRunReport = () => {
//     console.log('run report', selectedCategory)
//     if (selectedCategory !== null) {
//       const filteredProducts = useFilteredData(products, selectedCategory);
//       console.log('filtered products', filteredProducts)
//       setChartData(filteredProducts);
//       setRunReportEnabled(false);  // Disable Run Report button after running the report
//     }
//   };

//   const handleClearFilters = () => {
//     setSelectedCategory(null);
//     setChartData([]);  // Clear chart data
//     setRunReportEnabled(false);  // Ensure Run Report is disabled
//   };

//   return (
    // <Container maxWidth="lg">
    //   <h1>Market Trends Analysis</h1>
    //   <Box sx={{ marginBottom: 2 }}>
    //     <Filters categories={categories} onSelectCategory={handleCategoryChange} />
    //     <Button
    //       variant="contained"
    //       color="primary"
    //       onClick={handleRunReport}
    //       disabled={!runReportEnabled}
    //       sx={{ marginX: 1 }}
    //     >
    //       Run Report
    //     </Button>
    //     <Button
    //       variant="outlined"
    //       color="secondary"
    //       onClick={handleClearFilters}
    //     >
    //       Clear
    //     </Button>
    //   </Box>
    //   {selectedCategory === null ? (
    //     <PieChart categories={categories} />
    //   ) : (
    //     <BarChart data={chartData} />
    //   )}
    // </Container>
//   );
// };

// export default App;



import React, { useEffect, useState ,useMemo} from 'react';
import { Container, Grid, Paper, Box, Button } from '@mui/material';
import { fetchCategories, fetchProducts } from './services/api';
import { Category, Product } from './interfaces/types';
import Filters from './components/common/Filters';
import Chart from './components/charts/Chart';
import useFilteredData from './hooks/useFilteredData';
import PieChart from './components/charts/PieChart';
import BarChart from './components/charts/BarChart';
import Loader from './components/common/Loader';


const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const[loader,setLoader] = useState<boolean>(false)
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<String | ''>('');
  const [selectedProduct, setSelectedProduct] = useState<String[]>([]);;
  const [chartData, setChartData] = useState<Product[]>([]);
  const [runReportEnabled, setRunReportEnabled] = useState<boolean>(false);
  const filteredData = useMemo(() => products?.filter(p => p.category === selectedCategory), [products, selectedCategory]);
  
  
    useEffect(() => {
    const initFetch = async () => {
      const fetchedCategories = await fetchCategories();
      const fetchedProducts = await fetchProducts();
      setCategories(fetchedCategories);
      setProducts(fetchedProducts);
      
    };
    initFetch();

  }, []);


  // useEffect(() => {
  //   // Filter products based on selected items
  //   const newFilteredData = products.filter((product) =>selectedProduct.includes(product.brand)); 
  //   console.log("newfilreddata ",newFilteredData);
  //   setChartData(newFilteredData);
  // }, []);

  useEffect(()=>{
    if(selectedCategory === ''){
      setChartData(filteredData)
    }
    else{
      setRunReportEnabled(true)
    }
  })
  

  //   const handleCategoryChange = (categoryId: String) => {
  //   setSelectedCategory(categoryId);
  //   setRunReportEnabled(true);  
    
  // };


  const handleRunReport = () => {
    
    if (selectedCategory !== '') {
      setLoader(true)
    const newFilteredData = products.filter((product) =>selectedProduct.includes(product.brand)); 
    console.log("newfilreddata ",newFilteredData);
    setTimeout(() => setLoader(false), 3000);
    setChartData(newFilteredData);
    setRunReportEnabled(false);  
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
    setChartData([]);  // Clear chart data
    setSelectedProduct([])
    setRunReportEnabled(false);  // Ensure Run Report is disabled
  };

  useEffect(()=>{
    setChartData(filteredData);
  },[selectedCategory])
  

  return (
    <>
    <Container maxWidth="lg">
      <Grid container spacing={2} sx={{ marginTop: 4 }}>
        <Grid item xs={12} md={4}>
        <Button 
          variant="outlined"
          color="secondary"
          onClick={handleClearFilters}
        >
          Clear
        </Button>
          <Paper elevation={2}>
            <Box p={2}>
              <Filters
                categories={categories}
                products={filteredData}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                data={chartData}
                handleRunReport = {handleRunReport}
                runReportEnabled ={runReportEnabled}
                setRunReportEnabled= {setRunReportEnabled}
                
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={2}>
            <Box height={400} p={2}>

              {/* <Chart
                selectedCategory={selectedCategory}
                selectedProduct={selectedProduct}
              /> */}
              { loader ? <> <Loader/> </> : <>
              {selectedCategory === '' ? (
        <PieChart categories={categories} />
      ) : (
        <BarChart data={chartData} />
      )} </> }
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
    
    </>

  );
};

export default App;







// import React, { useState, useEffect } from 'react';
// import { Container, Grid, Button, Typography } from '@mui/material';
// import PieChart from './components/charts/PieChart';
// import BarChart from './components/charts/BarChart';
// import Filters from './components/common/Filters';
// import { fetchCategories, fetchProducts } from './services/api';
// fetch
// import { Category, Product } from './interfaces/types';

// const App: React.FC = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
//   const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
//   const [chartData, setChartData] = useState<Product[]>([]);
//   const [runReportEnabled, setRunReportEnabled] = useState<boolean>(false);

//   useEffect(() => {
//     // Initialize categories and products here
//     fetchCategories()
//     fetchProducts()
//   }, []);

//   // Handler functions go here

//   return (
//     <Container maxWidth="lg">
//       <Typography variant="h4" component="h1" gutterBottom>
//         Products Dashboard
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={4}>
//           <Typography variant="h6" component="h2">
//             Filters
//           </Typography>
//           <Filters 
//             categories={categories} 
//             products={products}
//             selectedCategory={selectedCategory} 
//             selectedProduct={selectedProduct}
//             onCategoryChange={setSelectedCategory}
//             onProductChange={setSelectedProduct}
//             onClearFilters={() => {
//               setSelectedCategory(null);
//               setSelectedProduct(null);
//               setChartData([]);
//               setRunReportEnabled(false);
//             }}
//           />
//           <Button 
//             variant="contained" 
//             color="primary" 
//             onClick={() => console.log('Run Report')} 
//             disabled={!runReportEnabled}
//           >
//             Run Report
//           </Button>
//         </Grid>
//         <Grid item xs={12} md={8}>
//           {/* Conditionally render PieChart or BarChart based on state */}
//           {selectedCategory === null ? (
//             <PieChart categories={categories} />
//           ) : (
//             <BarChart data={chartData} />
//           )}
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default App;


