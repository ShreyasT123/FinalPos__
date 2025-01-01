import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import Plot from 'react-plotly.js';

const SimulationResults = ({ simResults }) => {
  const [activeTab, setActiveTab] = useState('stateVector');

  if (!simResults) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Awaiting simulation results...</span>
      </div>
    );
  }

  const { state_vector, circuit, prob_plot, phase_plot } = simResults;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 ${
              activeTab === 'stateVector'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('stateVector')}
          >
            State Vector
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === 'circuit'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('circuit')}
          >
            Circuit
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === 'plots'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('plots')}
          >
            Plots
          </button>
        </div>

        <div className="p-4">
          {activeTab === 'stateVector' && (
            <Card>
              <CardHeader>
                <CardTitle>State Vector Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          State
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Probability
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phase
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Magnitude
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {state_vector.map((state) => (
                        <tr key={state.binary}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            |{state.binary}⟩
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {state.probability.toFixed(4)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {state.phase.toFixed(4)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {state.magnitude.toFixed(4)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'circuit' && (
            <Card>
              <CardHeader>
                <CardTitle>Circuit Diagram</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto font-mono">
                  {circuit}
                </pre>
              </CardContent>
            </Card>
          )}

          {activeTab === 'plots' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Probability Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <Plot
                      data={prob_plot.data}
                      layout={{
                        ...prob_plot.layout,
                        autosize: true,
                        margin: { t: 60, r: 40, b: 80, l: 80 }
                      }}
                      useResizeHandler={true}
                      className="w-full h-full"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Phase Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <Plot
                      data={phase_plot.data}
                      layout={{
                        ...phase_plot.layout,
                        autosize: true,
                        margin: { t: 60, r: 40, b: 80, l: 80 }
                      }}
                      useResizeHandler={true}
                      className="w-full h-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimulationResults;