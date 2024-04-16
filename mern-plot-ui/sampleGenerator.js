const fs = require('fs');

const generateSampleData = (numEntries) => {
    const data = [];
    for (let i = 0; i < numEntries; i++) {
        const sample = Math.random() > 0.5 ? 1 : 0;
        const timestamp = new Date(Date.now() - i * 3600 * 1000).toISOString();
        data.push({ sample, timestamp });
    }
    fs.writeFileSync('sample-data.json', JSON.stringify(data));
    console.log('Sample data generated');
};

generateSampleData(1000);
