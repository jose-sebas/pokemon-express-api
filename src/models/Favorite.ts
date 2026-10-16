import { Schema, model } from 'mongoose';

interface IFavorite {
  pokemonId: number;
}

const FavoriteSchema = new Schema<IFavorite>({
  pokemonId: { type: Number, required: true, unique: true }
});

export const Favorite = model<IFavorite>('Favorite', FavoriteSchema);
