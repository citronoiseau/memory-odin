import { useEffect, useState } from "react";

function getRandomIds(length) {
  const ids = new Set();
  const max = 1010;
  while (ids.size < length) {
    const randomId = Math.floor(Math.random() * max);
    ids.add(randomId);
  }
  return Array.from(ids);
}

export default function usePokemon(length = 10, refreshKey) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ids = getRandomIds(length);
        const detailed_data = await Promise.all(
          ids.map(async (id) => {
            const pokemon_data = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${id}`
            );
            const pokemon_details = await pokemon_data.json();

            return {
              id: id,
              name: pokemon_details.species.name,
              image:
                pokemon_details.sprites.other["official-artwork"].front_default,
            };
          })
        );
        setData(detailed_data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [length, refreshKey]);
  console.log(data);
  return data;
}
