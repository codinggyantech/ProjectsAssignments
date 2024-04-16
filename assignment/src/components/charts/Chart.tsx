import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import {ChartProps} from '../../interfaces/types'

const Chart: React.FC<ChartProps> = () => {
  // Dummy data for chart { selectedCategory, selectedProduct }
  const data = [
    { name: 'Product 1', data: [49.9] },
    { name: 'Product 2', data: [83.6] },
    { name: 'Product 3', data: [48.9] },
    // ...more products
  ];

  const options: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Products in selected Category',
    },
    // series: data,
    // Include additional chart configuration here...
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
};

export default Chart;
