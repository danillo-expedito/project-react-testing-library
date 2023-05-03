import userEvent from '@testing-library/user-event';
import React from 'react';
import { act, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa funcionalidade do componente /PokemonDetails/', () => {
  const URL_TESTE = '/pokemon/25';

  it('Se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    act(() => {
      history.push(URL_TESTE);
    });

    const heading = screen.getByRole('heading', { name: /pikachu details/i, level: 2 });
    expect(heading).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();

    const summaryHeading = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(summaryHeading).toBeInTheDocument();
  });
  it('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(URL_TESTE);
    });

    const mapHeading = screen.getByRole('heading', { name: /game locations of pikachu/i, level: 2 });
    expect(mapHeading).toBeInTheDocument();

    const mapOneName = screen.getByText(/kanto viridian forest/i);
    const mapTwoName = screen.getByText(/kanto power plant/i);
    expect(mapOneName).toBeInTheDocument();
    expect(mapTwoName).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    const mapOneImg = images[1];
    const mapTwoImg = images[2];

    expect(mapOneImg).toHaveProperty('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapOneImg).toHaveProperty('alt', 'Pikachu location');
    expect(mapTwoImg).toHaveProperty('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(mapTwoImg).toHaveProperty('alt', 'Pikachu location');
  });
  it('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(URL_TESTE);
    });

    const favorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favorite);
    const star = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(star).toBeInTheDocument();

    userEvent.click(favorite);
    expect(star).not.toBeInTheDocument();
  });
});
