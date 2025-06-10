// utils/translateExerciseData.js

const traduccionesTipo = {
  strength: "fuerza",
  cardio: "cardio",
  stretching: "estiramiento",
  plyometrics: "pliometría",
  powerlifting: "levantamiento de potencia",
  olympic_weightlifting: "levantamiento olímpico",
  strongman: "strongman"
};

const traduccionesEquipo = {
  body_only: "solo cuerpo",
  barbell: "barra",
  dumbbell: "mancuerna",
  kettlebell: "kettlebell",
  machine: "máquina",
  cable: "polea",
  band: "banda elástica",
  medicine_ball: "pelota medicinal",
  stability_ball: "pelota de estabilidad",
  ez_barbell: "barra EZ",
  weighted: "con peso",
  other: "otro"
};

const traduccionesMusculos = {
  "abdominals": "Abdominales",
  "abductors": "Abductores",
  "adductors": "Aductores",
  "biceps": "Bíceps",
  "calves": "Pantorrillas",
  "chest": "Pecho",
  "forearms": "Antebrazos",
  "glutes": "Glúteos",
  "hamstrings": "Isquiotibiales",
  "lats": "Dorsales",
  "lower_back": "Zona lumbar",
  "middle_back": "Espalda media",
  "neck": "Cuello",
  "quadriceps": "Cuádriceps",
  "traps": "Trapecios",
  "triceps": "Tríceps",
  "shoulders": "Hombros",
  "cardiovascular system": "Sistema cardiovascular"
};


const traduccionesDificultad = {
  beginner: "principiante",
  intermediate: "intermedio",
  expert: "avanzado"
};

export const traducirEjercicio = (nombre) => {
  if (!nombre || typeof nombre !== "string") return "";

  const mapa = {
    "bench press": "press de banca",
    "squat": "sentadilla",
    "push-up": "flexión de pecho",
    "pull-up": "dominada",
    "bicep curl": "curl de bíceps",
  };

  const key = nombre.toLowerCase();
  return mapa[key] || nombre;
};



