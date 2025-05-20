// client/src/pages/About.js
import React from 'react';

const About = () => {
  return (
    <div className="fade-in">
      <div className="about-header">
        <div className="container text-center">
          <h1>Sobre Nós</h1>
          <p>Conheça a UNDB e nossa parceria com o Observatório da Mulher</p>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="about-section">
              <h2>Nosso Propósito</h2>
              <p className="lead">Impactar o mundo desenvolvendo pessoas.</p>
              <p>Os valores fundamentais da UNDB incluem ética e integridade, qualidade e excelência, compromisso com a sociedade, valorização das pessoas, atualização contínua e a adoção de práticas inovadoras de aprendizagem.</p>
            </div>

            <div className="row mb-4">
              <div className="col-md-6 mb-4">
                <div className="about-section h-100">
                  <h2>Nossa Visão</h2>
                  <p>Ser uma instituição nacionalmente reconhecida pela sua excelência em todas as suas áreas de atuação.</p>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="about-section h-100">
                  <h2>Nossa Missão</h2>
                  <p>Promover conhecimento ético, científico e tecnológico com metodologias inovadoras, formando profissionais comprometidos com o desenvolvimento e transformação em suas áreas.</p>
                </div>
              </div>
            </div>

            <div className="about-section">
              <h2>Contato</h2>
              <div className="contact-info mt-4">
                <p className="lead mb-4">Estude no 4º melhor Centro Universitário do Brasil.<br/>Os melhores se formam aqui!</p>
                
                <div className="contact-item">
                  <i className="bi bi-geo-alt-fill"></i>
                  <span>Av. Colares Moreira, 443 São Luís, Maranhão.</span>
                </div>
                
                <div className="contact-item">
                  <i className="bi bi-telephone-fill"></i>
                  <span>(98) 4009-7090 | (98) 9 8459-9508</span>
                </div>
                
                <div className="contact-item">
                  <i className="bi bi-envelope-fill"></i>
                  <span>atendimento@undb.edu.br</span>
                </div>
                
                <div className="contact-item">
                  <i className="bi bi-envelope-fill"></i>
                  <span>marketing@undb.edu.br</span>
                </div>
              </div>
            </div>

            <div className="about-section">
              <h2>Observatório da Mulher</h2>
              <p>O Observatório da Mulher é uma iniciativa que busca proporcionar diversos serviços, como assistência médica, odontológica, apoio jurídico e nutricional, por meio de uma colaboração entre o poder público e nossa instituição de ensino.</p>
              <p>Este projeto visa construir um banco de dados abrangente sobre o território e suas habitantes, buscando uma compreensão mais aprofundada das demandas específicas das mulheres em situação de vulnerabilidade.</p>
              <p>Esta plataforma digital foi desenvolvida para auxiliar na coleta e análise de dados, permitindo um planejamento mais eficaz das ações e serviços oferecidos.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;