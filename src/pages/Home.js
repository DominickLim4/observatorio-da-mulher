// client/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="jumbotron bg-light p-5 rounded shadow-sm">
            <h1 className="display-4">Mulheres na Sociedade Contemporânea</h1>
            <p className="lead">
              Tecnologia no auxílio de mulheres em situação de vulnerabilidade
            </p>
            <hr className="my-4" />
            <p>
              Este projeto visa coletar dados e fornecer apoio a mulheres em situações 
              de vulnerabilidade através de uma plataforma digital interativa.
            </p>
            <p>
              Nossa missão é utilizar a tecnologia como ferramenta de transformação social,
              analisando dados para entender melhor os desafios enfrentados e oferecer
              soluções efetivas baseadas em evidências.
            </p>
            <p className="mb-4">
              Participe do nosso formulário e contribua para esta importante iniciativa!
            </p>
            <Link to="/form" className="btn btn-primary btn-lg">
              Participar da Pesquisa
            </Link>
          </div>

          <div className="row mt-5">
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Objetivo</h5>
                  <p className="card-text">
                    Coletar e analisar dados sobre a situação das mulheres em contextos
                    vulneráveis para direcionar ações de apoio efetivas.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Metodologia</h5>
                  <p className="card-text">
                    Utilizamos formulários estruturados e análise de dados para identificar
                    padrões e necessidades específicas.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Impacto</h5>
                  <p className="card-text">
                    Os resultados serão utilizados para desenvolver programas
                    e políticas que atendam às necessidades reais identificadas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;