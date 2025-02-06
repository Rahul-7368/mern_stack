import  { useState, useEffect } from "react";
import axios from "axios";

const TransactionTable = ({month,search}) => {
  const [transactions, setTransactions] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, ] = useState(10);

  useEffect(() => {
    fetchTransactions();
  }, [month, search, currentPage]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`/api/transactions`, {
        params: {
          month: month,
          search: search,
          page: currentPage,
          perPage: perPage,
        },
      });
      setTransactions(response.data.transactions);
      setTotalTransactions(response.data.totalTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const nextPage = () => {
    if (currentPage * perPage < totalTransactions) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
            
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>{transaction.price}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage * perPage >= totalTransactions}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;
