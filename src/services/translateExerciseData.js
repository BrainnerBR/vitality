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

export const traducirEjercicio = (ejercicio) => {
  return {
    ...ejercicio,
    name: traducirNombre(ejercicio.name),
    type: traduccionesTipo[ejercicio.type] || ejercicio.type,
    equipment: traduccionesEquipo[ejercicio.equipment] || ejercicio.equipment,
    difficulty: traduccionesDificultad[ejercicio.difficulty] || ejercicio.difficulty,
       muscle: traduccionesMusculos[ejercicio.muscle] || ejercicio.muscle,
  };
};

// Traducciones más amplias de nombres
const traducirNombre = (nombre) => {
  return nombre
    .toLowerCase()
    .replace(/squat/g, "sentadilla")
    .replace(/push[- ]?up/g, "flexión")
    .replace(/pull[- ]?up/g, "dominada")
    .replace(/lunge/g, "zancada")
    .replace(/crunch/g, "abdominal")
    .replace(/plank/g, "plancha")
    .replace(/row/g, "remo")
    .replace(/deadlift/g, "peso muerto")
    .replace(/bench press/g, "press de banca")
    .replace(/press/g, "press")
    .replace(/jump/g, "salto")
    .replace(/jumping/g, "saltando")
    .replace(/run/g, "correr")
    .replace(/jog/g, "trote")
    .replace(/dip/g, "fondos")
    .replace(/curl/g, "curl")
    .replace(/fly/g, "apertura")
    .replace(/extension/g, "extensión")
    .replace(/raise/g, "elevación")
    .replace(/twist/g, "giro")
    .replace(/rotation/g, "rotación")
    .replace(/sit[- ]?up/g, "abdominal tradicional")
    .replace(/mountain climber/g, "escaladores")
    .replace(/burpee/g, "burpee")
    .replace(/high knees/g, "rodillas altas")
    .replace(/calf/g, "pantorrilla")
    .replace(/leg/g, "pierna")
    .replace(/arm/g, "brazo")
    .replace(/shoulder/g, "hombro")
    .replace(/chest/g, "pecho")
    .replace(/back/g, "espalda")
    .replace(/bicep/g, "bíceps")
    .replace(/tricep/g, "tríceps")
    .replace(/hip/g, "cadera")
    .replace(/glute/g, "glúteo")
    .replace(/bridge/g, "puente")
    .replace(/pull/g, "jalón")
    .replace(/push/g, "empuje")
    .replace(/overhead/g, "sobre la cabeza")
    .replace(/incline/g, "inclinado")
    .replace(/decline/g, "declinado")
    .replace(/close[- ]?grip/g, "agarre cerrado")
    .replace(/wide[- ]?grip/g, "agarre ancho")
    .replace(/reverse/g, "inverso")
    .replace(/seated/g, "sentado")
    .replace(/standing/g, "de pie")
    .replace(/lying/g, "acostado")
    .replace(/weighted/g, "con peso")
    .replace(/bodyweight/g, "peso corporal")
    .replace(/hold/g, "sostén")
    .replace(/climber/g, "escalador")
    .replace(/clean/g, "cargada")
    .replace(/snatch/g, "arrancada")
    .replace(/thruster/g, "thruster")
    .replace(/step[- ]?up/g, "subida")
    .replace(/box/g, "caja")
    .replace(/walk/g, "caminar")
    .replace(/swing/g, "balanceo")
    .replace(/wall/g, "pared")
    .replace(/jack/g, "saltos")
    .replace(/\b(\w)/g, l => l.toUpperCase()); // Capitaliza cada palabra
};
