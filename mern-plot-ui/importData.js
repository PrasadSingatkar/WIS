const Data = require('./db');
const sampleData = require('./sample-data.json');

Data.insertMany(sampleData)
    .then(() => {
        console.log('Data imported successfully');
        process.exit();
    })
    .catch(err => console.log(err));
