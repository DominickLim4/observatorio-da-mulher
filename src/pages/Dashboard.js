// client/src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { getForms } from '../services/api';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Importar perguntas do formulário para exibição
import { questions } from '../data/questions'; // Você precisará criar este arquivo

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Componente de seleção de resposta individual
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
            <option key={response._id} value={response._id}>
              ID: {response._id.substring(0, 8)} - {new Date(response.createdAt).toLocaleDateString('pt-BR')}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// Componente de visualização detalhada de resposta
const ResponseDetail = ({ response, questions }) => {
  if (!response) return (
    <div className="card shadow">
      <div className="card-body text-center py-5">
        <p className="text-muted">Selecione uma resposta para visualizar os detalhes</p>
      </div>
    </div>
  );

  return (
    <div className="card shadow">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="m-0">Detalhes da Resposta</h5>
        <div>
          <span className="badge bg-light text-dark me-2">
            ID: {response._id}
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

const Dashboard = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('educacao');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedResponseId, setSelectedResponseId] = useState(null);
  const [viewMode, setViewMode] = useState('charts'); // 'charts' ou 'individual'

  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getForms();
      setFormData(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleClearData = async () => {
    try {
      setLoading(true);
      // Chamar API para limpar dados
      await fetch('http://localhost:5000/api/forms', { 
        method: 'DELETE'
      });
      setFormData([]);
      setShowConfirmDialog(false);
      setError(null);
      setSelectedResponseId(null);
    } catch (err) {
      setError('Erro ao limpar dados');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Função para processar dados e gerar estatísticas
  const processData = (field) => {
    if (formData.length === 0) return { labels: [], datasets: [] };

    // Contagem de frequência para cada resposta
    const frequencyCount = {};
    
    formData.forEach((form) => {
      const value = form.responses[field];
      
      if (Array.isArray(value)) {
        // Para checkbox (múltiplas opções)
        value.forEach((option) => {
          frequencyCount[option] = (frequencyCount[option] || 0) + 1;
        });
      } else if (value) {
        // Para radio e select (única opção)
        frequencyCount[value] = (frequencyCount[value] || 0) + 1;
      }
    });

    // Converter para formato de gráfico
    const labels = Object.keys(frequencyCount);
    const data = Object.values(frequencyCount);

    return {
      labels,
      datasets: [
        {
          label: 'Número de Respostas',
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(199, 199, 199, 0.6)',
            'rgba(83, 102, 255, 0.6)',
            'rgba(40, 159, 64, 0.6)',
            'rgba(210, 199, 199, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(199, 199, 199, 1)',
            'rgba(83, 102, 255, 1)',
            'rgba(40, 159, 64, 1)',
            'rgba(210, 199, 199, 1)'
          ],
          borderWidth: 1
        }
      ]
    };
  };

  // Obter a resposta selecionada
  const selectedResponse = formData.find(form => form._id === selectedResponseId);

  // Opções comuns para gráficos
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        font: {
          size: 16
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-3">Carregando dados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div>
          <h2 style={{ color: '#6a0dad' }}>Dashboard de Resultados</h2>
          <p className="text-muted">Visualização dos dados coletados</p>
        </div>
        <button 
          className="btn btn-danger d-flex align-items-center" 
          onClick={() => setShowConfirmDialog(true)}
          disabled={loading || formData.length === 0}
        >
          <i className="bi bi-trash me-2"></i>
          <span>Limpar Todos os Dados</span>
        </button>
      </div>
      
      {/* Dialog de confirmação */}
      {showConfirmDialog && (
        <div className="alert alert-danger mb-4">
          <h4 className="alert-heading">Atenção!</h4>
          <p>Você está prestes a excluir TODOS os dados do formulário. Esta ação não pode ser desfeita.</p>
          <p>Tem certeza que deseja continuar?</p>
          <div className="d-flex gap-2">
            <button 
              className="btn btn-danger" 
              onClick={handleClearData}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Processando...
                </>
              ) : 'Sim, excluir todos os dados'}
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => setShowConfirmDialog(false)}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      
      {error && <div className="alert alert-danger mb-4">{error}</div>}
      
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card shadow h-100">
            <div className="card-body chart-container">
              <h5 className="card-title">Total de Respostas</h5>
              <h2 className="display-4 text-center mt-4">{formData.length}</h2>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card shadow h-100">
            <div className="card-body chart-container">
              <h5 className="card-title">Data da Última Resposta</h5>
              <h4 className="text-center mt-4">
                {formData.length > 0
                  ? new Date(formData[0].createdAt).toLocaleDateString('pt-BR')
                  : 'Sem dados'}
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Botões de alternância entre modos de visualização */}
      <div className="btn-group mb-4" role="group">
        <button 
          className={`btn ${viewMode === 'charts' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setViewMode('charts')}
        >
          <i className="bi bi-bar-chart-fill me-2"></i>
          Gráficos
        </button>
        <button 
          className={`btn ${viewMode === 'individual' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setViewMode('individual')}
        >
          <i className="bi bi-person-fill me-2"></i>
          Respostas Individuais
        </button>
      </div>

      {viewMode === 'individual' ? (
        <div className="row">
          <div className="col-md-4">
            <ResponseSelector 
              responses={formData} 
              selectedId={selectedResponseId}
              onChange={setSelectedResponseId}
            />
          </div>
          <div className="col-md-8">
            <ResponseDetail 
              response={selectedResponse} 
              questions={questions}
            />
          </div>
        </div>
      ) : (
        <>
          <ul className="nav nav-tabs mb-4 fade-in">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'educacao' ? 'active' : ''}`}
                onClick={() => setActiveTab('educacao')}
              >
                Educação
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'saude' ? 'active' : ''}`}
                onClick={() => setActiveTab('saude')}
              >
                Saúde
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'violencia' ? 'active' : ''}`}
                onClick={() => setActiveTab('violencia')}
              >
                Violência
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'geografia' ? 'active' : ''}`}
                onClick={() => setActiveTab('geografia')}
              >
                Geografia
              </button>
            </li>
          </ul>

          {activeTab === 'educacao' && (
            <div>
              <div className="row mb-4">
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body chart-container">
                      <h5 className="card-title mb-4">Está estudando atualmente</h5>
                      <Pie
                        data={processData('estudando')}
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Distribuição por status educacional'
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body chart-container">
                      <h5 className="card-title mb-4">Motivos de interrupção dos estudos</h5>
                      <Bar
                        data={processData('motivo_interrupcao')}
                        options={{
                          ...chartOptions,
                          indexAxis: 'y',
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Motivos de interrupção'
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body chart-container">
                      <h5 className="card-title mb-4">Tempo de interrupção dos estudos</h5>
                      <Doughnut
                        data={processData('tempo_interrupcao')}
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Distribuição por tempo de interrupção'
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body chart-container">
                      <h5 className="card-title mb-4">Dificuldades na educação</h5>
                      <Bar
                        data={processData('dificuldades_educacao')}
                        options={{
                          ...chartOptions,
                          indexAxis: 'y',
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Principais dificuldades educacionais'
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body chart-container">
                      <h5 className="card-title mb-4">Acesso à educação a distância</h5>
                      <Pie
                        data={processData('educacao_distancia')}
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Acesso à educação a distância'
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body chart-container">
                      <h5 className="card-title mb-4">Qualidade da educação a distância</h5>
                      <Bar
                        data={processData('qualidade_ead')}
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Avaliação da qualidade da EAD'
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'saude' && (
            <div>
              <div className="row mb-4">
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body chart-container">
                      <h5 className="card-title mb-4">Possui plano de saúde</h5>
                      <Pie
                        data={processData('plano_saude')}
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Distribuição por acesso a plano de saúde'
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body chart-container">
                      <h5 className="card-title mb-4">Acesso a hospital público</h5>
                      <Pie
                        data={processData('acesso_hospital_publico')}
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Acesso a serviços públicos de saúde'
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body chart-container">
                      <h5 className="card-title mb-4">Adequação do atendimento público</h5>
                      <Pie
                        data={processData('atendimento_adequado')}
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Avaliação do atendimento na rede pública'
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body chart-container">
                      <h5 className="card-title mb-4">Região precária em saúde</h5>
                      <Pie
                        data={processData('regiao_precaria')}
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Avaliação da região em termos de saúde'
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'violencia' && (
            <div>
              <div className="row mb-4">
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body chart-container">
                      <h5 className="card-title mb-4">Já sofreu violência</h5>
                      <Pie
                        data={processData('sofreu_violencia')}
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Ocorrência de violência'
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body chart-container">
                      <h5 className="card-title mb-4">Tipos de violência</h5>
                      <Bar
                        data={processData('tipo_violencia')}
                        options={{
                          ...chartOptions,
                          indexAxis: 'y',
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Distribuição por tipos de violência'
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body chart-container">
                      <h5 className="card-title mb-4">Autores da violência</h5>
                      <Bar
                        data={processData('autor_violencia')}
                        options={{
                          ...chartOptions,
                          indexAxis: 'y',
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Autores da violência'
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body chart-container">
                      <h5 className="card-title mb-4">Frequência da violência</h5>
                      <Doughnut
                        data={processData('frequencia_violencia')}
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Frequência da violência'
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body chart-container">
                      <h5 className="card-title mb-4">Conhecimento da Lei Maria da Penha</h5>
                      <Pie
                        data={processData('conhece_maria_penha')}
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Conhecimento da Lei Maria da Penha'
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body chart-container">
                      <h5 className="card-title mb-4">Impacto na educação</h5>
                      <Pie
                        data={processData('impacto_educacao')}
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Impacto da violência na educação'
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body chart-container">
                      <h5 className="card-title mb-4">Barreiras para denúncia</h5>
                      <Bar
                        data={processData('barreiras_denuncia')}
                        options={{
                          ...chartOptions,
                          indexAxis: 'y',
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Principais barreiras para denúncia'
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body chart-container">
                      <h5 className="card-title mb-4">Serviços conhecidos/utilizados</h5>
                      <Bar
                        data={processData('servicos_utilizados')}
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Serviços de apoio conhecidos ou utilizados'
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'geografia' && (
            <div>
              <div className="row mb-4">
                <div className="col-md-12 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body chart-container">
                      <h5 className="card-title mb-4">Distribuição por bairro</h5>
                      <Bar
                        data={processData('bairro')}
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Distribuição geográfica por bairro'
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body chart-container">
                      <h5 className="card-title mb-4">Segurança no bairro</h5>
                      <Pie
                        data={processData('seguranca_bairro')}
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Percepção de segurança no bairro'
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body chart-container">
                      <h5 className="card-title mb-4">Mudança de residência devido à violência</h5>
                      <Pie
                        data={processData('mudanca_residencia')}
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            title: {
                              ...chartOptions.plugins.title,
                              text: 'Mudança de residência por violência'
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;