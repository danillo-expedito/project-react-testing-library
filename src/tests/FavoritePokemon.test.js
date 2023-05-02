import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Ao favoritar a partir da página de detalhes testa', () => {
  it('Se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);

    const noFavorites = screen.getByText(/no favorite pokémon found/i);
    expect(noFavorites).toBeInTheDocument();
  });
  it('Teste se apenas são exibidos os Pokémon favoritados.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
    const favorite = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);
    userEvent.click(favoriteLink);

    const pikachu = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachu).toBeInTheDocument();
  });
});
