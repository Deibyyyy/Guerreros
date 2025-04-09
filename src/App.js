import React, { useState } from "react";
import "./App.css";
import { warriors } from "./data/warriors";
import WarriorList from "./components/WarriorList";
import WarriorDetail from "./components/WarriorDetail";

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const selectedWarrior = warriors.find((w) => w.id === selectedId);

  return (
    <div className="App">
      <h1>Gestión de Guerreros</h1>
      <WarriorList warriors={warriors} onSelect={setSelectedId} />
      <WarriorDetail warrior={selectedWarrior} />
    </div>
  );
}

export default App;
