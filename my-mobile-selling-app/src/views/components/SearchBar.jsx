import React from 'react';

export default function Search({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search for brand or model"
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        padding: '0.5rem',
        marginBottom: '1rem',
        borderRadius: '8px',
        border: '1px solid #ccc',
      }}
    />
  );
}