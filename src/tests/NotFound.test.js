import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Testa o componente /Not Found/', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const pageHeading = screen.getByRole('heading', { name: /page requested not found/i, level: 2 });
    expect(pageHeading).toBeInTheDocument();
  });
  it('Teste se a página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const sadPikachuImage = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });

    expect(sadPikachuImage).toBeVisible();
    expect(sadPikachuImage).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
