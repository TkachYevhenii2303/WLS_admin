import React from 'react';

interface ColorControlProps {
  label: string;
  value: string;
  defaultValue?: string;
  onChange: (value: string) => void;
}

export const ColorControl: React.FC<ColorControlProps> = React.memo(({
  label,
  value,
  defaultValue = '#000000',
  onChange,
}) => {
  return (
    <div className="color-group">
      <label>{label}:</label>
      <div className="color-input-group">
        <input
          type="color"
          value={value || defaultValue}
          onChange={(e) => onChange(e.target.value)}
          className="color-picker"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={defaultValue}
          className="color-text"
        />
      </div>
    </div>
  );
});

ColorControl.displayName = 'ColorControl';