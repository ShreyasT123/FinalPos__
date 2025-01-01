from django.shortcuts import render
from django.http import JsonResponse
import cirq
import cirq_web
import plotly
from plotly import graph_objs as go
import numpy as np
import json
import traceback


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

    a = ckt.generate_html_file(output_directory=r"C:\Users\sstha\Desktop\WEB\FinalPos__\experiments\SuperPos\Pos\templates")

    with open(a, "r") as f:
        html = f.readlines()

    with open(r"C:\Users\sstha\Desktop\WEB\FinalPos__\experiments\SuperPos\Pos\templates\Ckt3d.html", 'w+', encoding="utf-8") as f:
        f.write("""
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <!-- Insert your styles here -->
        </head>
        <body>
        <div class="container">
        <div class="base">
        <div class="model">
        <h2>Model Content</h2>
        """)
        for i in range(len(html)):
            f.write(html[i])
        f.write("""
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


def get_3d(request):
    return render(request, 'Ckt3d.html')


def docs(request):
    return render(request, 'documentation.html')


def index(request):
    return render(request, 'welcome.html')


def simulate_custom_circuit(request):
    try:
        circuit_json = json.loads(request.body.decode('utf-8'))['circuit']
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

        prob_data = go.Bar(
            x=[state['binary'] for state in state_list],
            y=[state['probability'] for state in state_list],
            name='Probability'
        )
        prob_layout = go.Layout(title='State Probabilities', xaxis_title='State', yaxis_title='Probability')
        prob_plot = go.Figure(data=[prob_data], layout=prob_layout)
        prob_plot_json = json.dumps(prob_plot, cls=plotly.utils.PlotlyJSONEncoder)

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
        phase_plot_json = json.dumps(phase_plot, cls=plotly.utils.PlotlyJSONEncoder)

        return JsonResponse({
            'state_vector': state_list,
            'circuit': circuit.to_text_diagram(transpose=True),
            'prob_plot': prob_plot_json,
            'phase_plot': phase_plot_json
        })

    except Exception as e:
        return JsonResponse({'error': str(e), 'traceback': traceback.format_exc()}, status=500)
