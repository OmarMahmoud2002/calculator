import { useContext } from "react";
import { CalcContext } from '../context/CalcContext'

const getStyleName = btn => {
  const className = {
    '=': 'equals',
    'x': 'opt',
    '-': 'opt',
    '+': 'opt',
    '/': 'opt',
    '√': 'sci',
    'x²': 'sci',
    'sin': 'sci',
    'cos': 'sci',
    'tan': 'sci'
  }
  return className[btn]
}

const Button = ({ value }) => {
  const { calc, setCalc } = useContext(CalcContext);

  // User click comma
  const commaClick = () => {
    // Reset if previous result was error
    if (calc.num === "Error" || calc.res === "Error") {
      setCalc({ sign: '', num: 0, res: 0, history: calc.history || [] });
      return;
    }
    
    // Don't add decimal if already exists
    if (calc.num.toString().includes('.')) {
      return;
    }
    
    // Limit digits including decimal
    const currentStr = calc.num.toString();
    if (currentStr.replace('-', '').length >= 11) { // Leave room for decimal
      return;
    }
    
    setCalc({
      ...calc,
      num: calc.num.toString() + '.'
    });
  }
  // User click C
  const resetClick = () => {
    setCalc({ 
      sign: '', 
      num: 0, 
      res: 0,
      history: calc.history || []
    })
  }
  // User click number
  const handleClickButton = () => {
    // Reset if previous result was error
    if (calc.num === "Error" || calc.res === "Error") {
      setCalc({ sign: '', num: 0, res: 0, history: calc.history || [] });
    }
    
    const currentValue = calc.num.toString();
    
    // Limit to 12 digits max (excluding decimal point)
    const digitCount = currentValue.replace('.', '').replace('-', '').length;
    if (digitCount >= 12) {
        return;
    }

    let numberValue;
    const numberString = value.toString();
    
    // Allow multiple zeros only if there's already a decimal point
    if (numberString === '0' && calc.num === 0 && !currentValue.includes('.')) {
        return; // Don't add leading zeros
    } else {
        // If current number is 0 and new input is not 0, replace it
        if (calc.num === 0 && numberString !== '0') {
            numberValue = Number(numberString);
        } else {
            // Append the digit
            numberValue = Number(currentValue + numberString);
        }
    }

    setCalc({
        ...calc,
        num: numberValue
    })
  }
  // User click operation
  const signClick = () => {
    // Reset if previous result was error
    if (calc.num === "Error" || calc.res === "Error") {
      setCalc({ sign: '', num: 0, res: 0, history: calc.history || [] });
      return;
    }
    
    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0
    })
  }
  // User click equals
  const equalsClick = () => {
    // Reset if previous result was error
    if (calc.num === "Error" || calc.res === "Error") {
      setCalc({ sign: '', num: 0, res: 0, history: calc.history || [] });
      return;
    }
    
    if(calc.res && calc.num && calc.sign) {
      const math = (a, b, sign) => {
        try {
          const result = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            'x': (a, b) => a * b,
            '/': (a, b) => {
              if (b === 0) return "Error";
              return a / b;
            },
          };
          const calcResult = result[sign](a, b);
          
          // Check for invalid results
          if (calcResult === Infinity || calcResult === -Infinity || isNaN(calcResult)) {
            return "Error";
          }
          
          return calcResult;
        } catch (error) {
          return "Error";
        }
      }
      const result = math(calc.res, calc.num, calc.sign);
      const operation = `${calc.res} ${calc.sign} ${calc.num} =`;
      setCalc({
        res: result,
        sign: '',
        num: 0,
        history: [...(calc.history || []), {operation, result}]
      })
    }
  }
  // User click persen
  const persenClick = () => {
    // Reset if previous result was error
    if (calc.num === "Error" || calc.res === "Error") {
      setCalc({ sign: '', num: 0, res: 0, history: calc.history || [] });
      return;
    }
    
    try {
      const newNum = calc.num / 100;
      const newRes = calc.res / 100;
      
      // Check for invalid results
      if (isNaN(newNum) || isNaN(newRes) || !isFinite(newNum) || !isFinite(newRes)) {
        setCalc({ ...calc, num: "Error" });
        return;
      }
      
      setCalc({
        ...calc,
        num: newNum,
        res: newRes,
        sign: ''
      })
    } catch (error) {
      setCalc({ ...calc, num: "Error" });
    }
  }
  // User click invert button
  const invertClick = () => {
    // Reset if previous result was error
    if (calc.num === "Error" || calc.res === "Error") {
      setCalc({ sign: '', num: 0, res: 0, history: calc.history || [] });
      return;
    }
    
    try {
      // Only invert the current number being displayed
      const currentValue = calc.num !== 0 ? calc.num : calc.res;
      const invertedValue = currentValue * -1;
      
      // Check for invalid results
      if (isNaN(invertedValue) || !isFinite(invertedValue)) {
        setCalc({ ...calc, num: "Error" });
        return;
      }
      
      if (calc.num !== 0) {
        setCalc({ ...calc, num: invertedValue });
      } else {
        setCalc({ ...calc, res: invertedValue });
      }
    } catch (error) {
      setCalc({ ...calc, num: "Error" });
    }
  }

  const handleScientific = () => {
    // Reset if previous result was error
    if (calc.num === "Error" || calc.res === "Error") {
      setCalc({ sign: '', num: 0, res: 0, history: calc.history || [] });
      return;
    }
    
    const currentValue = calc.num || calc.res || 0;
    let result;
    
    try {
      switch(value) {
        case '√': 
          if (currentValue < 0) {
            result = "Error";
          } else {
            result = Math.sqrt(currentValue);
          }
          break;
        case 'x²':
          result = Math.pow(currentValue, 2);
          break;
        case 'sin':
          result = Math.sin(currentValue * (Math.PI / 180));
          break;
        case 'cos':
          result = Math.cos(currentValue * (Math.PI / 180));
          break;
        case 'tan':
          result = Math.tan(currentValue * (Math.PI / 180));
          break;
        default:
          return;
      }
      
      // Check for invalid results
      if (result !== "Error" && (isNaN(result) || !isFinite(result))) {
        result = "Error";
      }
      
    } catch (error) {
      result = "Error";
    }
    
    setCalc({
      ...calc,
      num: result,
      res: result,
      sign: '',
      history: calc.history || []
    });
  };

  const handleBtnClick = () => {
    // Reset error state for any new input
    if (calc.num === "Error" && value !== 'C') {
      setCalc({
        ...calc,
        num: 0,
        res: 0,
        sign: ''
      });
    }

    const results = {
      '.': commaClick,
      'C': resetClick,
      '/': signClick,
      'x': signClick,
      '-': signClick,
      '+': signClick,
      '=': equalsClick,
      '%': persenClick,
      '+/-': invertClick,
      '+-': invertClick,  // Fallback for legacy references
      '√': handleScientific,
      'x²': handleScientific,
      'sin': handleScientific,
      'cos': handleScientific,
      'tan': handleScientific
    }
    if(results[value]) {
      return results[value]()
    } else {
      return handleClickButton()
    }
  }

  return (
    <button onClick={handleBtnClick} className={`${getStyleName(value)} button`}>{value}</button>
  )
}

export default Button
