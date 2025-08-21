import { Link } from "react-router-dom";

const SignUp = ({ onSignUpSuccess, onLoginClick }) => {
    return (
        <section id="signup-screen" className="screen active phone-mockup">
            <div className="main-content">
                <div className="login-header">
                    <div className="login-logo">
                        <i className="fas fa-user-plus"></i>
                    </div>
                    <h1 className="login-title">Criar Conta</h1>
                    <p className="login-subtitle">Comece a organizar suas compras hoje mesmo</p>
                </div>

                <div className="form-container">
                    <label htmlFor="signup-name" className="form-label">
                        Nome completo
                    </label>
                    <input
                        type="text"
                        id="signup-name"
                        placeholder="Digite seu nome completo"
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
                        placeholder="Digite seu e-mail"
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
                        placeholder="Mínimo 8 caracteres"
                        className="form-input"
                    />
                </div>

                <div className="form-container">
                    <label htmlFor="signup-confirm-password" className="form-label">
                        Confirmar senha
                    </label>
                    <input
                        type="password"
                        id="signup-confirm-password"
                        placeholder="Repita sua senha"
                        className="form-input"
                    />
                </div>

                <div className="form-container">
                    <button
                        id="create-account-button"
                        className="main-button"
                        onClick={onSignUpSuccess}
                    >
                        <i className="fas fa-user-plus"></i>
                        Criar conta
                    </button>
                </div>

                <div className="signup-text">
                    <span className="signup-label">Já tem uma conta?</span>
                    <Link
                        to="/login"
                        id="login-link"
                        className="signup-link"
                    >
                        Fazer login
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

export default SignUp;