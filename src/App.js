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
        <Screen />
        <div className="calculator-body">
          <div className="scientific-row">
            {scientificValues.map((btn, i) => (
              <Button value={btn} key={`sci-${i}`} />
            ))}
          </div>
          <div className="main-calculator">
            <div className="left-panel">
              {btnValues.flat().map((btn, i) => (
                <Button value={btn} key={`main-${i}`} />
              ))}
            </div>
            <div className="right-panel">
              {operatorValues.map((btn, i) => (
                <Button value={btn} key={`op-${i}`} />
              ))}
            </div>
          </div>
        </div>
        <History />
      </Wrapper>
    </CalcProvider>
  );
}

export default App;
