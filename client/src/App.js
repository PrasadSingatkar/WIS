import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({});

  const fetchData = async (startTime, frequency) => {
    try {
      const res = await axios.get(`/api/getData?startTime=${startTime}&frequency=${frequency}`);
      setData(res.data);
      generateSummary(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const generateSummary = (data) => {
    const ones = data.filter(item => item.sample === 1).length;
    const zeros = data.filter(item => item.sample === 0).length;
    let continuousZeros = 0;
    let continuousOnes = 0;
    let maxContinuousZeros = 0;
    let maxContinuousOnes = 0;

    data.forEach((item) => {
      if (item.sample === 0) {
        continuousZeros++;
        continuousOnes = 0;
        maxContinuousZeros = Math.max(maxContinuousZeros, continuousZeros);
      } else if (item.sample === 1) {
        continuousOnes++;
        continuousZeros = 0;
        maxContinuousOnes = Math.max(maxContinuousOnes, continuousOnes);
      }
    });

    setSummary({
      ones,
      zeros,
      maxContinuousZeros,
      maxContinuousOnes,
    });
  };

  return (
    <div className="App">
      <h1>Data Plotting</h1>
      <button onClick={() => fetchData('2024-04-16T00:00:00.000Z', 'hour')}>Fetch Data</button>
      <h2>Summary</h2>
      <table>
        <thead>
          <tr>
            <th>1s</th>
            <th>0s</th>
            <th>Max Continuous 0s</th>
            <th>Max Continuous 1s</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{summary.ones}</td>
            <td>{summary.zeros}</td>
            <td>{summary.maxContinuousZeros}</td>
            <td>{summary.maxContinuousOnes}</td>
          </tr>
        </tbody>
      </table>
      <h2>Data Plot</h2>
      <div className="plot">
        {data.map((item, index) => (
          <div
            key={index}
            className={`item ${item.sample === 0 ? 'yellow' : item.sample === 1 ? 'green' : 'red'}`}
          >
            {item.timestamp}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
