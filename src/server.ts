import express, { Request, Response, Application } from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import cors from 'cors';
import { Favorite } from './models/Favorite.js';

const app: Application = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.json());

// mongo DB connection
mongoose.connect('mongodb://localhost:27017/pokedex')
  .then(() => console.log('¡Conectado a MongoDB en Docker con éxito!'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// get all pokemons from 0 to 12 id
app.get('/api/pokemons', async (req: Request, res: Response): Promise<void> => {
    try {
      const listResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=0`);
      const pokemonResults = listResponse.data.results; 

      const detailedPokemonList = await Promise.all(
        pokemonResults.map(async (p: any) => {
          try {
            const [detailsRes] = await Promise.all([axios.get(p.url)]);
            
            const details = detailsRes.data;
            
            // take a look if the pokemon is a favorite
            const isFavorite = await Favorite.findOne({ pokemonId: details.id });
  
            return {
              id: details.id,
              name: details.name,
              sprites: details.sprites?.front_default || '',
              types: details.types ? details.types.map((t: any) => t.type.name) : [],
              isFavorite: !!isFavorite
            };
          } catch (individualError) {
            return {
              name: p.name,
              error: 'It was not possible to load information',
            };
          }
        })
      );
  
      res.status(200).json({
        count: listResponse.data.count, 
        results: detailedPokemonList
      });
  
    } catch (error: any) {
      res.status(500).json({ message: 'error when get all pokemons', error: error.message });
    }
  });
  
// get specific pokemon 
app.get('/api/pokemon/:nameOrId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { nameOrId } = req.params;

    const pokeApiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`);
    const pokemonData = pokeApiResponse.data;

    // take a look on the DB to find if the pokemon is a favorite one
    const isFavoriteInDb = await Favorite.findOne({ pokemonId: pokemonData.id });

    const modifiedResponse = [{
      id: pokemonData.id,
      name: pokemonData.name,
      sprites: pokemonData.sprites.front_default,
      types: pokemonData.types.map((t: any) => t.type.name),
      isFavorite: !!isFavoriteInDb 
    }];

    res.status(200).json({results: modifiedResponse});
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: 'Pokemon not found' });
      return;
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



app.post('/api/favorites', async (req: Request, res: Response): Promise<void> => {
  try {
    const { pokemonId } = req.body;

    if (!pokemonId) {
      res.status(400).json({ message: 'it is required a pokemon' });
      return;
    }

    // we save only the id in the DB
    await Favorite.findOneAndUpdate(
      { pokemonId },
      { pokemonId },
      { upsert: true, new: true }
    );

    res.status(201).json({ message: `Pokemon #${pokemonId} saved as favorite` });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
