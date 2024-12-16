import { useEffect, useRef } from 'react'
import * as Plotly from 'plotly.js-dist'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from 'lucide-react'

interface PlotContainerProps {
  probPlotData: Plotly.Data[]
  phasePlotData: Plotly.Data[]
}

const PlotContainer: React.FC<PlotContainerProps> = ({ probPlotData, phasePlotData }) => {
  const probPlotRef = useRef<HTMLDivElement>(null)
  const phasePlotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (probPlotData && probPlotRef.current) {
      Plotly.newPlot(probPlotRef.current, probPlotData)
    }
  }, [probPlotData])

  useEffect(() => {
    if (phasePlotData && phasePlotRef.current) {
      Plotly.newPlot(phasePlotRef.current, phasePlotData)
    }
  }, [phasePlotData])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Circuit Visualization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-navy-600 dark:text-navy-300">
            You can view your circuit in 3D mode:
          </p>
          <Button variant="outline" size="sm" asChild>
            <a href="http://localhost:5000/3dckt" target="_blank" rel="noopener noreferrer">
              Open 3D View
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
        <div ref={probPlotRef} className="w-full h-64 md:h-96" />
        <div ref={phasePlotRef} className="w-full h-64 md:h-96" />
      </CardContent>
    </Card>
  )
}

export default PlotContainer

