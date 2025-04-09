import React, { useState, useEffect, useRef } from "react";
import "./WarriorDetail.css";

function WarriorDetail({ warrior, onClose, onDelete, onEditAttribute, onDeleteAttribute, onUpdateWarrior }) {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (warrior) {
      setImage(warrior.image || null);
    }
  }, [warrior]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Verifica el tipo de archivo
      if (!file.type.match('image.*')) {
        alert('Por favor selecciona un archivo de imagen válido');
        return;
      }

      const reader = new FileReader();
      
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImage(imageUrl);
        // Actualiza directamente el guerrero sin mostrar prompt
        if (warrior) {
          const updatedWarrior = {...warrior, image: imageUrl};
          onUpdateWarrior(updatedWarrior); // Nueva prop para actualización directa
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
    // Actualiza directamente el guerrero sin mostrar prompt
    if (warrior) {
      const updatedWarrior = {...warrior, image: null};
      onUpdateWarrior(updatedWarrior);
    }
  };

  if (!warrior) return null;

  const renderAttributeRow = (label, attribute) => (
    <div className="attribute-row" key={attribute}>
      <strong>{label}:</strong>
      <span>{warrior[attribute] || "Vacío"}</span>
      <button 
        className="icon-button" 
        onClick={() => onEditAttribute(attribute)}
        aria-label={`Editar ${label}`}
      >
        ✏️
      </button>
      <button 
        className="icon-button" 
        onClick={() => onDeleteAttribute(attribute)}
        aria-label={`Eliminar ${label}`}
      >
        🗑️
      </button>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Cerrar">
          &times;
        </button>
        
        <h2>Detalles del Guerrero</h2>

        {/* Sección de Imagen */}
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