import { useState } from "react";
import TransactionTable from "./TransactionTable";
import TransactionStatistics from "./TransactionStatistics";
// import TransactionBarChart from "./TransactionBarChart";

const App = () => {
  const [month, setMonth] = useState("03");
  const [search, setSearch] = useState("");

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h1>Product Transactions</h1>
      <div>
        <label>Select Month: </label>
        <select value={month} onChange={handleMonthChange}>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <TransactionStatistics month={month} />
      <TransactionTable month={month} search={search} />
      {/* <TransactionBarChart month={month} /> */}
    </div>
  );
};

export default App;
