from flask import Flask, jsonify, request,render_template
from flask_cors import CORS
import cirq
import cirq_web
import plotly
from plotly import graph_objs as go
import numpy as np
import json
import traceback

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def create_circuit_from_json(circuit_json):
    try:
        circuit_data = json.loads(circuit_json)
    except json.JSONDecodeError as e:
        raise ValueError("Invalid JSON format") from e
    
    num_qubits = len(circuit_data['circuit']['layout']['qubits'])
    qubits = cirq.LineQubit.range(num_qubits)
    circuit = cirq.Circuit()

    for operation in circuit_data['circuit']['operations']:
        gate_type = operation['type']
        targets = operation.get('targets', [])
        control = operation.get('control')
        target = None
        control_qubit = None

        if targets:
            target_str = targets[0]
            if target_str.startswith('q'):
                target = qubits[int(target_str[1:])]
            else:
                raise ValueError(f"Invalid target qubit format: {target_str}")

        angle = operation.get('angle')

        if gate_type == 'CNOT':
            if control is None or not targets:
                raise ValueError("Control and target qubits must be specified for CNOT")
            control_str = control
            if control_str.startswith('q'):
                control_qubit = qubits[int(control_str[1:])]
                target = qubits[int(targets[0][1:])]  # Use the first target for CNOT
                circuit.append(cirq.CNOT(control_qubit, target))
            else:
                raise ValueError(f"Invalid control qubit format: {control_str}")
        elif gate_type == 'SWAP':
            if len(targets) == 2:
                target1 = qubits[int(targets[0][1:])]
                target2 = qubits[int(targets[1][1:])]
                circuit.append(cirq.SWAP(target1, target2))
            else:
                raise ValueError("SWAP gate requires exactly two target qubits")
        elif gate_type == 'H':
            if target is not None:
                circuit.append(cirq.H(target))
            else:
                raise ValueError("Target qubit must be specified for Hadamard gate")
        elif gate_type == 'X':
            if target is not None:
                circuit.append(cirq.X(target))
            else:
                raise ValueError("Target qubit must be specified for X gate")
        elif gate_type == 'Y':
            if target is not None:
                circuit.append(cirq.Y(target))
            else:
                raise ValueError("Target qubit must be specified for Y gate")
        elif gate_type == 'Z':
            if target is not None:
                circuit.append(cirq.Z(target))
            else:
                raise ValueError("Target qubit must be specified for Z gate")
        elif gate_type == 'RX':
            if angle is None:
                raise ValueError("RX gate requires an angle")
            if target is not None:
                circuit.append(cirq.rx(angle).on(target))
            else:
                raise ValueError("Target qubit must be specified for RX gate")
        elif gate_type == 'RY':
            if angle is None:
                raise ValueError("RY gate requires an angle")
            if target is not None:
                circuit.append(cirq.ry(angle).on(target))
            else:
                raise ValueError("Target qubit must be specified for RY gate")
        elif gate_type == 'RZ':
            if angle is None:
                raise ValueError("RZ gate requires an angle")
            if target is not None:
                circuit.append(cirq.rz(angle).on(target))
            else:
                raise ValueError("Target qubit must be specified for RZ gate")
        else:
            raise ValueError(f"Unsupported gate type: {gate_type}")

    circuit.append(cirq.measure(*qubits, key='result'))
    ckt = cirq_web.Circuit3D(circuit)


    a = ckt.generate_html_file(output_directory=r"C:\Users\sstha\Desktop\FinalPos__\experiments\posexpr\templates",)

    with open(a, "r") as f:
        html = f.readlines()



    with open(r'C:\Users\sstha\Desktop\FinalPos__\experiments\posexpr\templates\Ckt3d.html','w+',encoding="utf-8") as f:
        f.write("""

<!DOCTYPE html>
<html lang="en">
<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      
                
<style>                
:root {
  --color-bg: #0a192f; /* Dark Navy */
  --color-text: #ccd6f6; /* Light Blue */
  --color-border: #1e2a47; /* Medium Navy */
  --color-primary: #64ffda; /* Teal Accent */
  --color-secondary: #112240; /* Darker Navy */
  --color-accent: #f07167; /* Soft Red Accent */
  --color-code-bg: #112240; /* Code Block Background */
  --color-code-text: #a8dadc; /* Code Text */
  --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.base {
    display: flex;
    gap: 20px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    background: var(--color-secondary);
    border: 1px solid var(--color-border);
    border-radius: 8px;
}

.model, .documentation {
    flex: 1;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 20px;
    box-sizing: border-box;
    color: var(--color-text);
}

/* Responsive design: stack the divs vertically on smaller screens */
@media (max-width: 768px) {
    .base {
        flex-direction: column;
    }
}

</style>

</head>
<body>
 <div class="base">
    <div class="model">
                


""")
        for i in range(len(html)):
            f.write(html[i])
        f.write("""

   
            Model Content</div>
    <div class="documentation">
                <p>Documentation Content</p>
           
     <div class="gate-section">
            <h3>Hadamard (H) Gate</h3>
            <p class="description">The Hadamard gate creates a superposition state from a basis state.</p>
            <pre>{
    "type": "H",
    "targets": ["q0"]
}</pre>
        </div>

        <!-- X Gate -->
        <div class="gate-section">
            <h3>Pauli-X (X) Gate</h3>
            <p class="description">The Pauli-X gate acts as a quantum bit flip, analogous to the NOT gate in classical computing.</p>
            <pre>{
    "type": "X",
    "targets": ["q1"]
}</pre>
        </div>

        <!-- Y Gate -->
        <div class="gate-section">
            <h3>Pauli-Y (Y) Gate</h3>
            <p class="description">The Pauli-Y gate is a combination of the X and Z gates, introducing a 90-degree phase shift.</p>
            <pre>{
    "type": "Y",
    "targets": ["q0"]
}</pre>
        </div>

        <!-- Z Gate -->
        <div class="gate-section">
            <h3>Pauli-Z (Z) Gate</h3>
            <p class="description">The Pauli-Z gate flips the phase of the qubit if it is in the state |1⟩.</p>
            <pre>{
    "type": "Z",
    "targets": ["q0"]
}</pre>
        </div>

        <!-- CNOT Gate -->
        <div class="gate-section">
            <h3>CNOT Gate</h3>
            <p class="description">The Controlled-NOT (CNOT) gate flips the target qubit if the control qubit is in state 1.</p>
            <pre>{
    "type": "CNOT",
    "control": "q0",
    "targets": ["q1"]
}</pre>
        </div>

        <!-- SWAP Gate -->
        <div class="gate-section">
            <h3>SWAP Gate</h3>
            <p class="description">The SWAP gate exchanges the states of two qubits.</p>
            <pre>{
    "type": "SWAP",
    "targets": ["q1", "q2"]
}</pre>
        </div>

        <!-- T Gate -->
        <div class="gate-section">
            <h3>T Gate</h3>
            <p class="description">The T gate is a phase gate that applies a π/4 phase shift to the qubit.</p>
            <pre>{
    "type": "T",
    "targets": ["q0"]
}</pre>
        </div>

        <!-- S Gate -->
        <div class="gate-section">
            <h3>S Gate</h3>
            <p class="description">The S gate, also called the phase gate, applies a π/2 phase shift to the qubit.</p>
            <pre>{
    "type": "S",
    "targets": ["q0"]
}</pre>
        </div>

        <!-- Toffoli Gate -->
        <div class="gate-section">
            <h3>Toffoli (CCX) Gate</h3>
            <p class="description">The Toffoli gate, or CCX, is a three-qubit gate that flips the target qubit if both control qubits are in state 1.</p>
            <pre>{
    "type": "CCX",
    "control1": "q0",
    "control2": "q1",
    "targets": ["q2"]
}</pre>
        </div>

        <!-- RX Gate -->
        <div class="gate-section">
            <h3>RX Gate</h3>
            <p class="description">The RX gate rotates the qubit around the X-axis by the given angle θ.</p>
            <pre>{
    "type": "RX",
    "targets": ["q0"],
    "theta": 1.57
}</pre>
        </div>

        <!-- RY Gate -->
        <div class="gate-section">
            <h3>RY Gate</h3>
            <p class="description">The RY gate rotates the qubit around the Y-axis by the given angle θ.</p>
            <pre>{
    "type": "RY",
    "targets": ["q0"],
    "theta": 1.57
}</pre>
        </div>

        <!-- RZ Gate -->
        <div class="gate-section">
            <h3>RZ Gate</h3>
            <p class="description">The RZ gate rotates the qubit around the Z-axis by the given angle θ.</p>
            <pre>{
    "type": "RZ",
    "targets": ["q0"],
    "theta": 1.57
}</pre>
        </div>

        <!-- U3 Gate -->
        <div class="gate-section">
            <h3>U3 Gate</h3>
            <p class="description">The U3 gate applies a general rotation to a qubit with three parameters (θ, φ, λ).</p>
            <pre>{
    "type": "U3",
    "targets": ["q0"],
    "theta": 1.57,
    "phi": 0.785,
    "lambda": 0.785
}</pre>
                </div>
        </div>
    </div>
</div>
</body>
</html>

""")
    return circuit


def simulate_circuit(circuit):
    simulator = cirq.Simulator()
    result = simulator.simulate(circuit)
    return result


@app.route("/3dckt")
def get_3d():
    return render_template(r'Ckt3d.html')

@app.route("/documentation")
def docs():
    return render_template(r'docmentation.html')

@app.route("/")
def index():
    return render_template(r'welcome.html')



@app.route('/simulate_circuit', methods=['POST'])
def simulate_custom_circuit():
    try:
        circuit_json = request.json['circuit']
        circuit = create_circuit_from_json(circuit_json)
        result = simulate_circuit(circuit)
        state_vector = result.final_state_vector
        num_qubits = int(np.log2(len(state_vector)))
        
        state_list = []
        for i, amplitude in enumerate(state_vector):
            magnitude = abs(amplitude)
            phase = np.angle(amplitude)
            state_list.append({
                'index': i,
                'binary': f'{i:0{num_qubits}b}',
                'magnitude': float(magnitude),
                'phase': float(phase),
                'probability': float(magnitude**2),
                'real': float(amplitude.real),
                'imag': float(amplitude.imag)
            })
        
        # Create probability bar chart
        prob_data = go.Bar(
            x=[state['binary'] for state in state_list],
            y=[state['probability'] for state in state_list],
            name='Probability'
        )
        prob_layout = go.Layout(title='State Probabilities', xaxis_title='State', yaxis_title='Probability')
        prob_plot = go.Figure(data=[prob_data], layout=prob_layout)
        prob_plot_json = json.dumps(prob_plot, cls=plotly.utils.PlotlyJSONEncoder)

        # Create phase polar plot
        phase_data = go.Scatterpolar(
            r=[state['magnitude'] for state in state_list],
            theta=[state['phase'] * 180 / np.pi for state in state_list],  # Convert to degrees
            mode='markers',
            marker=dict(size=10),
            text=[state['binary'] for state in state_list],
            name='Phase'
        )
        phase_layout = go.Layout(title='State Phases', polar=dict(radialaxis=dict(visible=True, range=[0, 1])))
        phase_plot = go.Figure(data=[phase_data], layout=phase_layout)
        phase_plot_json = json.dumps(phase_plot, cls=plotly.utils.PlotlyJSONEncoder)

        return jsonify({
            'state_vector': state_list,
            'circuit': circuit.to_text_diagram(transpose=True),
            'prob_plot': prob_plot_json,
            'phase_plot': phase_plot_json
        })
    except Exception as e:
        app.logger.error(f"An error occurred: {str(e)}")
        app.logger.error(traceback.format_exc())
        return jsonify({'error': str(e), 'traceback': traceback.format_exc()}), 500




if __name__ == '__main__':
    app.run(debug=True)