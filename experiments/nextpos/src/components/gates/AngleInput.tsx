import React from 'react';

interface AngleInputProps {
  angle: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AngleInput: React.FC<AngleInputProps> = ({ angle, onChange }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-300 mb-2">
      Rotation Angle (radians)
    </label>
    <input
      type="number"
      value={angle}
      onChange={onChange}
      step="0.1"
      className="w-full p-2 border border-cyan-500/20 rounded-lg bg-black/50 text-gray-300"
    />
  </div>
);