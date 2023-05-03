import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente /Pokedex/', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const heandingTitle = screen.getByRole('heading', { name: /encountered pokémon/i, level: 2 });
    expect(heandingTitle).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
    renderWithRouter(<App />);

    const pikachu = screen.getByRole('img', { name: /pikachu sprite/i });
    const buttonNextPoke = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(pikachu).toBeInTheDocument();
    expect(buttonNextPoke).toBeDefined();

    userEvent.click(buttonNextPoke);
    const charmander = screen.getByRole('img', { name: /charmander sprite/i });
    expect(charmander).toHaveProperty('src', 'https://archives.bulbagarden.net/media/upload/0/0a/Spr_5b_004.png');
  });
  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonImage = screen.getAllByRole('img');
    expect(pokemonImage.length).toBe(1);
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const allBtn = screen.getByRole('button', { name: /all/i });
    const typesNames = typeButtons.map((type) => type.innerHTML);
    expect(typesNames).toEqual(types);
    expect(allBtn).toBeDefined();

    const fireButton = typeButtons[1];
    userEvent.click(fireButton);

    const typeText = screen.getAllByText('Fire');
    expect(typeText).toHaveLength(2);
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeDefined();

    const typeButtons = screen.getAllByTestId('pokemon-type-button');

    const fireButton = typeButtons[1];
    userEvent.click(fireButton);

    const fireType = screen.getAllByText('Fire');
    expect(fireType).toHaveLength(2);

    userEvent.click(allBtn);
    const electricType = screen.getAllByText('Electric');
    expect(electricType).toHaveLength(2);
  });
});
