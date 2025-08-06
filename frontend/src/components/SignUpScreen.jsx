import React from "react";

const SignUpScreen = ({ onSignUpSuccess, onLoginClick }) => {
  return (
    <div id="signup-screen" className="screen active">
      <div className="login-header">
        <div className="login-logo">
          <i className="fas fa-file-invoice-dollar"></i>
        </div>
        <h1 className="login-title">Criar Conta</h1>
        <p className="login-subtitle">Comece a organizar suas compras hoje</p>
      </div>

      <div className="form-container">
        <label htmlFor="signup-name" className="form-label">
          Nome
        </label>
        <input
          type="text"
          id="signup-name"
          placeholder="João"
          className="form-input"
        />
      </div>

      <div className="form-container">
        <label htmlFor="signup-email" className="form-label">
          E-mail
        </label>
        <input
          type="email"
          id="signup-email"
          placeholder="joao@email.com"
          className="form-input"
        />
      </div>

      <div className="form-container">
        <label htmlFor="signup-password" className="form-label">
          Senha
        </label>
        <input
          type="password"
          id="signup-password"
          placeholder="********"
          className="form-input"
        />
      </div>

      <div className="form-container">
        <label htmlFor="signup-confirm-password" className="form-label">
          Confirmar Senha
        </label>
        <input
          type="password"
          id="signup-confirm-password"
          placeholder="********"
          className="form-input"
        />
      </div>

      <div className="form-container">
        <button
          id="create-account-button"
          className="main-button"
          onClick={onSignUpSuccess}
        >
          Entrar
        </button>
        <div className="signup-text">
          <span className="signup-label">Já tem uma conta?</span>
          <a
            href="#"
            id="login-link"
            className="signup-link"
            onClick={onLoginClick}
          >
            Fazer login
          </a>
        </div>
      </div>

      <div className="features-list">
        <ul>
          <li className="feature-item">
            <i className="fas fa-check-circle"></i>
            <span className="feature-text">Controle seus gastos mensais</span>
          </li>
          <li className="feature-item">
            <i className="fas fa-check-circle"></i>
            <span className="feature-text">Organize suas compras</span>
          </li>
          <li className="feature-item">
            <i className="fas fa-check-circle"></i>
            <span className="feature-text">
              Emita relatórios personalizados
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SignUpScreen;
