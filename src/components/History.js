import { useContext } from "react"
import { CalcContext } from "../context/CalcContext"

const History = () => {
  const { calc, clearHistory } = useContext(CalcContext);

  return (
    <div className="history-panel">
      <div className="history-header">
        <h3>History</h3>
        <button 
          onClick={clearHistory}
          className="clear-history-btn"
          disabled={calc.history.length === 0}
        >
          Clear
        </button>
      </div>
      <div className="history-list">
        {calc.history.map((entry, index) => (
          <div key={index} className="history-entry">
            <div className="operation">{entry.operation}</div>
            <div className="result">{entry.result}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default History
