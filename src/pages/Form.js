// client/src/pages/Form.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitForm } from '../services/api';
import { questions } from '../data/questions';

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [isValid, setIsValid] = useState(false);

  // Dividir perguntas em etapas lógicas
  const steps = [
    {
      title: 'Dados Pessoais',
      description: 'Informações básicas sobre você',
      questions: ['bairro']
    },
    {
      title: 'Educação',
      description: 'Questões relacionadas à sua formação educacional',
      questions: [
        'estudando', 'motivo_interrupcao', 'tempo_interrupcao',
        'dificuldades_educacao', 'educacao_distancia', 'qualidade_ead'
      ]
    },
    {
      title: 'Saúde',
      description: 'Informações sobre acesso e qualidade da saúde',
      questions: ['plano_saude', 'acesso_hospital_publico', 'atendimento_adequado', 'regiao_precaria']
    },
    {
      title: 'Experiências com Violência',
      description: 'Questões sobre experiências relacionadas à violência',
      questions: [
        'sofreu_violencia', 'tipo_violencia', 'autor_violencia',
        'frequencia_violencia', 'procurou_ajuda', 'onde_procurou_ajuda',
        'qualidade_atendimento', 'conhece_maria_penha', 'servicos_utilizados'
      ]
    },
    {
      title: 'Impactos da Violência',
      description: 'Como a violência afetou diferentes aspectos da sua vida',
      questions: [
        'impacto_saude_fisica', 'impacto_saude_mental', 'afastamento_trabalho',
        'impacto_educacao', 'forma_impacto_educacao', 'apoio_educacional',
        'origem_apoio', 'educacao_ferramenta', 'mudanca_residencia'
      ]
    },
    {
      title: 'Segurança e Finalização',
      description: 'Últimas questões e comentários',
      questions: ['seguranca_bairro', 'barreiras_denuncia', 'comentario']
    }
  ];

  // Encontre todas as perguntas para o passo atual
  const getCurrentQuestions = () => {
    const stepQuestionIds = steps[currentStep].questions;
    return questions.filter(q => stepQuestionIds.includes(q.id));
  };

  // Verificar se a etapa atual está completa
  useEffect(() => {
    const currentQuestions = getCurrentQuestions();
    
    // Verificar se todas as perguntas obrigatórias desta etapa foram respondidas
    const unansweredRequired = currentQuestions.filter(q => {
      if (!q.required) return false;
      
      // Verificar se a pergunta deve ser mostrada com base nas condições
      if (q.conditional) {
        const { field, value } = q.conditional;
        if (formData[field] !== value) return false;
      }
      
      // Verificar se a pergunta tem resposta
      return !formData[q.id] || (Array.isArray(formData[q.id]) && formData[q.id].length === 0);
    });
    
    setIsValid(unansweredRequired.length === 0);
  }, [formData, currentStep]);

  const handleQuestionChange = (questionId, value, additionalValue) => {
    if (additionalValue) {
      setFormData((prevData) => ({
        ...prevData,
        [questionId]: value,
        [`${questionId}_outro`]: additionalValue
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [questionId]: value
      }));
    }
  };

  const shouldShowQuestion = (question) => {
    if (!question.conditional) return true;
    
    const { field, value } = question.conditional;
    return formData[field] === value;
  };

  const handleNextStep = () => {
    window.scrollTo(0, 0);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    window.scrollTo(0, 0);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificar especificamente se há campos obrigatórios não preenchidos
    const allRequiredAnswered = questions
      .filter(q => q.required)
      .every(q => {
        // Pular verificação se a pergunta tiver condição que não foi atendida
        if (q.conditional) {
          const { field, value } = q.conditional;
          if (formData[field] !== value) return true;
        }
        
        return formData[q.id] && 
               (!Array.isArray(formData[q.id]) || formData[q.id].length > 0);
      });
    
    if (!allRequiredAnswered) {
      setError('Por favor, responda todas as perguntas obrigatórias antes de enviar.');
      window.scrollTo(0, 0);
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError('');
      
      // Console log para debug
      console.log("Enviando dados:", formData);
      
      await submitForm(formData);
      
      setSuccess(true);
      setFormData({});
      
      window.scrollTo(0, 0);
      setTimeout(() => {
        navigate('/');
      }, 3000);
      
    } catch (error) {
      setError('Erro ao enviar o formulário. Por favor, tente novamente.');
      console.error('Erro:', error);
      window.scrollTo(0, 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestion = (question) => {
    const { id, title, type, options } = question;

    if (!shouldShowQuestion(question)) {
      return null;
    }

    switch (type) {
      case 'text':
        return (
          <div className="mb-4 p-3 border rounded shadow-sm question-container" key={id}>
            <h5 className="mb-3">{title} {question.required && <span className="text-danger">*</span>}</h5>
            <input
              type="text"
              className="form-control"
              value={formData[id] || ''}
              onChange={(e) => handleQuestionChange(id, e.target.value)}
            />
          </div>
        );
      
      case 'textarea':
        return (
          <div className="mb-4 p-3 border rounded shadow-sm question-container" key={id}>
            <h5 className="mb-3">{title} {question.required && <span className="text-danger">*</span>}</h5>
            <textarea
              className="form-control"
              rows="3"
              value={formData[id] || ''}
              onChange={(e) => handleQuestionChange(id, e.target.value)}
            ></textarea>
          </div>
        );
      
      case 'radio':
        return (
          <div className="mb-4 p-3 border rounded shadow-sm question-container" key={id}>
            <h5 className="mb-3">{title} {question.required && <span className="text-danger">*</span>}</h5>
            {options.map((option, index) => (
              <div className="form-check mb-2" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={id}
                  id={`${id}-${index}`}
                  value={option}
                  onChange={() => handleQuestionChange(id, option)}
                  checked={formData[id] === option}
                  style={{ marginTop: '0.3rem', width: '1.2em', height: '1.2em' }}
                />
                <label 
                  className="form-check-label" 
                  htmlFor={`${id}-${index}`}
                  style={{ marginLeft: '0.5rem', fontWeight: formData[id] === option ? '500' : '400' }}
                >
                  {option}
                </label>
              </div>
            ))}
            {options.includes('Outro') && formData[id] === 'Outro' && (
              <div className="mt-2 ms-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Especifique"
                  value={formData[`${id}_outro`] || ''}
                  onChange={(e) => handleQuestionChange(id, 'Outro', e.target.value)}
                />
              </div>
            )}
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="mb-4 p-3 border rounded shadow-sm question-container" key={id}>
            <h5 className="mb-3">{title} {question.required && <span className="text-danger">*</span>}</h5>
            {options.map((option, index) => (
              <div className="form-check mb-2" key={index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={id}
                  id={`${id}-${index}`}
                  value={option}
                  onChange={(e) => {
                    const currentSelections = formData[id] || [];
                    if (e.target.checked) {
                      handleQuestionChange(id, [...currentSelections, option]);
                    } else {
                      handleQuestionChange(
                        id,
                        currentSelections.filter(item => item !== option)
                      );
                    }
                  }}
                  checked={(formData[id] || []).includes(option)}
                  style={{ marginTop: '0.3rem', width: '1.2em', height: '1.2em' }}
                />
                <label 
                  className="form-check-label" 
                  htmlFor={`${id}-${index}`}
                  style={{ 
                    marginLeft: '0.5rem', 
                    fontWeight: (formData[id] || []).includes(option) ? '500' : '400' 
                  }}
                >
                  {option}
                </label>
              </div>
            ))}
            {options.includes('Outro') && (formData[id] || []).includes('Outro') && (
              <div className="mt-2 ms-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Especifique"
                  value={formData[`${id}_outro`] || ''}
                  onChange={(e) => {
                    const currentSelections = formData[id] || [];
                    if (!currentSelections.includes('Outro')) {
                      currentSelections.push('Outro');
                    }
                    handleQuestionChange(id, currentSelections, e.target.value);
                  }}
                />
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  // Renderiza indicador de progresso
  const renderProgressBar = () => {
    // Calcula a porcentagem ajustada para que a última etapa não mostre 100% até enviar
    const progressPercentage = currentStep < steps.length - 1 
      ? ((currentStep + 1) / steps.length) * 100
      : ((steps.length - 1) / steps.length) * 100;
      
    return (
      <div className="progress mb-4">
        <div 
          className="progress-bar bg-primary" 
          role="progressbar" 
          style={{ width: `${progressPercentage}%` }}
          aria-valuenow={progressPercentage} 
          aria-valuemin="0" 
          aria-valuemax="100"
        >
          {Math.round(progressPercentage)}%
        </div>
      </div>
    );
  };

  const renderStepNavigation = () => {
    return (
      <ul className="nav nav-pills nav-fill mb-4">
        {steps.map((step, index) => (
          <li className="nav-item" key={index}>
            <button 
              className={`nav-link ${currentStep === index ? 'active' : ''} ${index < currentStep ? 'text-success' : ''}`}
              onClick={() => index <= currentStep ? setCurrentStep(index) : null}
              disabled={index > currentStep}
              type="button"
            >
              {index < currentStep ? <i className="bi bi-check-circle me-1"></i> : `${index + 1}.`} {step.title}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  if (success) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="alert alert-success" role="alert">
              <h4 className="alert-heading">Formulário enviado com sucesso!</h4>
              <p>
                Obrigado por participar da nossa pesquisa. Suas respostas são muito
                importantes para o nosso projeto.
              </p>
              <hr />
              <p className="mb-0">
                Você será redirecionado para a página inicial em alguns segundos.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <h2 className="mb-2" style={{ color: '#6a0dad' }}>Questionário Observatório da Mulher 2025</h2>
                <p className="text-muted">Suas respostas são fundamentais para nossa pesquisa</p>
                <hr className="my-4 mx-auto" style={{ width: '50%', borderColor: '#6a0dad', opacity: '0.5' }} />
              </div>
              
              {error && <div className="alert alert-danger">{error}</div>}
              
              {renderProgressBar()}
              
              <div className="d-none d-md-block">
                {renderStepNavigation()}
              </div>
              
              <div className="card mb-4">
                <div className="card-header">
                  <h4 className="m-0">{steps[currentStep].title}</h4>
                </div>
                <div className="card-body">
                  <p className="text-muted mb-4">{steps[currentStep].description}</p>
                  
                  <form onSubmit={handleSubmit}>
                    {getCurrentQuestions().map(question => renderQuestion(question))}
                    
                    <div className="d-flex justify-content-between mt-4">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={handlePrevStep}
                        disabled={currentStep === 0 || isSubmitting}
                      >
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar
                      </button>
                      
                      {currentStep < steps.length - 1 ? (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleNextStep}
                          disabled={!isValid || isSubmitting}
                        >
                          Próximo
                          <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-success btn-lg"
                          disabled={isSubmitting || !isValid}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" />
                              Enviando...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-check-circle me-2"></i>
                              Finalizar e Enviar
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;