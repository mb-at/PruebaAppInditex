import React from 'react';

export default function Search({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Buscar por marca o modelo"
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%',
        padding: '0.5rem',
        marginBottom: '1rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
      }}
    />
  );
}