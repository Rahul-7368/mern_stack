import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const BarChart = ({ month }) => {
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Items",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetchBarChartData();
  }, [month]);

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get(`/api/bar-chart`, {
        params: { month: month },
      });

      if (Array.isArray(response.data)) {
        const chartData = {
          labels: response.data.map((item) => item.range),
          datasets: [
            {
              label: "Number of Items",
              data: response.data.map((item) => item.count),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };
        setBarChartData(chartData);
      }
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  };

  return <Bar data={barChartData} />;
};

export default BarChart;
