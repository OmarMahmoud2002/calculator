import { useContext } from "react"
import { CalcContext } from "../context/CalcContext"
import { Textfit } from 'react-textfit';

const Screen = () => {
  const { calc } = useContext(CalcContext);
  
  const formatDisplay = (value) => {
    if (value === Infinity) return "Error";
    if (value === -Infinity) return "Error";
    if (isNaN(value)) return "Error";
    if (value === 0) return "0";
    
    // Format large numbers and limit decimal places
    if (typeof value === 'number') {
        if (Math.abs(value) >= 1e12) {
            return value.toExponential(6);
        }
        return value.toString().length > 12 ? value.toPrecision(12) : value;
    }
    return value; // Return "Error" string directly
  };
  
  const displayValue = calc.num !== 0 ? calc.num : calc.res;

  return (
    <Textfit className="screen" max={70} mode="single">
      {formatDisplay(displayValue)}
    </Textfit>
  )
}

export default Screen
