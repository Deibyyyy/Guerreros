import React, { useState } from "react";
import "./AddWarriorForm.css";

function AddWarriorForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    race: "",
    raceDescription: "",
    resistance: "",
    type: "",
    typeDescription: "", // Descripción para el tipo de guerrero
    power: "",
    attackPower: "",
    lifePoints: "", // Puntos de vida son obligatorios
    energy: "", // Agregar campo de energía
    image: "", // Campo para la imagen
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    // Verificamos si hay un archivo seleccionado
    const file = e.target.files[0];
    if (file) {
      // Creamos una URL para la imagen cargada
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación para asegurarse de que los campos obligatorios estén completos
    if (
      !formData.name ||
      !formData.race ||
      !formData.type ||
      !formData.power ||
      !formData.attackPower ||
      !formData.resistance ||
      !formData.energy ||
      !formData.lifePoints // Hacer los puntos de vida obligatorios
    )
      return;

    const newWarrior = {
      id: Date.now(),
      ...formData,
      description: formData.typeDescription, // Asigna la descripción del tipo como "description"
    };

    onAdd(newWarrior);

    // Resetear el formulario
    setFormData({
      name: "",
      race: "",
      raceDescription: "",
      resistance: "",
      type: "",
      typeDescription: "",
      power: "",
      attackPower: "",
      lifePoints: "", // Puntos de vida no tienen valor predeterminado
      energy: "", // Reseteamos el campo de energía también
      image: "", // Limpiamos la imagen
    });
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Guerrero":
        return "#FF6347"; // Color para Guerrero
      case "Mago":
        return "#8A2BE2"; // Color para Mago
      case "Arquero":
        return "#32CD32"; // Color para Arquero
      case "Asesino":
        return "#DC143C"; // Color para Asesino
      default:
        return "#000"; // Color predeterminado
    }
  };

  return (
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

      {/* Contenedor para los campos "Raza" y "Resistencia" */}
      <div className="race-resistance-wrapper">
        <div>
          <label>Raza:</label>
          <input
            name="race"
            list="race-options"
            value={formData.race}
            onChange={handleChange}
            placeholder="Escribe o selecciona una raza"
          />
          <datalist id="race-options">
            <option value="Humano" />
            <option value="Elfo" />
            <option value="Orco" />
            <option value="Enano" />
          </datalist>
        </div>

        <div>
          <label>Resistencia:</label>
          <input
            name="resistance"
            type="number"
            value={formData.resistance}
            onChange={handleChange}
            placeholder="Nivel de resistencia"
          />
        </div>
      </div>

      {/* Campo para el tipo como input con datalist */}
      <div>
        <label>Tipo:</label>
        <input
          name="type"
          list="type-options"
          value={formData.type}
          onChange={handleChange}
          placeholder="Escribe o selecciona un tipo"
        />
        <datalist id="type-options">
          <option value="Guerrero" />
          <option value="Mago" />
          <option value="Arquero" />
          <option value="Asesino" />
        </datalist>
      </div>

      {/* Descripción relacionada con el tipo de guerrero */}
      {formData.type && (
        <div>
          <label>Descripción del Tipo:</label>
          <textarea
            name="typeDescription"
            value={formData.typeDescription}
            onChange={handleChange}
            placeholder="Escribe una pequeña descripción sobre el tipo de guerrero"
            rows="4"
          />
        </div>
      )}

      {/* Contenedor para los campos de "Poder" y "Poder de Ataque" */}
      <div className="powers-wrapper">
        <div>
          <label>Poder:</label>
          <input
            name="power"
            list="power-options"
            value={formData.power}
            onChange={handleChange}
            placeholder="Escribe o selecciona un poder"
          />
          <datalist id="power-options">
            <option value="Fuego" />
            <option value="Hielo" />
            <option value="Electricidad" />
            <option value="Sombra" />
          </datalist>
        </div>

        <div className="attack-power-wrapper">
          <label>Poder de Ataque (Daño):</label>
          <input
            name="attackPower"
            type="number"
            placeholder="Ejemplo: 50, 100, 200"
            value={formData.attackPower}
            onChange={handleChange}
          />
          <small>Este valor depende del poder seleccionado.</small>
        </div>
      </div>

      {/* Campo para ingresar puntos de vida (ahora obligatorio) */}
      <div>
        <label>Puntos de vida:</label>
        <input
          name="lifePoints"
          type="number"
          placeholder="Puntos de vida"
          value={formData.lifePoints}
          onChange={handleChange}
          min="0"
          required // Asegura que los puntos de vida sean obligatorios
        />
      </div>

      {/* Campo para ingresar energía */}
      <div>
        <label>Energía:</label>
        <input
          name="energy"
          type="number"
          placeholder="Nivel de energía"
          value={formData.energy}
          onChange={handleChange}
          min="0"
          required // Asegura que la energía sea obligatoria también
        />
      </div>

      {/* Campo para agregar imagen */}
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
  );
}

export default AddWarriorForm;