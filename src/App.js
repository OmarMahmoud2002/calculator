import './components/Calculator.css';
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import Button from './components/Button'
import History from "./components/History";
import CalcProvider from "./context/CalcContext";

const btnValues = [
  ["C", "+/-", "%"],
  [7, 8, 9],
  [4, 5, 6],
  [1, 2, 3],
  [0, ".", "="],
];

function App() {
  const scientificValues = ["√", "x²", "sin", "cos", "tan"];
  const operatorValues = ["/", "x", "-", "+"];
  
  return (
    <CalcProvider>
      <Wrapper>
        <div className="calculator-container">
          <Screen />
          <div className="grid-layout">
            <div className="scientific-panel">
              {scientificValues.map((btn, i) => (
                <Button value={btn} key={`sci-${i}`} />
              ))}
            </div>
            
            <div className="main-panel">
              <div className="number-grid">
                {btnValues.flat().map((btn, i) => (
                  <Button value={btn} key={`main-${i}`} />
                ))}
              </div>
            </div>
            
            <div className="operator-panel">
              {operatorValues.map((btn, i) => (
                <Button value={btn} key={`op-${i}`} />
              ))}
            </div>
          </div>
          <History />
        </div>
      </Wrapper>
    </CalcProvider>
  );
}

export default App;
