import React from "react";

const WarriorList = ({ warriors, onSelect }) => {
  return (
    <div>
      <h2>Lista de Guerreros</h2>
      <ul>
        {warriors.map((w) => (
          <li key={w.id} onClick={() => onSelect(w.id)}>
            {w.name} - {w.type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WarriorList;
