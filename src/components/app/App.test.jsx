import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';

const red = 'rgb(84, 24, 18)'; //#541812
const blue = 'rgb(0, 51, 235)'; //#0033eb
const green = 'rgb(59, 181, 3)'; //#3bb503
const yellow = 'rgb(255, 236, 0)'; //#ffec00

describe('App', () => {
  it('Changes color of swatch', () => {
    const { container } = render(<App />);
    expect(container).not.toBeEmptyDOMElement();

    const swatch = screen.getByRole('display', { name: 'swatch' });
    expect(swatch.style.backgroundColor).toEqual(red);

    const colorpick = screen.getByRole('color', { name: 'color-input' });
    fireEvent.change(colorpick, blue);
    waitFor(() => expect(colorpick).toHaveStyle({ 'background-color': blue }));

    const color2 = screen.getByRole('color', { name: 'color-input' });
    fireEvent.change(color2, green);
    waitFor(() => expect(color2).toHaveStyle({ 'background-color': green }));

    const color3 = screen.getByRole('color', { name: 'color-input' });
    fireEvent.change(color3, yellow);
    waitFor(() => expect(color3).toHaveStyle({ 'background-color': yellow }));
  });

  it('Changes color of swatch back to previously chosen color after hitting the undo button', () => {
    render(<App />);

    const undo = screen.getByRole('unbutton', { name: 'undo-button' });
    const prevcolor = screen.getByRole('color', { name: 'color-input' });

    fireEvent.change(prevcolor, yellow);
    fireEvent.change(prevcolor, green);
    fireEvent.change(prevcolor, blue);
    fireEvent.click(undo);
    return waitFor(() =>
      expect(prevcolor).toHaveStyle({ 'background-color': 'ButtonFace' })
    );
  });

  it('Changes color of swatch back to color previously selected before hitting the undo button, by clicking the redo button', () => {
    render(<App />);

    const redo = screen.getByRole('rebutton', { name: 'redo-button' });
    const prevcolor = screen.getByRole('color', { name: 'color-input' });

    fireEvent.change(prevcolor, yellow);
    fireEvent.change(prevcolor, green);
    fireEvent.change(prevcolor, blue);
    fireEvent.click(redo);
    return waitFor(() =>
      expect(prevcolor).toHaveStyle({ 'background-color': 'ButtonFace' })
    );
  });
});
