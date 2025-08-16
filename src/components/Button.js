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
    setCalc({
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
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
    const currentValue = calc.num === "Error" ? "0" : calc.num.toString();
    
    // Limit to 12 digits max
    if (currentValue.replace('.', '').length >= 12) {
        return;
    }

    let numberValue;
    const numberString = value.toString();
    
    // Handle decimal point
    if (numberString === '.') {
        if (currentValue.includes('.')) return;
        numberValue = currentValue + '.';
    } else {
        numberValue = currentValue === '0' ? numberString : currentValue + numberString;
    }

    // Convert back to number if not ending with decimal
    const numericValue = numberValue.endsWith('.') ? numberValue : Number(numberValue);
    
    setCalc({
        ...calc,
        num: numericValue
    })
  }
  // User click operation
  const signClick = () => {
    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0
    })
  }
  // User click equals
  const equalsClick = () => {
    if(calc.res && calc.num) {
      const math = (a, b, sign) => {
        try {
          const result = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            'x': (a, b) => a * b,
            '/': (a, b) => {
              if (b === 0) throw new Error("Division by zero");
              return a / b;
            },
          };
          return result[sign](a, b);
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
    setCalc({
      ...calc,
      num: (calc.num / 100),
      res: (calc.res / 100),
      sign: ''
    })
  }
  // User click invert button
  const invertClick = () => {
    setCalc({
      ...calc,
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: ''
    })
  }

  const handleScientific = () => {
    const currentValue = calc.num || calc.res || 0;
    let result;
    
    switch(value) {
      case '√': 
        result = currentValue >= 0 ? Math.sqrt(currentValue) : "Error";
        break;
      case 'x²':
        result = Math.pow(currentValue, 2);
        break;
      case 'sin':
        result = Math.sin(currentValue * (Math.PI / 180)); // Convert to radians
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
      '+-': invertClick,
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
