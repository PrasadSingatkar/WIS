const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mernPlotUIDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const dataSchema = new mongoose.Schema({}, { strict: false });
const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
