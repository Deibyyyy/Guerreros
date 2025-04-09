import { Warrior } from "../Models/Warrior";

const races = ["Humano", "Elfo", "Orco", "Enano"];
const types = ["Arquero", "Mago", "Guerrero", "Asesino"];
const powerList = [
  "Fuego", "Hielo", "Viento", "Tierra", "Rayo",
  "Curación", "Invisibilidad", "Telequinesis", "Vuelo", "Súper fuerza"
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomName() {
  const names = ["Thoran", "Arya", "Drog", "Lira", "Kron", "Zara"];
  return getRandomElement(names);
}

function generatePowers() {
  const shuffled = powerList.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
}

export const warriors = Array.from({ length: 10 }, (_, i) => {
  return new Warrior(
    i + 1,
    generateRandomName(),
    20 + Math.floor(Math.random() * 10),
    getRandomElement(races),
    getRandomElement(types),
    generatePowers()
  );
});


