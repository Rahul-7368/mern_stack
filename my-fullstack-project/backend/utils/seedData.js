const axios = require("axios");
const Transaction = require("../models/transaction");

const seedData = async () => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const data = response.data;

    const transactions = data.map((item) => ({
      title: item.title,
      description: item.description,
      price: item.price,
      category: item.category,
      dateOfSale: new Date(item.dateOfSale),
      sold: item.sold,
    }));

    await Transaction.insertMany(transactions);
    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

module.exports = seedData;
