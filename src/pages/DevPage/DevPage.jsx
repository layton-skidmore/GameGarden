import { useState } from 'react';
import { devs } from '../../data';
import './DevPage.css';

export default function DevPage( user ) {
  const [selectedDevs, setSelectedDevs] = useState([]);

  const handleDevSelection = (developer) => {

    setSelectedDevs((prevSelectedDevs) => {
      if (prevSelectedDevs.includes(developer)) {
        return prevSelectedDevs.filter((dev) => dev !== developer);
      } else {
        return [...prevSelectedDevs, developer];
      }
    });
  };

  return (
    <div>
    <div className="contest-info-container">
      <h1>Weekly Top 10 (9/10/23-9/16/23)</h1>
      <p>Select your Top 10 game studios!</p> 
    </div>
      <div className="developer-container">
        <div className="developer-list">
          {devs.map((developer) => (
            <div key={developer.id} className={`developer-item ${selectedDevs.includes(developer) ? 'selected' : ''}`}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedDevs.includes(developer)}
                  onChange={() => handleDevSelection(developer)}
                />
                <div className="developer-info">
                  <img src={developer.imageUrl} alt={developer.name} />
                  <span>{developer.name}</span>
                </div>
              </label>
            </div>
          ))}
        </div>
        <div className="selected-dev-container">
          <h2>Your Top 10 Game Studios:</h2>
          <div className="selected-devs">
            {selectedDevs.map((developer) => (
              <div key={developer.id} className="selected-dev-item">
                <div className="selected-dev-info">
                  <img src={developer.imageUrl} alt={developer.name} />
                  <span>{developer.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}