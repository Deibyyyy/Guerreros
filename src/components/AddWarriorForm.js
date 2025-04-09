import React, { useState } from "react";
import "./AddWarriorForm.css";

function AddWarriorForm({ onAdd, customTypes, customPowers, setCustomTypes, setCustomPowers }) {
  const [formData, setFormData] = useState({
    name: "",
    race: "",
    raceDescription: "",
    resistance: "",
    type: "",
    typeDescription: "",
    power: "",
    attackPower: "",
    lifePoints: "",
    energy: "",
    image: "",
  });

  const [showPowerModal, setShowPowerModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [newPowerName, setNewPowerName] = useState("");
  const [newPowerDescription, setNewPowerDescription] = useState("");
  const [newTypeName, setNewTypeName] = useState("");
  const [newTypeDescription, setNewTypeDescription] = useState("");
  const [editingPower, setEditingPower] = useState(null);
  const [editingType, setEditingType] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    if (e.target.name === "type") {
      const selectedType = customTypes.find(type => type.name === e.target.value);
      if (selectedType) {
        setFormData(prev => ({
          ...prev,
          typeDescription: selectedType.description || ""
        }));
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.race ||
      !formData.type ||
      !formData.power ||
      !formData.attackPower ||
      !formData.resistance ||
      !formData.energy ||
      !formData.lifePoints
    ) return;

    const newWarrior = {
      id: Date.now(),
      ...formData,
      description: formData.typeDescription,
    };

    onAdd(newWarrior);
    setFormData({
      name: "",
      race: "",
      raceDescription: "",
      resistance: "",
      type: "",
      typeDescription: "",
      power: "",
      attackPower: "",
      lifePoints: "",
      energy: "",
      image: "",
    });
  };

  const handleAddPower = () => {
    if (newPowerName.trim()) {
      if (editingPower !== null) {
        const updatedPowers = [...customPowers];
        updatedPowers[editingPower] = {
          name: newPowerName,
          description: newPowerDescription
        };
        setCustomPowers(updatedPowers);
        
        if (formData.power === customPowers[editingPower].name) {
          setFormData({
            ...formData,
            power: newPowerName
          });
        }
        
        setEditingPower(null);
      } else {
        setCustomPowers([
          ...customPowers,
          { name: newPowerName, description: newPowerDescription }
        ]);
        setFormData({ ...formData, power: newPowerName });
      }
      
      setNewPowerName("");
      setNewPowerDescription("");
      setShowPowerModal(false);
    }
  };

  const handleEditPower = (index) => {
    setEditingPower(index);
    setNewPowerName(customPowers[index].name);
    setNewPowerDescription(customPowers[index].description);
    setShowPowerModal(true);
  };

  const handleDeletePower = (index) => {
    const updatedPowers = customPowers.filter((_, i) => i !== index);
    setCustomPowers(updatedPowers);
    
    if (formData.power === customPowers[index].name) {
      setFormData({ ...formData, power: "" });
    }
    
    if (editingPower === index) {
      setEditingPower(null);
      setNewPowerName("");
      setNewPowerDescription("");
    } else if (editingPower !== null && editingPower > index) {
      setEditingPower(editingPower - 1);
    }
  };

  const handleAddType = () => {
    if (newTypeName.trim()) {
      if (editingType !== null) {
        const updatedTypes = [...customTypes];
        updatedTypes[editingType] = {
          name: newTypeName,
          description: newTypeDescription
        };
        setCustomTypes(updatedTypes);
        
        if (formData.type === customTypes[editingType].name) {
          setFormData({
            ...formData,
            type: newTypeName,
            typeDescription: newTypeDescription
          });
        }
        
        setEditingType(null);
      } else {
        setCustomTypes([
          ...customTypes,
          { name: newTypeName, description: newTypeDescription }
        ]);
        setFormData({
          ...formData,
          type: newTypeName,
          typeDescription: newTypeDescription
        });
      }
      
      setNewTypeName("");
      setNewTypeDescription("");
      setShowTypeModal(false);
    }
  };

  const handleEditType = (index) => {
    setEditingType(index);
    setNewTypeName(customTypes[index].name);
    setNewTypeDescription(customTypes[index].description);
    setShowTypeModal(true);
  };

  const handleDeleteType = (index) => {
    const updatedTypes = customTypes.filter((_, i) => i !== index);
    setCustomTypes(updatedTypes);
    
    if (formData.type === customTypes[index].name) {
      setFormData({ ...formData, type: "", typeDescription: "" });
    }
    
    if (editingType === index) {
      setEditingType(null);
      setNewTypeName("");
      setNewTypeDescription("");
    } else if (editingType !== null && editingType > index) {
      setEditingType(editingType - 1);
    }
  };

  return (
    <>
      <form className="warrior-form" onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nombre del guerrero"
          />
        </div>

        <div className="race-resistance-wrapper">
          <div>
            <label>Raza:</label>
            <select
              name="race"
              value={formData.race}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una raza</option>
              <option value="Humano">Humano</option>
              <option value="Elfo">Elfo</option>
              <option value="Orco">Orco</option>
              <option value="Enano">Enano</option>
            </select>
          </div>

          <div>
            <label>Resistencia:</label>
            <input
              name="resistance"
              type="number"
              value={formData.resistance}
              onChange={handleChange}
              placeholder="Nivel de resistencia"
              required
            />
          </div>
        </div>

        <div>
          <label>Tipo:</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un tipo</option>
              {customTypes.map((type, index) => (
                <option key={index} value={type.name}>{type.name}</option>
              ))}
            </select>
            <button 
              type="button" 
              onClick={() => setShowTypeModal(true)}
              style={{ padding: '5px 10px' }}
            >
              +
            </button>
          </div>
        </div>

        {formData.type && (
          <div>
            <label>Descripción del Tipo:</label>
            <textarea
              name="typeDescription"
              value={formData.typeDescription}
              onChange={handleChange}
              placeholder="Descripción del tipo de guerrero"
              rows="4"
            />
          </div>
        )}

        <div className="powers-wrapper">
          <div>
            <label>Poder:</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <select
                name="power"
                value={formData.power}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un poder</option>
                {customPowers.map((power, index) => (
                  <option key={index} value={power.name}>{power.name}</option>
                ))}
              </select>
              <button 
                type="button" 
                onClick={() => setShowPowerModal(true)}
                style={{ padding: '5px 10px' }}
              >
                +
              </button>
            </div>
          </div>

          <div className="attack-power-wrapper">
            <label>Poder de Ataque (Daño):</label>
            <input
              name="attackPower"
              type="number"
              placeholder="Ejemplo: 50, 100, 200"
              value={formData.attackPower}
              onChange={handleChange}
              required
            />
            <small>Este valor depende del poder seleccionado.</small>
          </div>
        </div>

        <div>
          <label>Puntos de vida:</label>
          <input
            name="lifePoints"
            type="number"
            placeholder="Puntos de vida"
            value={formData.lifePoints}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div>
          <label>Energía:</label>
          <input
            name="energy"
            type="number"
            placeholder="Nivel de energía"
            value={formData.energy}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div>
          <label>Imagen del Guerrero:</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {formData.image && (
            <div>
              <img
                src={formData.image}
                alt="Previsualización"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
        </div>

        <button type="submit">Agregar Guerrero</button>
      </form>

      {showTypeModal && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: '600px' }}>
            <h3>{editingType !== null ? 'Editar Tipo' : 'Crear Nuevo Tipo'}</h3>
            
            <div className="modal-content-container">
              <div className="modal-form-section">
                <div style={{ marginBottom: '15px' }}>
                  <label>Nombre del Tipo:</label>
                  <input
                    type="text"
                    value={newTypeName}
                    onChange={(e) => setNewTypeName(e.target.value)}
                    placeholder="Nombre del nuevo tipo"
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label>Descripción:</label>
                  <textarea
                    value={newTypeDescription}
                    onChange={(e) => setNewTypeDescription(e.target.value)}
                    placeholder="Descripción del tipo"
                    rows="3"
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    type="button" 
                    onClick={handleAddType}
                    style={{ backgroundColor: '#28a745' }}
                  >
                    {editingType !== null ? 'Actualizar' : 'Agregar'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setShowTypeModal(false);
                      setEditingType(null);
                      setNewTypeName("");
                      setNewTypeDescription("");
                    }}
                    style={{ backgroundColor: '#dc3545' }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
              
              <div className="modal-list-section">
                <h4>Tipos Existentes</h4>
                {customTypes.length === 0 ? (
                  <p>No hay tipos creados aún.</p>
                ) : (
                  <ul className="items-list">
                    {customTypes.map((type, index) => (
                      <li key={index} className={editingType === index ? 'editing-item' : ''}>
                        <div className="item-content">
                          <strong>{type.name}</strong>
                          <p>{type.description}</p>
                        </div>
                        <div className="item-actions">
                          <button 
                            type="button" 
                            onClick={() => handleEditType(index)}
                            className="edit-btn"
                          >
                            Editar
                          </button>
                          <button 
                            type="button" 
                            onClick={() => handleDeleteType(index)}
                            className="delete-btn"
                          >
                            Eliminar
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showPowerModal && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: '600px' }}>
            <h3>{editingPower !== null ? 'Editar Poder' : 'Crear Nuevo Poder'}</h3>
            
            <div className="modal-content-container">
              <div className="modal-form-section">
                <div style={{ marginBottom: '15px' }}>
                  <label>Nombre del Poder:</label>
                  <input
                    type="text"
                    value={newPowerName}
                    onChange={(e) => setNewPowerName(e.target.value)}
                    placeholder="Nombre del nuevo poder"
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label>Descripción:</label>
                  <textarea
                    value={newPowerDescription}
                    onChange={(e) => setNewPowerDescription(e.target.value)}
                    placeholder="Descripción del poder"
                    rows="3"
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    type="button" 
                    onClick={handleAddPower}
                    style={{ backgroundColor: '#28a745' }}
                  >
                    {editingPower !== null ? 'Actualizar' : 'Agregar'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setShowPowerModal(false);
                      setEditingPower(null);
                      setNewPowerName("");
                      setNewPowerDescription("");
                    }}
                    style={{ backgroundColor: '#dc3545' }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
              
              <div className="modal-list-section">
                <h4>Poderes Existentes</h4>
                {customPowers.length === 0 ? (
                  <p>No hay poderes creados aún.</p>
                ) : (
                  <ul className="items-list">
                    {customPowers.map((power, index) => (
                      <li key={index} className={editingPower === index ? 'editing-item' : ''}>
                        <div className="item-content">
                          <strong>{power.name}</strong>
                          <p>{power.description}</p>
                        </div>
                        <div className="item-actions">
                          <button 
                            type="button" 
                            onClick={() => handleEditPower(index)}
                            className="edit-btn"
                          >
                            Editar
                          </button>
                          <button 
                            type="button" 
                            onClick={() => handleDeletePower(index)}
                            className="delete-btn"
                          >
                            Eliminar
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddWarriorForm;