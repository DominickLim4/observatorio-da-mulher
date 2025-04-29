// client/src/pages/Form.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitForm } from '../services/api';

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Perguntas do formulário
  const questions = [
    {
      id: 'bairro',
      title: 'Qual bairro da sua residência?',
      type: 'text',
      required: true
    },
    {
      id: 'estudando',
      title: '1.1 Você está atualmente estudando?',
      type: 'radio',
      options: ['Sim', 'Não'],
      required: true
    },
    {
      id: 'motivo_interrupcao',
      title: '1.2 Se não está estudando, qual motivo de interrupção dos estudos?',
      type: 'checkbox',
      options: [
        'Necessidade de trabalhar',
        'Gravidez/Maternidade',
        'Violência doméstica',
        'Falta de recursos financeiros',
        'Falta de apoio',
        'Outro'
      ],
      conditional: {
        field: 'estudando',
        value: 'Não'
      }
    },
    {
      id: 'tempo_interrupcao',
      title: '1.3 Se você já interrompeu os estudos no passado, foi por quanto tempo?',
      type: 'radio',
      options: [
        'Menos de 1 ano',
        '1 a 3 anos',
        '3 a 5 anos',
        'Mais de 5 anos',
        'Nunca interrompi'
      ]
    },
    {
      id: 'dificuldades_educacao',
      title: '1.4 Quais são as maiores dificuldades que você enfrenta para continuar sua educação?',
      type: 'checkbox',
      options: [
        'Falta de tempo devido ao trabalho',
        'Falta de apoio para cuidar dos filhos',
        'Falta de recursos financeiros',
        'Distância da instituição educacional',
        'Medo ou insegurança',
        'Outro'
      ]
    },
    {
      id: 'educacao_distancia',
      title: '1.5 Você tem acesso a educação a distância?',
      type: 'radio',
      options: ['Sim', 'Não']
    },
    {
      id: 'qualidade_ead',
      title: '1.6 Se sim, como avalia a qualidade da educação a distância que você acessa?',
      type: 'radio',
      options: ['Muito boa', 'Boa', 'Regular', 'Ruim', 'Muito ruim'],
      conditional: {
        field: 'educacao_distancia',
        value: 'Sim'
      }
    },
    {
      id: 'plano_saude',
      title: '2.1 Você tem algum convênio ou plano de saúde?',
      type: 'radio',
      options: ['Sim', 'Não']
    },
    {
      id: 'acesso_hospital_publico',
      title: '2.2 Você já teve acesso a posto/centro de saúde/hospital público?',
      type: 'radio',
      options: ['Sim', 'Não']
    },
    {
      id: 'atendimento_adequado',
      title: '2.3 Você considera adequado o atendimento que recebeu na rede pública de saúde?',
      type: 'radio',
      options: ['Sim', 'Não'],
      conditional: {
        field: 'acesso_hospital_publico',
        value: 'Sim'
      }
    },
    {
      id: 'regiao_precaria',
      title: '2.4 Você considera a região que você mora precária em termos de saúde pública?',
      type: 'radio',
      options: ['Sim', 'Não']
    },
    {
      id: 'sofreu_violencia',
      title: '3.1 Você já sofreu algum tipo de violência?',
      type: 'radio',
      options: ['Sim', 'Não']
    },
    {
      id: 'tipo_violencia',
      title: '3.2 Se sim, qual(is) tipo(s) de violência você já sofreu?',
      type: 'checkbox',
      options: [
        'Violência física (ex: agressão, espancamento)',
        'Violência psicológica/emocional (ex: ameaças, humilhações, isolamento)',
        'Violência sexual (ex: estupro, assédio sexual)',
        'Violência patrimonial (ex: destruição de objetos, retenção de bens)',
        'Violência moral (ex: calúnia, difamação)',
        'Outro'
      ],
      conditional: {
        field: 'sofreu_violencia',
        value: 'Sim'
      }
    },
    {
      id: 'autor_violencia',
      title: '3.3 Quem foi o autor da violência?',
      type: 'checkbox',
      options: [
        'Marido/Companheiro',
        'Ex-marido/Ex-companheiro',
        'Parente',
        'Amigo/Conhecido',
        'Desconhecido',
        'Outro'
      ],
      conditional: {
        field: 'sofreu_violencia',
        value: 'Sim'
      }
    },
    {
      id: 'frequencia_violencia',
      title: '3.4 Com que frequência você sofre ou sofreu violência?',
      type: 'radio',
      options: [
        'Uma única vez',
        'Algumas vezes ao longo do tempo',
        'Regularmente',
        'Atualmente sofre violência',
        'Nunca sofri violência'
      ]
    },
    {
      id: 'procurou_ajuda',
      title: '3.5 Você já procurou ajuda após sofrer violência?',
      type: 'radio',
      options: ['Sim', 'Não', 'Não se aplica'],
      conditional: {
        field: 'sofreu_violencia',
        value: 'Sim'
      }
    },
    {
      id: 'onde_procurou_ajuda',
      title: '3.6 Se sim, onde você procurou ajuda?',
      type: 'checkbox',
      options: [
        'Delegacia da Mulher',
        'Centro de Referência da Mulher',
        'Serviço de Saúde',
        'Apoio Jurídico',
        'Família/Amigos',
        'Outro'
      ],
      conditional: {
        field: 'procurou_ajuda',
        value: 'Sim'
      }
    },
    {
      id: 'qualidade_atendimento',
      title: '3.7 Como você avalia a qualidade do atendimento recebido?',
      type: 'radio',
      options: ['Muito boa', 'Boa', 'Regular', 'Ruim', 'Muito ruim', 'Não se aplica'],
      conditional: {
        field: 'procurou_ajuda',
        value: 'Sim'
      }
    },
    {
      id: 'conhece_maria_penha',
      title: '3.8 Você conhece a Lei Maria da Penha?',
      type: 'radio',
      options: ['Sim', 'Não']
    },
    {
      id: 'servicos_utilizados',
      title: '3.9 Você conhece ou já utilizou algum dos seguintes serviços?',
      type: 'checkbox',
      options: [
        'Disque 180',
        'Casa Abrigo',
        'Medida Protetiva de Urgência',
        'Nenhum',
        'Outro'
      ]
    },
    {
      id: 'impacto_saude_fisica',
      title: '3.10 A violência sofrida impactou sua saúde física?',
      type: 'radio',
      options: ['Sim', 'Não', 'Não se aplica'],
      conditional: {
        field: 'sofreu_violencia',
        value: 'Sim'
      }
    },
    {
      id: 'impacto_saude_mental',
      title: '3.11 A violência sofrida impactou sua saúde mental?',
      type: 'radio',
      options: ['Sim', 'Não', 'Não se aplica'],
      conditional: {
        field: 'sofreu_violencia',
        value: 'Sim'
      }
    },
    {
      id: 'afastamento_trabalho',
      title: '3.12 Você precisou se afastar do trabalho por causa da violência?',
      type: 'radio',
      options: ['Sim', 'Não', 'Não se aplica'],
      conditional: {
        field: 'sofreu_violencia',
        value: 'Sim'
      }
    },
    {
      id: 'impacto_educacao',
      title: '3.13 Você acredita que a violência que sofreu impactou sua educação?',
      type: 'radio',
      options: ['Sim', 'Não', 'Não se aplica'],
      conditional: {
        field: 'sofreu_violencia',
        value: 'Sim'
      }
    },
    {
      id: 'forma_impacto_educacao',
      title: '3.14 Se sim, de que forma a violência impactou sua trajetória educacional?',
      type: 'checkbox',
      options: [
        'Abandono escolar',
        'Dificuldade de concentração nos estudos',
        'Desmotivação para estudar',
        'Mudança frequente de escola',
        'Dificuldade de acesso a recursos educacionais',
        'Outro'
      ],
      conditional: {
        field: 'impacto_educacao',
        value: 'Sim'
      }
    },
    {
      id: 'apoio_educacional',
      title: '3.15 Você recebeu apoio educacional após ter sofrido violência?',
      type: 'radio',
      options: ['Sim', 'Não', 'Não se aplica'],
      conditional: {
        field: 'sofreu_violencia',
        value: 'Sim'
      }
    },
    {
      id: 'origem_apoio',
      title: '3.16 Se sim, de onde veio esse apoio?',
      type: 'checkbox',
      options: [
        'Escola',
        'Programas governamentais',
        'Organizações não-governamentais',
        'Família/Amigos',
        'Outro'
      ],
      conditional: {
        field: 'apoio_educacional',
        value: 'Sim'
      }
    },
    {
      id: 'educacao_ferramenta',
      title: '3.17 Você sente que a educação poderia ser uma ferramenta para superar as consequências da violência?',
      type: 'radio',
      options: ['Sim', 'Não', 'Não se aplica'],
      conditional: {
        field: 'sofreu_violencia',
        value: 'Sim'
      }
    },
    {
      id: 'mudanca_residencia',
      title: '3.18 Você já teve que mudar de residência por causa da violência?',
      type: 'radio',
      options: ['Sim', 'Não', 'Não se aplica'],
      conditional: {
        field: 'sofreu_violencia',
        value: 'Sim'
      }
    },
    {
      id: 'seguranca_bairro',
      title: '3.19 Você se sente segura no seu bairro/comunidade?',
      type: 'radio',
      options: ['Sim', 'Não', 'Às vezes']
    },
    {
      id: 'barreiras_denuncia',
      title: '3.20 Quais são as principais barreiras para denunciar a violência?',
      type: 'checkbox',
      options: [
        'Medo de represálias',
        'Falta de confiança nas autoridades',
        'Dependência financeira',
        'Falta de conhecimento sobre os direitos',
        'Falta de apoio familiar/social',
        'Outro'
      ]
    },
    {
      id: 'comentario',
      title: '4.1 Gostaria de deixar algum comentário ou sugestão sobre o tema?',
      type: 'textarea'
    }
   ];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar campos obrigatórios
    const requiredQuestions = questions.filter(
      q => q.required && shouldShowQuestion(q)
    );
    
    const unansweredQuestions = requiredQuestions.filter(
      q => !formData[q.id] || 
      (Array.isArray(formData[q.id]) && formData[q.id].length === 0)
    );
    
    if (unansweredQuestions.length > 0) {
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
          <div className="mb-4 p-3 border rounded shadow-sm question-container">
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
          <div className="mb-4 p-3 border rounded shadow-sm question-container">
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
          <div className="mb-4 p-3 border rounded shadow-sm question-container">
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
            {options.includes('OUTRO') && formData[id] === 'OUTRO' && (
              <div className="mt-2 ms-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Especifique"
                  value={formData[`${id}_outro`] || ''}
                  onChange={(e) => handleQuestionChange(id, 'OUTRO', e.target.value)}
                />
              </div>
            )}
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="mb-4 p-3 border rounded shadow-sm question-container">
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
            {options.includes('OUTRO') && (formData[id] || []).includes('OUTRO') && (
              <div className="mt-2 ms-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Especifique"
                  value={formData[`${id}_outro`] || ''}
                  onChange={(e) => {
                    const currentSelections = formData[id] || [];
                    if (!currentSelections.includes('OUTRO')) {
                      currentSelections.push('OUTRO');
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

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {success ? (
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
          ) : (
            <div className="card shadow">
              <div className="card-body p-4">
              <div className="text-center mb-5">
                <h2 className="mb-2" style={{ color: '#6a0dad' }}>Questionário Observatório da Mulher 2025</h2>
                <p className="text-muted">Suas respostas são fundamentais para nossa pesquisa</p>
                <hr className="my-4 mx-auto" style={{ width: '50%', borderColor: '#6a0dad', opacity: '0.5' }} />
              </div>
                
                {error && <div className="alert alert-danger">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                  {questions.map((question) => (
                    <div key={question.id}>
                      {renderQuestion(question)}
                    </div>
                  ))}
                  
                    <div className="d-grid gap-2 mt-5">
                    <button
                        type="submit"
                        className="btn btn-primary btn-lg py-3"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Enviando...
                        </>
                        ) : (
                        'Enviar Respostas'
                        )}
                    </button>
                    </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;