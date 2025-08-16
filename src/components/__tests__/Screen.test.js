import { render } from '@testing-library/react';
import { CalcProvider } from '../../context/CalcContext';
import Screen from '../Screen';

describe('Screen Display', () => {
  test('formats large numbers with scientific notation', () => {
    const { rerender } = render(
      <CalcProvider value={{ num: 1234567890123 }}>
        <Screen />
      </CalcProvider>
    );
    expect(screen.getByText('1.234567890123e+12')).toBeInTheDocument();

    rerender(
      <CalcProvider value={{ num: 0.000000123456 }}>
        <Screen />
      </CalcProvider>
    );
    expect(screen.getByText('1.23456e-7')).toBeInTheDocument();
  });

  test('displays error messages correctly', () => {
    render(
      <CalcProvider value={{ num: 'Error' }}>
        <Screen />
      </CalcProvider>
    );
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  test('limits to 12 digits display', () => {
    const { rerender } = render(
      <CalcProvider value={{ num: 123456789012.34 }}>
        <Screen />
      </CalcProvider>
    );
    expect(screen.getByText('123456789012')).toBeInTheDocument();

    rerender(
      <CalcProvider value={{ num: 0.1234567890123 }}>
        <Screen />
      </CalcProvider>
    );
    expect(screen.getByText('0.123456789012')).toBeInTheDocument();
  });
});
