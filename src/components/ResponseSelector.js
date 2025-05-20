// client/src/components/ResponseSelector.js
import React from 'react';

const ResponseSelector = ({ responses, selectedId, onChange }) => {
  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <h5 className="card-title">Selecionar Resposta Individual</h5>
        <select 
          className="form-select" 
          value={selectedId || ''}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Selecione uma resposta</option>
          {responses.map((response) => (
            <option key={response.responseId} value={response.responseId}>
              ID: {response.responseId.substring(0, 8)} - {new Date(response.createdAt).toLocaleDateString('pt-BR')}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ResponseSelector;