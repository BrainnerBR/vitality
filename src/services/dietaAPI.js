import axios from "axios";

const APP_ID = "67a3159f";
const APP_KEY = "cbb973c6ec235cbe81aba265b167fcb8";

export const buscarComida = async (query) => {
  try {
    const response = await axios.post(
      "https://trackapi.nutritionix.com/v2/natural/nutrients",
      { query },
      {
        headers: {
          "x-app-id": APP_ID,
          "x-app-key": APP_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    
    return response.data.foods[0]; // solo retornamos el primer resultado
  } catch (error) {
    console.error("Error al buscar comida:", error);
    return null;
  }
  
};
export const buscarSugerencias = async (query) => {
  try {
    const response = await fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${query}`, {
      headers: {
        "x-app-id": APP_ID,
        "x-app-key": APP_KEY,
      },
    });

    const data = await response.json();
    return data.common.map(item => item.food_name);
  } catch (error) {
    console.error("Error al buscar sugerencias:", error);
    return [];
  }
};
