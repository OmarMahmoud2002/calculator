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
        // For very large numbers, use scientific notation
        if (Math.abs(value) >= 1e10) {
            return value.toExponential(5);
        }
        
        // For regular numbers, format with proper decimal places
        const valueStr = value.toString();
        if (valueStr.length > 12) {
            // If too long, use precision
            return Number(value.toPrecision(10)).toString();
        }
        
        return valueStr;
    }
    return value; // Return "Error" string directly
  };
  
  const displayValue = calc.num !== 0 ? calc.num : calc.res;

  return (
    <div className="screen">
      <Textfit 
        className="screen-text" 
        max={50} 
        min={20}
        mode="single"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        {formatDisplay(displayValue)}
      </Textfit>
    </div>
  )
}

export default Screen
