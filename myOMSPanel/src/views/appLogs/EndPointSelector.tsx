import React from 'react';

interface EndpointSelectorProps {
  endpoints: Record<string, string>;
  selectedEndpoint: string;
  onSelect: (endpoint: string) => void;
}

const EndpointSelector: React.FC<EndpointSelectorProps> = ({ endpoints, selectedEndpoint, onSelect }) => {
  return (
    <div>
      <label htmlFor="api-endpoint">Select API Endpoint:</label>
      <select
        id="api-endpoint"
        value={selectedEndpoint}
        onChange={(e) => onSelect(e.target.value)}
      >
        {Object.entries(endpoints).map(([key, value]) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EndpointSelector;