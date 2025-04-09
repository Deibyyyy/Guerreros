import React, { useState, useEffect, useRef } from "react";
import "./WarriorDetail.css";

function WarriorDetail({ 
  warrior, 
  onClose, 
  onDelete, 
  onUpdateWarrior,
  customTypes = [],
  customPowers = []
}) {
  const [image, setImage] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (warrior) {
      setImage(warrior.image || null);
    }
  }, [warrior]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        alert('Por favor selecciona un archivo de imagen válido');
        return;
      }

      const reader = new FileReader();
      
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImage(imageUrl);
        if (warrior) {
          const updatedWarrior = {...warrior, image: imageUrl};
          onUpdateWarrior(updatedWarrior);
        }
      };

      reader.onerror = () => {
        console.error('Error al leer la imagen');
        setImage(null);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleEditImage = () => {
    fileInputRef.current.click();
  };

  const handleDeleteImage = () => {
    setImage(null);
    if (warrior) {
      const updatedWarrior = {...warrior, image: null};
      onUpdateWarrior(updatedWarrior);
    }
  };

  const startEditing = (field, currentValue) => {
    setEditingField(field);
    setEditValue(currentValue || "");
  };

  const cancelEditing = () => {
    setEditingField(null);
    setEditValue("");
  };

  const saveEdit = () => {
    if (warrior && editingField) {
      const updatedWarrior = {...warrior, [editingField]: editValue};
      
      if (editingField === "type") {
        const selectedType = customTypes.find(type => type.name === editValue);
        if (selectedType) {
          updatedWarrior.typeDescription = selectedType.description || "";
        }
      }
      
      onUpdateWarrior(updatedWarrior);
    }
    cancelEditing();
  };

  const handleSelectChange = (e) => {
    setEditValue(e.target.value);
  };

  const renderAttributeRow = (label, attribute) => {
    if (editingField === attribute) {
      return (
        <div className="attribute-row editing" key={attribute}>
          <strong>{label}:</strong>
          
          {attribute === "type" ? (
            <div className="select-container">
              <select
                value={editValue}
                onChange={handleSelectChange}
                className="edit-select"
                autoFocus
              >
                <option value="">Selecciona un tipo</option>
                {customTypes.map((type, index) => (
                  <option key={`type-${index}`} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          ) : attribute === "power" ? (
            <div className="select-container">
              <select
                value={editValue}
                onChange={handleSelectChange}
                className="edit-select"
                autoFocus
              >
                <option value="">Selecciona un poder</option>
                {customPowers.map((power, index) => (
                  <option key={`power-${index}`} value={power.name}>
                    {power.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <input
              type={["attackPower", "resistance", "lifePoints", "energy"].includes(attribute) 
                ? "number" 
                : "text"}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="edit-input"
              autoFocus
            />
          )}
          
          <div className="edit-buttons">
            <button 
              className="icon-button save-button" 
              onClick={saveEdit}
              aria-label={`Guardar ${label}`}
            >
              ✔️
            </button>
            <button 
              className="icon-button cancel-button" 
              onClick={cancelEditing}
              aria-label={`Cancelar edición de ${label}`}
            >
              ✖️
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="attribute-row" key={attribute}>
        <strong>{label}:</strong>
        <span>{warrior[attribute] || "Vacío"}</span>
        <button 
          className="icon-button" 
          onClick={() => startEditing(attribute, warrior[attribute])}
          aria-label={`Editar ${label}`}
        >
          ✏️
        </button>
      </div>
    );
  };

  if (!warrior) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Cerrar">
          &times;
        </button>
        
        <h2>Detalles del Guerrero</h2>

        <div className="attribute-row image-row">
          <strong>Imagen:</strong>
          <div className={`warrior-image-container ${!image ? 'empty' : ''}`}>
            {image ? (
              <>
                <img 
                  src={image} 
                  alt={`Imagen de ${warrior.name}`} 
                  className="warrior-image"
                  onError={() => setImage(null)}
                />
                <button 
                  className="delete-image-button"
                  onClick={handleDeleteImage}
                  aria-label="Eliminar imagen"
                >
                  🗑️
                </button>
              </>
            ) : (
              <div className="image-placeholder" onClick={handleEditImage}>
                <span>+</span>
              </div>
            )}
          </div>
          <button 
            className="edit-image-button" 
            onClick={handleEditImage}
            aria-label={image ? "Cambiar imagen" : "Añadir imagen"}
          >
            {image ? "Cambiar" : "Añadir"} Imagen
          </button>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </div>

        <h3>Identidad</h3>
        {renderAttributeRow("Nombre", "name")}
        {renderAttributeRow("Raza", "race")}
        {renderAttributeRow("Tipo", "type")}
        {renderAttributeRow("Poder", "power")}

        <h3>Atributos de Combate</h3>
        {renderAttributeRow("Poder de Ataque", "attackPower")}
        {renderAttributeRow("Resistencia", "resistance")}
        {renderAttributeRow("Puntos de Vida", "lifePoints")}
        {renderAttributeRow("Energía", "energy")}

        <h3>Información Adicional</h3>
        {renderAttributeRow("Descripción", "description")}

        <button 
          className="delete-warrior-button" 
          onClick={() => onDelete(warrior.id)}
          aria-label="Eliminar guerrero"
        >
          Eliminar Guerrero
        </button>
      </div>
    </div>
  );
}

export default WarriorDetail;