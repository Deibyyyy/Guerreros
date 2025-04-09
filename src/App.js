import React, { useState, useEffect } from "react";
import AddWarriorForm from "./components/AddWarriorForm";
import WarriorDetail from "./components/WarriorDetail";
import { warriors as initialWarriors } from "./data/warriors";
import "./App.css";

function App() {
  const [warriors, setWarriors] = useState(initialWarriors);
  const [selectedWarrior, setSelectedWarrior] = useState(null);
  const [playerNick, setPlayerNick] = useState("");
  const [playerLifePoints, setPlayerLifePoints] = useState(100); // Establecemos los puntos de vida para el jugador
  const [playerScore, setPlayerScore] = useState(0); // Puntaje inicial del jugador
  const [hasEntered, setHasEntered] = useState(false);
  const [selectedWarriors, setSelectedWarriors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  useEffect(() => {
    // Solo se carga el nickname cuando el jugador entra en el juego
    const savedNick = localStorage.getItem("playerNick");

    if (savedNick) {
      setPlayerNick(savedNick);
      setHasEntered(true);
    }
  }, []);

  const handleEnterGame = () => {
    if (playerNick.trim()) {
      setHasEntered(true);
    }
  };

  const addWarrior = (newWarrior) => {
    setWarriors([...warriors, newWarrior]);
    setIsModalOpen(false); // Cerrar el modal después de agregar el guerrero
  };

  const handleViewDetails = (warrior) => {
    setSelectedWarrior(warrior);
  };

  const handleCloseDetail = () => {
    setSelectedWarrior(null);
  };

  const handleDeleteWarrior = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este guerrero?")) {
      setWarriors(warriors.filter((w) => w.id !== id));
      setSelectedWarrior(null);
      setSelectedWarriors(selectedWarriors.filter((w) => w.id !== id));
    }
  };

  const handleEditAttribute = (attribute) => {
    const newValue = prompt(`Editar ${attribute}:`, selectedWarrior[attribute]);
    if (newValue !== null) {
      setSelectedWarrior({ ...selectedWarrior, [attribute]: newValue });
      setWarriors(
        warriors.map((w) =>
          w.id === selectedWarrior.id ? { ...w, [attribute]: newValue } : w
        )
      );
    }
  };

  const handleDeleteAttribute = (attribute) => {
    if (window.confirm(`¿Estás seguro de eliminar ${attribute}?`)) {
      setSelectedWarrior({ ...selectedWarrior, [attribute]: "" });
      setWarriors(
        warriors.map((w) =>
          w.id === selectedWarrior.id ? { ...w, [attribute]: "" } : w
        )
      );
    }
  };

  const handleSelectWarrior = (warrior) => {
    const alreadySelected = selectedWarriors.some((w) => w.id === warrior.id);

    if (!alreadySelected && playerLifePoints <= 0) {
      alert("No puedes seleccionar más guerreros porque se te han agotado los puntos de vida.");
      return; // Evitamos que se seleccione más guerreros si no hay puntos de vida
    }

    if (!alreadySelected && playerLifePoints > 0) {
      // Reducir los puntos de vida por cada guerrero seleccionado
      setPlayerLifePoints((prevLifePoints) => prevLifePoints - 10);
      setSelectedWarriors([...selectedWarriors, warrior]);
      
      // Aumentar el puntaje aleatorio
      setPlayerScore((prevScore) => prevScore + Math.floor(Math.random() * 10) + 1); // Puntaje aleatorio entre 1 y 10
    } else if (alreadySelected) {
      setSelectedWarriors(selectedWarriors.filter((w) => w.id !== warrior.id));
      setPlayerLifePoints((prevLifePoints) => prevLifePoints + 10); // Restaurar puntos de vida cuando se deselecciona
      // Quitar puntaje aleatorio al deseleccionar un guerrero
      setPlayerScore((prevScore) => prevScore - Math.floor(Math.random() * 10) + 1); // Restar entre 1 y 10 puntos
    }
  };

  const handleModifyNick = () => {
    const newNick = prompt("Introduce un nuevo nickname:", playerNick);
    if (newNick && newNick.trim()) {
      setPlayerNick(newNick);
    }
  };

  const handleDeletePlayer = () => {
    if (window.confirm("¿Estás seguro de eliminar tu jugador y volver a ingresar un nickname?")) {
      setPlayerNick("");
      setHasEntered(false);
      setSelectedWarriors([]);
      setPlayerScore(0);
      setPlayerLifePoints(100);
    }
  };

  const openModal = () => {
    setIsModalOpen(true); // Abrir el modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cerrar el modal
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
        
        {/* Mostrar puntos de vida del jugador */}
        <p><strong>Puntos de Vida:</strong> {playerLifePoints}</p>
        
        {/* Mostrar puntaje del jugador */}
        <p><strong>Puntaje:</strong> {playerScore}</p>

        {/* Contenedor de botones para modificar y eliminar */}
        <div className="player-actions">
          <button className="btn-red" onClick={handleModifyNick}>Modificar Nickname</button>
          <button className="btn-red" onClick={handleDeletePlayer}>Eliminar Jugador</button>
        </div>
      </div>

      <h1 className="title">Gestión de Guerreros</h1>
      
      {/* Botón para abrir el modal */}
      <button onClick={openModal} style={{ padding: "10px 20px", marginBottom: "20px" }}>
        Agregar Guerrero
      </button>

      {/* Modal para agregar guerrero */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Aceptar</h2>
            <AddWarriorForm onAdd={addWarrior} />
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}

      <hr />
      <div className="warrior-list">
        {warriors.map((warrior) => {
          const isSelected = selectedWarriors.some((w) => w.id === warrior.id);
          const selectedIndex = selectedWarriors.findIndex((w) => w.id === warrior.id);

          return (
            <div
              key={warrior.id}
              className="warrior-card"
              style={{
                border: isSelected ? "2px solid green" : "1px solid gray",
                marginBottom: "10px",
                padding: "10px",
                position: "relative",
              }}
            >
              {isSelected && (
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "-10px",
                    backgroundColor: "#2ecc71",
                    color: "white",
                    borderRadius: "50%",
                    width: "26px",
                    height: "26px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "15px",
                    fontWeight: "bold",
                    boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                  }}
                >
                  {selectedIndex + 1}
                </div>
              )}

              <h3>{warrior.name}</h3>
              <p>Raza: {warrior.race}</p>
              <p>Tipo: {warrior.type}</p>
              <button onClick={() => handleSelectWarrior(warrior)}>
                {isSelected ? "Quitar" : "Seleccionar"}
              </button>
              <button onClick={() => handleViewDetails(warrior)}>Ver Detalles</button>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "linear-gradient(135deg, #fefefe, #e0f7fa)",
          padding: "20px",
          borderRadius: "14px",
          fontSize: "16px",
          color: "#333",
          boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
          maxWidth: "260px",
          zIndex: 999,
          border: "2px solid #00bcd4",
        }}
      >
        <strong style={{ fontSize: "17px", color: "#00796b" }}> Seleccionados:</strong>
        <ol style={{ paddingLeft: "20px", marginTop: "10px", marginBottom: "0" }}>
          {selectedWarriors.map((w) => (
            <li key={w.id} style={{ marginBottom: "6px" }}>{w.name}</li>
          ))}
        </ol>
      </div>

      <WarriorDetail
        warrior={selectedWarrior}
        onClose={handleCloseDetail}
        onDelete={handleDeleteWarrior}
        onEditAttribute={handleEditAttribute}
        onDeleteAttribute={handleDeleteAttribute}
      />
    </div>
  );
}

export default App;
