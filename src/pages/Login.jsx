import { Link, NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div id="login-screen" className="screen active phone-mockup">
      <div className="login-header">
        <div className="login-logo">
          <i className="fas fa-file-invoice-dollar"></i>
        </div>
        <h1 className="login-title">Compras Fácil</h1>
        <p className="login-subtitle">Gerencie suas compras e finanças</p>
      </div>

      <div className="form-container">
        <label htmlFor="login-email" className="form-label">
          E-mail
        </label>
        <input
          type="email"
          id="login-email"
          placeholder="joao@email.com"
          className="form-input"
        />
      </div>

      <div className="form-container">
        <label htmlFor="login-password" className="form-label">
          Senha
        </label>
        <input
          type="password"
          id="login-password"
          placeholder="********"
          className="form-input"
        />
      </div>

      <div className="form-container">
        {/* Aqui normalmente seria um botão que envia o login */}
        <NavLink to="/dashboard">
          <button id="login-button" className="main-button">
            Entrar
          </button>
        </NavLink>
      </div>

      <div className="signup-text">
        <span className="signup-label">Ainda não tem conta?</span>
        <Link to="/signup" id="signup-link" className="signup-link">
          Cadastre-se
        </Link>
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

export default Login;
