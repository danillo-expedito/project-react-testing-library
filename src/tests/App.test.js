import userEvent from '@testing-library/user-event';
import React from 'react';
import { act, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa se o topo da aplicação contém um conjunto fixo de links', () => {
  it('Se o link para página /Home/ está presente na aplicação e funcionando', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Se o link para página /About/ está presente na aplicação e funcionando', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Se o link para página /Favorite Pokémon/ está presente na aplicação e funcionando', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Se a URL digitada for inválida, o usuário é direcionando a página /Not Found/', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/randomurl');
    });

    const notFoundText = screen.getByRole('heading', { name: /page requested not found/i });
    expect(notFoundText).toBeInTheDocument();
  });
});
