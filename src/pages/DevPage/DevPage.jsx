import { useState } from 'react';
import { devs } from '../../data';
import './DevPage.css';

export default function DevPage() {
  const [selectedDevs, setSelectedDevs] = useState([]);

  const handleDevSelection = (developer) => {
    // Toggle the selection status of the developer
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
      <h1>Top 10 Game Developer Studios</h1>
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
          <h2>Your Selected Dev Studios:</h2>
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