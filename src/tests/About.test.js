import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Testa se as informações estão dispostas corretamente na página About', () => {
  it('Se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const pageTitle = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(pageTitle).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    renderWithRouter(<About />);

    const firstParagraph = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
    const secondParagraph = screen.getByText(/one can filter pokémon by type, and see more details for each one of them/i);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexImg = screen.getByRole('img', { name: /pokédex/i });
    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
