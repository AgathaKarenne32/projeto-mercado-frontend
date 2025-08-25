import { Link } from "react-router-dom";

const Login = () => {
    return (
        <section id="login-screen" className="screen active phone-mockup">
            <div className="main-content">
                <div className="login-header">
                    <div className="login-logo">
                        <i className="fas fa-file-invoice-dollar"></i>
                    </div>
                    <h1 className="login-title">Compras Fácil</h1>
                    <p className="login-subtitle">Gerencie suas compras e finanças com facilidade</p>
                </div>

                <div className="form-container">
                    <label htmlFor="login-email" className="form-label">
                        E-mail
                    </label>
                    <input
                        type="email"
                        id="login-email"
                        placeholder="Digite seu e-mail"
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
                    <Link to="/forgot-password" className="form-link-right">
                        Esqueceu a senha?
                    </Link>
                </div>

                <div className="form-container">
                    <button id="login-button" className="main-button">
                        <i className="fas fa-sign-in-alt"></i>
                        Entrar
                    </button>
                </div>

                <div className="divider">
                    <hr className="divider-line" />
                    <span className="divider-text">ou</span>
                    <hr className="divider-line" />
                </div>

                <div className="form-container">
                    <button className="google-button">
                        <i className="fab fa-google"></i>
                        Entrar com Google
                    </button>
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
                            <span className="feature-text">Organize suas compras automaticamente</span>
                        </li>
                        <li className="feature-item">
                            <i className="fas fa-check-circle"></i>
                            <span className="feature-text">Relatórios detalhados e personalizados</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Login;