import cirq.circuits
import cirq.circuits.circuit
import cirq_web
import cirq

circuit = cirq.Circuit()

qubit1 = cirq.LineQubit(0)
qubit2 = cirq.LineQubit(1)

# Apply Hadamard gate on qubit1
circuit.append(cirq.H(qubit1))

# Apply CNOT gate (control: qubit1, target: qubit2)
circuit.append(cirq.CNOT(qubit1, qubit2))

ckt = cirq_web.Circuit3D(circuit)


a = ckt.generate_html_file()

with open(a, "r") as f:
    html = f.readlines()



with open(r'C:\Users\sstha\Desktop\SuperPos\experiments\posexpr\src\Ckt3d.jsx','w+',encoding="utf-8") as f:
    f.write("""
const Ckt3D = () => {

return(

<div>



""")
    for i in range(len(html)):
        f.write(html[i])
    f.write("""

    
</div>


);


};

export default Ckt3D;
""")