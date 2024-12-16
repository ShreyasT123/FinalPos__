import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from 'lucide-react'

interface StateVector {
  binary: string
  magnitude: number
  phase: number
  probability: number
}

interface CircuitInfoProps {
  circuitDiagram: string
  stateVector: StateVector[]
  errorMessage?: string
}

const CircuitInfo: React.FC<CircuitInfoProps> = ({ circuitDiagram, stateVector, errorMessage }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Circuit Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Circuit Diagram</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-navy-50 dark:bg-navy-900 p-4 rounded-md overflow-x-auto">
              {circuitDiagram}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>State Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stateVector.map((state, index) => (
                <p key={index} className="text-sm">
                  <span className="font-mono">|{state.binary}⟩:</span>{' '}
                  <span className="text-navy-600 dark:text-navy-300">
                    Magnitude: {state.magnitude.toFixed(4)},
                    Phase: {(state.phase * 180 / Math.PI).toFixed(2)}°,
                    Probability: {state.probability.toFixed(4)}
                  </span>
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {errorMessage && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

export default CircuitInfo

