import React, { useState, useEffect } from 'react';
import './App.css';
import spaceStationImage from './space-station.png';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://api.open-notify.org/iss-now.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleRefreshClick = () => {
    window.location.reload(); 
  };

  return (
    <div>
      <img src={spaceStationImage} alt="Space Station" />
      <div id='title'>International Space Station</div>
      <p id='head'>Live Location</p>
      <button onClick={handleRefreshClick}>
      {data ? (
        <div>
          <p>Latitude: {data.iss_position.latitude}</p>
          <p>Longitude: {data.iss_position.longitude}</p>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
      </button>
    </div>
  );
}

export default App;
