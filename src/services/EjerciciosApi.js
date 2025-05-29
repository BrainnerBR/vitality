const API_URL = 'https://api.api-ninjas.com/v1/exercises?';
const API_KEY = 'GaJnNr5Q3A1/aaDIzJZ0iQ==GEZxlnufWISz3LSG'; 

export const getEjerciciosPorMusculo = async (muscle = 'chest', limit = 3) => {
  try {
    const response = await fetch(`${API_URL}?muscle=${muscle}&limit=${limit}`, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los ejercicios');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en getEjerciciosPorMusculo:', error);
    return [];
  }
};
