import { render, screen, fireEvent } from '@testing-library/react';
import { CalcProvider } from '../../context/CalcContext';
import Button from '../Button';

describe('Calculator Operations', () => {
  const renderCalculator = () => {
    return render(
      <CalcProvider>
        <Button value="C" />
        <Button value="√" />
        <Button value="x²" />
        <Button value="sin" />
        <Button value="cos" />
        <Button value="tan" />
        <Button value="+" />
        <Button value="-" />
        <Button value="x" />
        <Button value="/" />
        <Button value="=" />
        <Button value="9" />
      </CalcProvider>
    );
  };

  test('performs basic scientific operations', () => {
    const { getByText } = renderCalculator();
    
    // Test square root
    fireEvent.click(getByText('9'));
    fireEvent.click(getByText('√'));
    expect(screen.getByText('3')).toBeInTheDocument();

    // Test square
    fireEvent.click(getByText('9'));
    fireEvent.click(getByText('x²'));
    expect(screen.getByText('81')).toBeInTheDocument();

    // Test sin (90 degrees should be 1)
    fireEvent.click(getByText('9'));
    fireEvent.click(getByText('0'));
    fireEvent.click(getByText('sin'));
    expect(screen.getByText(/^0\.9999999/)).toBeInTheDocument();
  });

  test('handles errors properly', () => {
    const { getByText } = renderCalculator();
    
    // Test division by zero
    fireEvent.click(getByText('9'));
    fireEvent.click(getByText('/'));
    fireEvent.click(getByText('0'));
    fireEvent.click(getByText('='));
    expect(screen.getByText('Error')).toBeInTheDocument();

    // Test negative square root
    fireEvent.click(getByText('9'));
    fireEvent.click(getByText('+/-'));
    fireEvent.click(getByText('√'));
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  test('maintains operation history', () => {
    const { getByText } = renderCalculator();
    
    fireEvent.click(getByText('9'));
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('3'));
    fireEvent.click(getByText('='));
    
    // Get the context instance to check history
    const calcProvider = screen.getByTestId('calc-provider');
    const history = calcProvider._context._currentValue.calc.history;
    
    expect(history).toHaveLength(1);
    expect(history[0].operation).toBe('9 + 3 =');
    expect(history[0].result).toBe(12);
  });
});
