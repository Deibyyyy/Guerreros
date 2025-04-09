import React from "react";

const WarriorDetail = ({ warrior }) => {
  if (!warrior) return <p>Selecciona un guerrero</p>;

  return (
    <div>
      <h2>Detalles de {warrior.name}</h2>
      <p>
        <strong>Edad:</strong> {warrior.age}
      </p>
      <p>
        <strong>Raza:</strong> {warrior.race}
      </p>
      <p>
        <strong>Tipo:</strong> {warrior.type}
      </p>
      <p>
        <strong>Poderes:</strong>
      </p>
      <ul>
        {warrior.powers.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
};

export default WarriorDetail;
