import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa a funcionalidade do componente /Pokemon/', () => {
  it('Se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName.innerHTML).toBe('Pikachu');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe('Electric');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');

    const pokemonImage = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveProperty('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage).toHaveProperty('alt', 'Pikachu sprite');
  });
  it('Se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeDefined();

    userEvent.click(detailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemon/25');

    const favorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favorite);

    const star = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(star).toBeInTheDocument();
    expect(star).toHaveProperty('src', 'http://localhost/star-icon.svg');
    expect(star).toHaveProperty('alt', 'Pikachu is marked as favorite');
  });
});
