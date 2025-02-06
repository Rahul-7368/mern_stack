const express = require("express");
// const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const seedData = require("./utils/seedData");

const app = express();
app.use(bodyParser.json());

connectDB();

seedData();

const transactionRoutes = require("./routes/transactions");
const statisticsRoutes = require("./routes/statistics");
const barChartRoutes = require("./routes/barChart");
const pieChartRoutes = require("./routes/pieChart");
const combinedRoutes = require("./routes/combined");

app.use("/api/transactions", transactionRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api/bar-chart", barChartRoutes);
app.use("/api/pie-chart", pieChartRoutes);
app.use("/api/combined", combinedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
