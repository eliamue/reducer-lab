import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';

const red = 'rgb(255, 0, 0)';
const blue = 'rgb(0, 51, 235)'; //#0033eb
const green = 'rgb(59, 181, 3)'; //#3bb503

describe('App', () => {
  it('Changes color of swatch', () => {
    const { container } = render(<App />);
    expect(container).not.toBeEmptyDOMElement();

    const swatch = screen.getByLabelText('display');
    expect(swatch.style.backgroundColor).toEqual(red);

    const colorpick = screen.getByLabelText('color-picker');

    fireEvent.change(colorpick, blue);
    waitFor(() => expect(colorpick).toHaveStyle({ 'background-color': blue }));

    fireEvent.change(colorpick, green);
    waitFor(() => expect(colorpick).toHaveStyle({ 'background-color': green }));

    const undo = screen.getByLabelText('undo-button');
    fireEvent.click(undo);
    waitFor(() =>
      expect(colorpick).toHaveStyle({ 'background-color': blue }));

    const redo = screen.getByLabelText('redo-button');
    fireEvent.click(redo);
    waitFor(() =>
      expect(colorpick).toHaveStyle({ 'background-color': green })
    );
  });
});
