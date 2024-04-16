// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import { Product } from '../../interfaces/types';

// interface BarChartProps {
//   data: any[]; // Adjust type based on your data structure
// }


// const BarChart: React.FC<BarChartProps> = ({ data }) => {
//   console.log('dataaaaaaa',data)
//   const options: Highcharts.Options = {
//     chart: {
//       type: 'column'
//     },
//     title: {
//       text: 'Product Data'
//     },
//     series: [
//       {
//         name: 'Products',
//         type: 'column',
//         data: data.map((item) => ({
//           name: item.brand,
//           y: item.price,
          
//         }))
//       }
//     ]
//   };

//   return <HighchartsReact highcharts={Highcharts} options={options} />;
// };

// export default BarChart;






import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// import { Product } from '../../interfaces/types';

interface BarChartProps {
  data: any[]; // Adjust type based on your data structure
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  console.log('dataaaaaaa', data);

  const options: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Product Data'
    },
    xAxis: {
      categories: data.map((item) =>  item.brand), // Assuming either name or title exists
      title: {
        text: 'Item Name | Title'
      }
    },
    yAxis: {
      title: {
        text: 'Price'
      }
    },
    series: [
            {
              name: 'Products',
              type: 'column',
              data: data.map((item) => ({
                name: item.brand,
                y: item.price,
                
              }))
            }
          ]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;






