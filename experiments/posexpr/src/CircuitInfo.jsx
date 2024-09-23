/* eslint-disable react/prop-types */

const CircuitInfo = ({ circuitDiagram, stateVector, errorMessage }) => {
  return (
    <div>
      <h2>Circuit Diagram</h2>
      <pre>{circuitDiagram}</pre>
      <h2>State Information</h2>
      <div className="state-info">
     
        {stateVector.map((state, index) => (
          <p key={index}>
            |{state.binary}⟩: 
            Magnitude: {state.magnitude.toFixed(4)},
            Phase: {(state.phase * 180 / Math.PI).toFixed(2)}°,
            Probability: {state.probability.toFixed(4)}
          </p>
        ))}
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default CircuitInfo;