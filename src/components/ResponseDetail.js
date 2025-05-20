// client/src/components/ResponseDetail.js
import React from 'react';

const ResponseDetail = ({ response, questions }) => {
  if (!response) return null;

  return (
    <div className="card shadow">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="m-0">Detalhes da Resposta</h5>
        <div>
          <span className="badge bg-light text-dark me-2">
            ID: {response.responseId}
          </span>
          <span className="badge bg-light text-dark">
            Data: {new Date(response.createdAt).toLocaleDateString('pt-BR')}
          </span>
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Pergunta</th>
                <th>Resposta</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => {
                const answer = response.responses[question.id];
                let displayAnswer = '';
                
                if (Array.isArray(answer)) {
                  displayAnswer = answer.join(', ');
                } else if (answer) {
                  displayAnswer = answer;
                }
                
                return (
                  <tr key={question.id}>
                    <td>{question.title}</td>
                    <td>{displayAnswer || 'Sem resposta'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResponseDetail;