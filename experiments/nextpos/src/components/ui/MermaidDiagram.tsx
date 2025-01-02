'use client'

import React, { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

interface MermaidDiagramProps {
  chart: string
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>('')

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      securityLevel: 'loose',
    })
    
    const renderChart = async () => {
      if (ref.current) {
        const { svg } = await mermaid.render('mermaid-svg', chart)
        setSvg(svg)
      }
    }

    renderChart()
  }, [chart])

  return (
    <div ref={ref} className="mermaid-diagram" dangerouslySetInnerHTML={{ __html: svg }} />
  )
}

