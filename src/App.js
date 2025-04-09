import React, { useState, useEffect } from "react";
import AddWarriorForm from "./components/AddWarriorForm";
import WarriorDetail from "./components/WarriorDetail";
import { warriors as initialWarriors } from "./data/warriors";
import "./App.css";

function App() {
  const [warriors, setWarriors] = useState(initialWarriors);
  const [filteredWarriors, setFilteredWarriors] = useState(initialWarriors);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWarrior, setSelectedWarrior] = useState(null);
  const [playerNick, setPlayerNick] = useState("");
  const [playerLifePoints, setPlayerLifePoints] = useState(100);
  const [playerScore, setPlayerScore] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [selectedWarriors, setSelectedWarriors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [customTypes, setCustomTypes] = useState([
    { name: "Guerrero", description: "Especialista en combate cuerpo a cuerpo" },
    { name: "Mago", description: "Maestro de artes arcanas y hechizos" },
    { name: "Arquero", description: "Experto en ataques a distancia" },
    { name: "Asesino", description: "Especialista en ataques sigilosos y críticos" }
  ]);

  const [customPowers, setCustomPowers] = useState([
    { name: "Fuego", description: "Control sobre llamas y calor" },
    { name: "Hielo", description: "Manipulación de frío y escarcha" },
    { name: "Electricidad", description: "Dominio de rayos y energía eléctrica" },
    { name: "Sombra", description: "Poderes oscuros y sigilo" }
  ]);

  useEffect(() => {
    const results = warriors.filter(warrior =>
      warrior.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warrior.race.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warrior.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warrior.power.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredWarriors(results);
  }, [searchTerm, warriors]);

  useEffect(() => {
    const savedNick = localStorage.getItem("playerNick");
    if (savedNick) {
      setPlayerNick(savedNick);
      setHasEntered(true);
    }
  }, []);

  const handleUpdateWarrior = (updatedWarrior) => {
    const updatedWarriors = warriors.map(w => 
      w.id === updatedWarrior.id ? updatedWarrior : w
    );
    setWarriors(updatedWarriors);
    setSelectedWarrior(updatedWarrior);
  };

  const handleEnterGame = () => {
    if (playerNick.trim()) {
      setHasEntered(true);
      localStorage.setItem("playerNick", playerNick);
    }
  };

  const addWarrior = (newWarrior) => {
    const updatedWarriors = [...warriors, newWarrior];
    setWarriors(updatedWarriors);
    setFilteredWarriors(updatedWarriors);
    setIsModalOpen(false);
  };

  const handleViewDetails = (warrior) => {
    setSelectedWarrior(warrior);
  };

  const handleCloseDetail = () => {
    setSelectedWarrior(null);
  };

  const handleDeleteWarrior = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este guerrero?")) {
      const updatedWarriors = warriors.filter((w) => w.id !== id);
      setWarriors(updatedWarriors);
      setFilteredWarriors(updatedWarriors);
      setSelectedWarrior(null);
      setSelectedWarriors(selectedWarriors.filter((w) => w.id !== id));
    }
  };

  const handleEditAttribute = (attribute) => {
    const newValue = prompt(`Editar ${attribute}:`, selectedWarrior[attribute]);
    if (newValue !== null) {
      const updatedWarrior = { ...selectedWarrior, [attribute]: newValue };
      handleUpdateWarrior(updatedWarrior);
    }
  };

  const handleDeleteAttribute = (attribute) => {
    if (window.confirm(`¿Estás seguro de eliminar ${attribute}?`)) {
      const updatedWarrior = { ...selectedWarrior, [attribute]: "" };
      handleUpdateWarrior(updatedWarrior);
    }
  };

  const handleSelectWarrior = (warrior) => {
    const alreadySelected = selectedWarriors.some((w) => w.id === warrior.id);

    if (!alreadySelected && playerLifePoints <= 0) {
      alert("No puedes seleccionar más guerreros porque se te han agotado los puntos de vida.");
      return;
    }

    if (!alreadySelected && playerLifePoints > 0) {
      setPlayerLifePoints((prev) => prev - 10);
      setSelectedWarriors([...selectedWarriors, warrior]);
      setPlayerScore((prev) => prev + 5);
    } else if (alreadySelected) {
      setSelectedWarriors(selectedWarriors.filter((w) => w.id !== warrior.id));
      setPlayerLifePoints((prev) => prev + 10);
      setPlayerScore((prev) => prev - 5);
    }
  };

  const handleModifyNick = () => {
    const newNick = prompt("Introduce un nuevo nickname:", playerNick);
    if (newNick?.trim()) {
      setPlayerNick(newNick);
      localStorage.setItem("playerNick", newNick);
    }
  };

  const handleDeletePlayer = () => {
    if (window.confirm("¿Estás seguro de eliminar tu jugador y volver a ingresar un nickname?")) {
      setPlayerNick("");
      setHasEntered(false);
      setSelectedWarriors([]);
      setPlayerScore(0);
      setPlayerLifePoints(100);
      localStorage.removeItem("playerNick");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!hasEntered) {
    return (
      <div className="App">
        <h1 className="title">Bienvenido a la App de Guerreros</h1>
        <input
          type="text"
          placeholder="Ingresa tu nickname"
          value={playerNick}
          onChange={(e) => setPlayerNick(e.target.value)}
        />
        <button onClick={handleEnterGame}>Entrar</button>
      </div>
    );
  }

  return (
    <div className="App" style={{ position: "relative" }}>
      <div className="player-card">
        <h2>Jugador: {playerNick}</h2>
        <p>Guerreros seleccionados: {selectedWarriors.length}/10</p>
        <p><strong>Puntos de Vida:</strong> {playerLifePoints}</p>
        <p><strong>Puntaje:</strong> {playerScore}</p>
        <div className="player-actions">
          <button className="btn-red" onClick={handleModifyNick}>Modificar Nickname</button>
          <button className="btn-red" onClick={handleDeletePlayer}>Eliminar Jugador</button>
        </div>
      </div>

      <h1 className="title">Gestión de Guerreros</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por nombre, raza o tipo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm("")}
            className="clear-search-btn"
            aria-label="Limpiar búsqueda"
          >
            ×
          </button>
        )}
      </div>

      <button 
        onClick={openModal} 
        className="add-warrior-btn"
      >
        Agregar Guerrero
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Agregar Guerrero</h2>
            <AddWarriorForm 
              onAdd={addWarrior}
              customTypes={customTypes}
              customPowers={customPowers}
              setCustomTypes={setCustomTypes}
              setCustomPowers={setCustomPowers}
            />
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}

      <div className="warrior-list">
        {filteredWarriors.length > 0 ? (
          filteredWarriors.map((warrior) => {
            const isSelected = selectedWarriors.some((w) => w.id === warrior.id);
            const selectedIndex = selectedWarriors.findIndex((w) => w.id === warrior.id);

            return (
              <div
                key={warrior.id}
                className={`warrior-card ${isSelected ? 'selected' : ''}`}
              >
                <div className="warrior-image-container">
                  {warrior.image ? (
                    <img 
                      src={warrior.image.includes('http') ? warrior.image : `${process.env.PUBLIC_URL}${warrior.image}`}
                      alt={warrior.name}
                      className="warrior-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `${process.env.PUBLIC_URL}/images/default.jpg`;
                      }}
                    />
                  ) : (
                    <img 
                      src={`${process.env.PUBLIC_URL}/images/default.jpg`}
                      alt="Default"
                      className="warrior-image"
                    />
                  )}
                </div>

                {isSelected && (
                  <div className="selected-badge">
                    {selectedIndex + 1}
                  </div>
                )}

                <div className="warrior-info">
                  <h3>{warrior.name}</h3>
                  <p><strong>Raza:</strong> {warrior.race}</p>
                  <p><strong>Tipo:</strong> {warrior.type}</p>
                  <p><strong>Poder:</strong> {warrior.power}</p>
                </div>

                <div className="warrior-actions">
                  <button 
                    onClick={() => handleSelectWarrior(warrior)}
                    className={`select-btn ${isSelected ? 'deselect' : ''}`}
                  >
                    {isSelected ? "Quitar" : "Seleccionar"}
                  </button>
                  <button 
                    onClick={() => handleViewDetails(warrior)}
                    className="details-btn"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-results">
            <p>No se encontraron guerreros que coincidan con "{searchTerm}"</p>
            <button onClick={() => setSearchTerm("")}>Limpiar búsqueda</button>
          </div>
        )}
      </div>

      <div className="selected-warriors-panel">
        <strong>Guerreros Seleccionados:</strong>
        <ol>
          {selectedWarriors.map((w) => (
            <li key={w.id}>{w.name} ({w.type})</li>
          ))}
        </ol>
        {selectedWarriors.length > 0 && (
          <div className="selection-stats">
            <p>Total seleccionados: {selectedWarriors.length}</p>
            <p>Poder total: {selectedWarriors.reduce((sum, w) => sum + parseInt(w.attackPower || 0), 0)}</p>
          </div>
        )}
      </div>

      {selectedWarrior && (
        <WarriorDetail
          warrior={selectedWarrior}
          onClose={handleCloseDetail}
          onDelete={handleDeleteWarrior}
          onUpdateWarrior={handleUpdateWarrior}
          customTypes={customTypes}
          customPowers={customPowers}
        />
      )}
    </div>
  );
}

export default App;