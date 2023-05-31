const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../../models/tourModel');
const Review = require('./../../../models/reviewModel');
const User = require('./../../../models/userModel');

dotenv.config({ path: `${__dirname}/../../../config.env` });

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => { console.log('DB connection successful'); });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));

const importData = async () => {

    try {
        
        await User.create(users, { validateBeforeSave: false });
        await Tour.create(tours);
        await Review.create(reviews);

        console.log('Data successfuly loaded');

    } catch (err) {

        console.log("Error import data", err);

    }

    process.exit();

};

const deleteData = async () => {
    
    try {

        await Tour.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();

        console.log('Data successfuly deleted!');

    } catch (err) {

        console.log("Error delete data", err);

    }
    
    process.exit();

};

if (process.argv[2] === '--import') {
    importData();
}

if (process.argv[2] === '--delete') {
    deleteData();
}

//deleteData();
//importData();
console.log(process.argv);
