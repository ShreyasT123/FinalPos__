'use client'

import { useState } from 'react'
import CircuitInput from '@/components/ui/circuit-input'
import PlotContainer from '@/components/ui/plot-container'
import CircuitInfo from '@/components/ui/circuit-info'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function QuantumCircuitVisualizer() {
  const [stateVector, setStateVector] = useState([])
  const [circuitDiagram, setCircuitDiagram] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [probPlotData, setProbPlotData] = useState(null)
  const [phasePlotData, setPhasePlotData] = useState(null)

  const simulateCircuit = async (circuitJson: string) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/superpos/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ circuit: circuitJson }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to simulate circuit')
      }

      const data = await response.json()
      setStateVector(data.state_vector)
      setCircuitDiagram(data.circuit)
      setProbPlotData(JSON.parse(data.prob_plot))
      setPhasePlotData(JSON.parse(data.phase_plot))
      setErrorMessage('')
    } catch (error) {
      console.error('Error simulating circuit:', error)
      setErrorMessage(`Error: ${error.message}`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-navy-800 dark:text-navy-100">
            Quantum Circuit Visualizer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-navy-600 dark:text-navy-300 mb-4">
            Enter your quantum circuit JSON in the text area below. Click 'Simulate Circuit' to visualize the results on the 3D sphere and in the plots. The circuit diagram and state information will be displayed here.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <CircuitInput onSimulate={simulateCircuit} />
        <CircuitInfo
          circuitDiagram={circuitDiagram}
          stateVector={stateVector}
          errorMessage={errorMessage}
        />
        <PlotContainer
          probPlotData={probPlotData}
          phasePlotData={phasePlotData}
        />
      </div>
    </div>
  )
}

