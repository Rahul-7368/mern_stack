import { useState, useEffect } from "react";
import axios from "axios";

const TransactionStatistics = ({ month }) => {
  const [statistics, setStatistics] = useState({
    totalSales: 0,
    totalSold: 0,
    totalNotSold: 0,
  });

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`/api/statistics`, {
        params: { month: month },
      });
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  return (
    <div>
      <h3>Transaction Statistics</h3>
      <div>
        <p>Total Sales: ${statistics.totalSales}</p>
        <p>Total Sold Items: {statistics.totalSold}</p>
        <p>Total Not Sold Items: {statistics.totalNotSold}</p>
      </div>
    </div>
  );
};

export default TransactionStatistics;
