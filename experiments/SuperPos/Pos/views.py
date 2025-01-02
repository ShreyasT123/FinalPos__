import json
from pprint import pprint
import numpy as np
import traceback
import cirq
import cirq_web
import plotly
from plotly import graph_objs as go
from django.shortcuts import render
from django.http import JsonResponse
from django.http import JsonResponse, HttpResponseBadRequest
import google.generativeai as genai

# Add your Google Generative AI API Key and Quantum context here
quantum_tool_context = """
Quantum Computing Educational Tool Overview:
- Purpose: The platform is designed to help users learn quantum computing by allowing them to interact with quantum circuits, experiment with quantum operations, and understand real-world applications of quantum principles. It aims to be an accessible educational tool for beginners, as well as a resource for advanced users to explore and simulate quantum concepts.
- Key Features:
  - Quantum Circuit Simulation: Users can build and simulate quantum circuits with various quantum gates and operations.
  - Drag-and-Drop Interface: Enables users to construct quantum circuits without requiring deep programming knowledge.
  - 3D Visualization of Quantum Circuits: Using Cirq Web, users can visualize their quantum circuits in a 3D space, helping them understand the flow and interaction of quantum gates.
  - Documentation on Quantum Gates and Operations: The platform includes detailed descriptions, examples, and corresponding code for quantum gates like X, Y, Z, Hadamard, CNOT, and more. Each gate is explained with its quantum behavior and practical usage.
  - Learning Resources and Tutorials: Educational content such as tutorials, guides, and video lessons on quantum concepts like superposition, entanglement, and quantum teleportation.
  - Community Interaction: A blog for discussing the latest developments in quantum computing, tutorials for specific quantum algorithms, and user-driven content sharing. The platform encourages collaboration among learners and educators.
  - Real-World Applications Simulations: The platform showcases how quantum computing can be applied in real-world scenarios, such as quantum machine learning, quantum cryptography, and simulating chemical reactions for drug discovery.
  - Quantum Algorithm Playground: Users can run quantum algorithms, such as Grover’s and Shor’s algorithms, on simulated quantum circuits.
  - Quantum State Measurement: A feature for users to measure quantum states and visualize the probabilities of outcomes.
  - Multi-Platform Access: The platform is available on both web and mobile devices for users to access their quantum simulations and resources anytime, anywhere.

Technologies and Frameworks:
- Backend: Flask, though there are plans to transition to Django or Node.js for scalability and performance improvements. The backend is responsible for handling user input, simulation requests, and serving educational content.
- Frontend: React is used for building the user interface, ensuring a dynamic and interactive experience. Tailwind CSS is used for styling, while ShadCN UI provides reusable components that improve the UI design.
- Quantum Simulation Framework: Cirq, a Python framework developed by Google for simulating quantum circuits, is used to handle the quantum circuit simulation.
- 3D Visualization Framework: Cirq Web, integrated with the platform, allows users to view their quantum circuits in 3D, providing a more intuitive understanding of quantum operations.
- Graph Plotting: Plotly is used for visualizing the results of quantum simulations, such as probability distributions or quantum state changes, helping users interpret complex outcomes.
- API Integration: Users input quantum circuits through a JSON interface, which the backend processes. The simulation results are returned to the user for visualization and analysis.

Platform Usage:
- User Interaction: Users interact with the platform via a graphical user interface that lets them input quantum circuit descriptions in JSON format or use the drag-and-drop interface. After input, users can visualize their circuits, simulate quantum operations, and receive real-time feedback.
- Learning: The platform provides extensive learning resources, including text-based tutorials, video lessons, and step-by-step guides. Topics cover both basic and advanced quantum concepts such as quantum mechanics, quantum gates, quantum algorithms, and quantum error correction.
- Simulations: Users can create and simulate various quantum circuits. They can explore quantum operations like superposition and entanglement and learn how different gates interact with quantum states.
- Measurements and Outcomes: After running simulations, users can measure quantum states and visualize the possible outcomes of their quantum operations. This helps them grasp the probabilistic nature of quantum systems.
- Educational Community: The blog serves as a platform for users to learn from and share their knowledge about quantum computing. It hosts articles on quantum algorithms, industry trends, and detailed walkthroughs of advanced topics.
- Real-World Applications: The platform enables users to explore real-world use cases of quantum computing, such as:
  - Quantum machine learning algorithms.
  - Applications in quantum cryptography (like quantum key distribution).
  - Drug discovery and molecular simulations using quantum computing.
  - Cybersecurity simulations using quantum encryption algorithms.
- Quantum Algorithm Playground: Users can experiment with popular quantum algorithms, test them on different circuits, and observe how quantum computing could transform industries like finance, healthcare, and AI.

Vision for Future:
- AI Integration: Future AI tools will assist in the learning process by providing personalized guidance based on the user’s progress, answering questions, and suggesting next steps. The AI assistant will also help users troubleshoot quantum circuits, provide explanations for quantum concepts, and suggest tutorials and resources.
- Community Expansion: As the platform grows, the community will play an essential role in providing feedback, contributing to educational content, and engaging with other learners. The platform will expand its resources to include live webinars, expert interviews, and advanced workshops.
- Real-World Collaborations: Future developments may include partnerships with academic institutions and tech companies to bring more advanced quantum computing simulations, real-time collaborations, and research capabilities to the platform.
"""
extra = "based on this answer foloowing question please and avoid using sentences like sure im ready to help and or give closure from your side "
# Initialize the Google Generative AI client
genai.configure(api_key="AIzaSyDnCktO8yyleGmzBYh9MR-WP3llhMp_TRs")
# Define the model
model = genai.GenerativeModel('gemini-1.5-flash')

def chat(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from the request body
            data = json.loads(request.body)
            input_message = data.get('message', '').strip()

            if not input_message:
                return HttpResponseBadRequest("No message provided")

            # Generate a response from the model
            response = model.generate_content(contents=quantum_tool_context + extra + input_message)
            return JsonResponse({"response": response.text})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"Failed to generate a response: {str(e)}"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=400)

def create_circuit_from_json(circuit_json):
    circuit_data = circuit_json
    # pprint(circuit_data)
    layout = circuit_data['circuit']['layout']
    qubits = {name: cirq.LineQubit(index) for index, name in enumerate(layout['qubits'].keys())}
    circuit = cirq.Circuit()

    for operation in circuit_data['circuit']['operations']:
        gate_type = operation['type']
        targets = operation.get('targets', [])
        control = operation.get('control')  # Extract control qubits for controlled gates
        angle = operation.get('angle')  # Angle for CRZ gate

        # Map target and control qubits to cirq qubits
        target_qubits = [qubits.get(target) for target in targets]
        control_qubits = [qubits.get(c) for c in control.split(',')] if control else []  # Handle multiple control qubits

        # Validate qubits
        if None in target_qubits or any(cq is None for cq in control_qubits):
            raise ValueError(f"Invalid target or control qubits in operation {operation}")

        # Gate logic
        if gate_type == 'H':
            for target in target_qubits:
                circuit.append(cirq.H(target))
        elif gate_type == 'MEASURE':
            for target in target_qubits:
                circuit.append(cirq.measure(target, key=str(target)))
        elif gate_type == 'CNOT':
            if len(control_qubits) == 1 and len(target_qubits) == 1:
                circuit.append(cirq.CNOT(control_qubits[0], target_qubits[0]))
            else:
                raise ValueError("CNOT gate requires one control qubit and one target qubit")
        elif gate_type == 'SWAP':
            if len(target_qubits) == 2:
                target1, target2 = target_qubits
                circuit.append(cirq.SWAP(target1, target2))
            else:
                raise ValueError("SWAP gate requires exactly two target qubits")
        elif gate_type == 'X':
            for target in target_qubits:
                circuit.append(cirq.X(target))
        elif gate_type == 'Y':
            for target in target_qubits:
                circuit.append(cirq.Y(target))
        elif gate_type == 'Z':
            for target in target_qubits:
                circuit.append(cirq.Z(target))
        elif gate_type == 'RX' and angle:
            for target in target_qubits:
                circuit.append(cirq.rx(angle).on(target))
        elif gate_type == 'RY' and angle:
            for target in target_qubits:
                circuit.append(cirq.ry(angle).on(target))
        elif gate_type == 'RZ' and angle:
            for target in target_qubits:
                circuit.append(cirq.rz(angle).on(target))
        elif gate_type == 'CRZ':
            if len(control_qubits) == 1 and len(target_qubits) == 1:
                # Use the angle provided in the JSON
                angle = operation.get('angle', 0)  # Default angle to 0 if not provided
                circuit.append(cirq.ControlledGate(cirq.Z)(control_qubits[0], target_qubits[0]))
            else:
                raise ValueError("CRZ gate requires one control qubit and one target qubit")


        elif gate_type == 'CZ':
            if len(control_qubits) == 1 and len(target_qubits) == 1:
                circuit.append(cirq.CZ(control_qubits[0], target_qubits[0]))
            else:
                raise ValueError("CZ gate requires one control qubit and one target qubit")
        elif gate_type == 'CY':
            if len(control_qubits) == 1 and len(target_qubits) == 1:
                # Simulate controlled Y gate (CNOT - Y - CNOT)
                circuit.append(cirq.CNOT(control_qubits[0], target_qubits[0]))
                circuit.append(cirq.Y(target_qubits[0]))
                circuit.append(cirq.CNOT(control_qubits[0], target_qubits[0]))
            else:
                raise ValueError("CY gate requires one control qubit and one target qubit")
       
        elif gate_type == 'CCX':
            if len(control_qubits) == 2 and len(target_qubits) == 1:
                circuit.append(cirq.CCX(control_qubits[0], control_qubits[1], target_qubits[0]))
            else:
                raise ValueError("CCX gate requires two control qubits and one target qubit")
        elif gate_type == 'CRX' and angle:
            if len(control_qubits) == 1 and len(target_qubits) == 1:
                circuit.append(cirq.CRX(angle).on(control_qubits[0], target_qubits[0]))
            else:
                raise ValueError("CRX gate requires one control qubit and one target qubit")
        elif gate_type == 'CRY' and angle:
            if len(control_qubits) == 1 and len(target_qubits) == 1:
                circuit.append(cirq.CRY(angle).on(control_qubits[0], target_qubits[0]))
            else:
                raise ValueError("CRY gate requires one control qubit and one target qubit")
        else:
            raise ValueError(f"Unsupported gate type: {gate_type}")

    circuit.append(cirq.measure(*qubits.values(), key='result'))

    # Generate the 3D visualization
    ckt = cirq_web.Circuit3D(circuit)
    html_file = ckt.generate_html_file(output_directory=r"C:\Users\sstha\Desktop\WEB\FinalPos__\experiments\SuperPos\Pos\templates")

    # Write the updated HTML content
    with open(html_file, "r") as f:
        html = f.readlines()
    with open(r"C:\Users\sstha\Desktop\WEB\FinalPos__\experiments\SuperPos\Pos\templates\Ckt3d.html", 'w+', encoding="utf-8") as f:
        f.write("""
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quantum Circuit Documentation</title>
    <style>
        :root {
            --background: 222.2 84% 4.9%;
            --foreground: 210 40% 98%;
            --card: 222.2 84% 4.9%;
            --card-foreground: 210 40% 98%;
            --popover: 222.2 84% 4.9%;
            --popover-foreground: 210 40% 98%;
            --primary: 217.2 91.2% 59.8%;
            --primary-foreground: 222.2 47.4% 11.2%;
            --secondary: 217.2 32.6% 17.5%;
            --secondary-foreground: 210 40% 98%;
            --muted: 217.2 32.6% 17.5%;
            --muted-foreground: 215 20.2% 65.1%;
            --accent: 217.2 32.6% 17.5%;
            --accent-foreground: 210 40% 98%;
            --destructive: 0 62.8% 30.6%;
            --destructive-foreground: 210 40% 98%;
            --border: 217.2 32.6% 17.5%;
            --input: 217.2 32.6% 17.5%;
            --ring: 224.3 76.3% 48%;
            --radius: 0.5rem;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: hsl(var(--background));
            color: hsl(var(--foreground));
            line-height: 1.5;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 80rem;
            margin: 0 auto;
            padding: 2rem;
        }

        .base {
            display: flex;
            gap: 2rem;
            width: 100%;
            margin-bottom: 2rem;
        }

        .model, .documentation {
            flex: 1;
            background-color: hsl(var(--card));
            border-radius: var(--radius);
            padding: 1.5rem;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }

        h2 {
            color: hsl(var(--primary));
            font-size: 1.5rem;
            margin-top: 0;
            margin-bottom: 1rem;
        }

        .gate-section {
            margin-bottom: 1.5rem;
        }

        h3 {
            color: hsl(var(--primary));
            font-size: 1.25rem;
            margin-top: 0;
            margin-bottom: 0.5rem;
        }

        .description {
            color: hsl(var(--muted-foreground));
            margin-bottom: 0.5rem;
        }

        pre {
            background-color: hsl(var(--secondary));
            color: hsl(var(--secondary-foreground));
            padding: 1rem;
            border-radius: var(--radius);
            overflow-x: auto;
            font-family: monospace;
        }

        @media (max-width: 768px) {
            .base {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="base">
            <div class="model">
<h2>Model Content</h2>
        """)
        for line in html:
            f.write(line)
        f.write("""
<!-- Add your model content here -->
            </div>
            <div class="documentation">
                <h2>Documentation Content</h2>
                
                <div class="gate-section">
                    <h3>Hadamard (H) Gate</h3>
                    <p class="description">The Hadamard gate creates a superposition state from a basis state.</p>
                    <pre>{
    "type": "H",
    "targets": ["q0"]
}</pre>
                </div>

                <div class="gate-section">
                    <h3>Pauli-X (X) Gate</h3>
                    <p class="description">The Pauli-X gate acts as a quantum bit flip, analogous to the NOT gate in classical computing.</p>
                    <pre>{
    "type": "X",
    "targets": ["q1"]
}</pre>
                </div>

                <div class="gate-section">
                    <h3>Pauli-Y (Y) Gate</h3>
                    <p class="description">The Pauli-Y gate is a combination of the X and Z gates, introducing a 90-degree phase shift.</p>
                    <pre>{
    "type": "Y",
    "targets": ["q0"]
}</pre>
                </div>

                <div class="gate-section">
                    <h3>Pauli-Z (Z) Gate</h3>
                    <p class="description">The Pauli-Z gate flips the phase of the qubit if it is in the state |1⟩.</p>
                    <pre>{
    "type": "Z",
    "targets": ["q0"]
}</pre>
                </div>

                <div class="gate-section">
                    <h3>CNOT Gate</h3>
                    <p class="description">The Controlled-NOT (CNOT) gate flips the target qubit if the control qubit is in state 1.</p>
                    <pre>{
    "type": "CNOT",
    "control": "q0",
    "targets": ["q1"]
}</pre>
                </div>

                <div class="gate-section">
                    <h3>SWAP Gate</h3>
                    <p class="description">The SWAP gate exchanges the states of two qubits.</p>
                    <pre>{
    "type": "SWAP",
    "targets": ["q1", "q2"]
}</pre>
                </div>

                <div class="gate-section">
                    <h3>T Gate</h3>
                    <p class="description">The T gate is a phase gate that applies a π/4 phase shift to the qubit.</p>
                    <pre>{
    "type": "T",
    "targets": ["q0"]
}</pre>
                </div>

                <div class="gate-section">
                    <h3>S Gate</h3>
                    <p class="description">The S gate, also called the phase gate, applies a π/2 phase shift to the qubit.</p>
                    <pre>{
    "type": "S",
    "targets": ["q0"]
}</pre>
                </div>

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

                <div class="gate-section">
                    <h3>RX Gate</h3>
                    <p class="description">The RX gate rotates the qubit around the X-axis by the given angle θ.</p>
                    <pre>{
    "type": "RX",
    "targets": ["q0"],
    "theta": 1.57
}</pre>
                </div>

                <div class="gate-section">
                    <h3>RY Gate</h3>
                    <p class="description">The RY gate rotates the qubit around the Y-axis by the given angle θ.</p>
                    <pre>{
    "type": "RY",
    "targets": ["q0"],
    "theta": 1.57
}</pre>
                </div>

                <div class="gate-section">
                    <h3>RZ Gate</h3>
                    <p class="description">The RZ gate rotates the qubit around the Z-axis by the given angle θ.</p>
                    <pre>{
    "type": "RZ",
    "targets": ["q0"],
    "theta": 1.57
}</pre>
                </div>

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
    return simulator.simulate(circuit)


def create_probability_plot(state_list):
    prob_data = go.Bar(
        x=[state['binary'] for state in state_list],
        y=[state['probability'] for state in state_list],
        name='Probability'
    )
    prob_layout = go.Layout(title='State Probabilities', xaxis_title='State', yaxis_title='Probability')
    prob_plot = go.Figure(data=[prob_data], layout=prob_layout)
    return json.dumps(prob_plot, cls=plotly.utils.PlotlyJSONEncoder)


def create_phase_plot(state_list):
    phase_data = go.Scatterpolar(
        r=[state['magnitude'] for state in state_list],
        theta=[state['phase'] * 180 / np.pi for state in state_list],
        mode='markers',
        marker=dict(size=10),
        text=[state['binary'] for state in state_list],
        name='Phase'
    )
    phase_layout = go.Layout(title='State Phases', polar=dict(radialaxis=dict(visible=True, range=[0, 1])))
    phase_plot = go.Figure(data=[phase_data], layout=phase_layout)
    return json.dumps(phase_plot, cls=plotly.utils.PlotlyJSONEncoder)


# Views

def get_3d(request):
    return render(request, 'Ckt3d.html')


def docs(request):
    return render(request, 'documentation.html')


def index(request):
    return render(request, 'welcome.html')


def simulate_custom_circuit(request):
    try:
        circuit_json = json.loads(request.body)

        if 'circuit_data' not in circuit_json:
            raise ValueError("Invalid JSON payload. Missing 'circuit_data' key.")

        circuit_data_str = circuit_json['circuit_data']
        circuit_data = json.loads(circuit_data_str)

        if 'circuit' not in circuit_data:
            raise ValueError("Invalid JSON payload. Missing 'circuit' key.")

        # Create and simulate the circuit
        circuit = create_circuit_from_json(circuit_data)
        result = simulate_circuit(circuit)

        # Extract state vector and generate plots
        state_vector = result.final_state_vector
        num_qubits = int(np.log2(len(state_vector)))

        state_list = [
            {
                'index': i,
                'binary': f'{i:0{num_qubits}b}',
                'magnitude': float(abs(amplitude)),
                'phase': float(np.angle(amplitude)),
                'probability': float(abs(amplitude)**2),
                'real': float(amplitude.real),
                'imag': float(amplitude.imag)
            }
            for i, amplitude in enumerate(state_vector)
        ]

        prob_plot_json = create_probability_plot(state_list)
        phase_plot_json = create_phase_plot(state_list)

        return JsonResponse({
            'state_vector': state_list,
            'circuit': circuit.to_text_diagram(transpose=True),
            'prob_plot': prob_plot_json,
            'phase_plot': phase_plot_json
        })

    except Exception as e:
        print("Error:", str(e))
        return JsonResponse({'error': str(e), 'traceback': traceback.format_exc()}, status=500)
