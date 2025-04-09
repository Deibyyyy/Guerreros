import React from "react";
import "./WarriorDetail.css";

function WarriorDetail({ warrior, onClose, onDelete, onEditAttribute, onDeleteAttribute }) {
  if (!warrior) return null;

  const handleDeleteAttribute = (attribute) => {
    onDeleteAttribute(attribute);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>Cerrar</button>
        <h2>Detalles del Guerrero</h2>

        {/* Mostrar los detalles de los atributos */}
        <div className="attribute-row">
          <strong>Nombre:</strong>
          <span>{warrior.name || "Vacío"}</span>
          <button className="icon-button" onClick={() => onEditAttribute("name")}>✏️</button>
          <button className="icon-button" onClick={() => handleDeleteAttribute("name")}>🗑️</button>
        </div>

        <div className="attribute-row">
          <strong>Raza:</strong>
          <span>{warrior.race || "Vacío"}</span>
          <button className="icon-button" onClick={() => onEditAttribute("race")}>✏️</button>
          <button className="icon-button" onClick={() => handleDeleteAttribute("race")}>🗑️</button>
        </div>

        <div className="attribute-row">
          <strong>Tipo:</strong>
          <span>{warrior.type || "Vacío"}</span>
          <button className="icon-button" onClick={() => onEditAttribute("type")}>✏️</button>
          <button className="icon-button" onClick={() => handleDeleteAttribute("type")}>🗑️</button>
        </div>

        <div className="attribute-row">
          <strong>Poder:</strong>
          <span>{warrior.power || "Vacío"}</span>
          <button className="icon-button" onClick={() => onEditAttribute("power")}>✏️</button>
          <button className="icon-button" onClick={() => handleDeleteAttribute("power")}>🗑️</button>
        </div>

        <div className="attribute-row">
          <strong>Poder de Ataque:</strong>
          <span>{warrior.attackPower || "Vacío"}</span>
          <button className="icon-button" onClick={() => onEditAttribute("attackPower")}>✏️</button>
          <button className="icon-button" onClick={() => handleDeleteAttribute("attackPower")}>🗑️</button>
        </div>

        <div className="attribute-row">
          <strong>Resistencia:</strong>
          <span>{warrior.resistance || "Vacío"}</span>
          <button className="icon-button" onClick={() => onEditAttribute("resistance")}>✏️</button>
          <button className="icon-button" onClick={() => handleDeleteAttribute("resistance")}>🗑️</button>
        </div>

        <div className="attribute-row">
          <strong>Puntos de Vida:</strong>
          <span>{warrior.lifePoints || "Vacío"}</span>
          <button className="icon-button" onClick={() => onEditAttribute("lifePoints")}>✏️</button>
          <button className="icon-button" onClick={() => handleDeleteAttribute("lifePoints")}>🗑️</button>
        </div>

        {/* Agregar el campo de Energía */}
        <div className="attribute-row">
          <strong>Energía:</strong>
          <span>{warrior.energy || "Vacío"}</span>
          <button className="icon-button" onClick={() => onEditAttribute("energy")}>✏️</button>
          <button className="icon-button" onClick={() => handleDeleteAttribute("energy")}>🗑️</button>
        </div>

        {/* Aquí mostramos la descripción */}
        <div className="attribute-row">
          <strong>Descripción:</strong>
          <span>{warrior.description || "Vacío"}</span> {/* Muestra "Vacío" si está vacío */}
          <button className="icon-button" onClick={() => onEditAttribute("description")}>✏️</button>
          <button className="icon-button" onClick={() => handleDeleteAttribute("description")}>🗑️</button>
        </div>

        <button className="delete-warrior-button" onClick={() => onDelete(warrior.id)}>Eliminar Guerrero</button>
      </div>
    </div>
  );
}

export default WarriorDetail;
