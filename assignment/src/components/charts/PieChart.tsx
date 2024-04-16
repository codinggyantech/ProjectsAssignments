import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Category } from '../../interfaces/types';



interface PieChartProps {
  categories: Category[];
}

const PieChart: React.FC<PieChartProps> = ({ categories }) => {
  const options: Highcharts.Options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Category Distribution'
    },
    series: [
      {
        type: 'pie',
        data: categories.map((cat) => ({ name: cat.name, y: 1 }))
      }
    ]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;
