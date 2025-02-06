const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://kumarrahulgodda:rahulsuman@cluster7.jscb0.mongodb.net/?retryWrites=true&w=majority&appname=cluster7", { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
