// WarriorList.js
import React from "react";
import "./WarriorList.css";

function WarriorList({ warriors, onSelect }) {
  return (
    <div className="warrior-list">
      {warriors.map((warrior, index) => (
        <div
          key={index}
          className="warrior-card"
          onClick={() => onSelect(warrior)}
        >
          <h3>{warrior.name}</h3>
          <p><strong>Raza:</strong> {warrior.race}</p>
          <p><strong>Tipo:</strong> {warrior.type}</p>
          <p><strong>Poder:</strong> {warrior.power}</p>
        </div>
      ))}
    </div>
  );
}

export default WarriorList;