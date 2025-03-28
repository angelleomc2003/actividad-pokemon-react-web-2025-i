const API_URL = 'https://pokeapi.co/api/v2';

// Obtener lista de Pokémon (ordenada alfabéticamente)
export const getPokemonList = async (limit = 20) => {
  try {
    const response = await fetch(`${API_URL}/pokemon?limit=${limit}`);
    const data = await response.json();
    const pokemonPromises = data.results.map(async (pokemon) => {
      const detailResponse = await fetch(pokemon.url);
      const detailData = await detailResponse.json();
      return {
        id: detailData.id,
        name: detailData.name,
        image: detailData.sprites.front_default,
        backImage: detailData.sprites.back_default, // Imagen trasera (si deseas usar imagen animada, cámbiala por el GIF)
        height: detailData.height,
        weight: detailData.weight,
        types: detailData.types.map(type => type.type.name),
      };
    });
    return (await Promise.all(pokemonPromises)).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    return [];
  }
};

// Obtener detalles de un Pokémon
export const getPokemonDetails = async (name) => {
  try {
    const response = await fetch(`${API_URL}/pokemon/${name}`);
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
      backImage: data.sprites.back_default, // Imagen trasera o animada (si dispones del GIF, actualiza aquí la URL)
      height: data.height,
      weight: data.weight,
      types: data.types.map(type => type.type.name),
    };
  } catch (error) {
    console.error(`Error fetching details for ${name}:`, error);
    return null;
  }
};
