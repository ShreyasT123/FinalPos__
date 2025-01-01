import os
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from google.generativeai import client
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
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

# Define the FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific origins in production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all HTTP headers
)

model = genai.GenerativeModel('gemini-1.5-flash')
response = model.generate_content("The opposite of hot is")
print(response.text)
# Define a Pydantic model for input validation
class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(request: ChatRequest):
    input_message = request.message

    if not input_message.strip():
        raise HTTPException(status_code=400, detail="No message provided")

    try:
        # Generate a response from the model
        response = model.generate_content(contents=quantum_tool_context+extra+input_message)
        return {"response": response.text}
    except Exception as e:
        print(f"Error generating response: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate a response, please try again later")

# Run the app using a server like Uvicorn (use the command below to start it)
# uvicorn app:app --reload
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)