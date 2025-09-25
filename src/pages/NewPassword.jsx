import { Link } from "react-router-dom";

const NewPassword = () => {
    return (
        <section id="new-password-screen" className="screen active phone-mockup">
            <div className="main-content">
                <div className="login-header">
                    <div className="login-logo">
                        <i className="fas fa-lock"></i>
                    </div>
                    <h1 className="login-title">Nova Senha</h1>
                    <p className="login-subtitle">Crie uma senha forte para proteger sua conta</p>
                </div>

                <div className="form-container">
                    <label htmlFor="new-password" className="form-label">
                        Nova senha
                    </label>
                    <input
                        type="password"
                        id="new-password"
                        placeholder="Mínimo 8 caracteres"
                        className="form-input"
                    />
                </div>

                <div className="form-container">
                    <label htmlFor="confirm-new-password" className="form-label">
                        Confirmar nova senha
                    </label>
                    <input
                        type="password"
                        id="confirm-new-password"
                        placeholder="Repita a nova senha"
                        className="form-input"
                    />
                </div>

                <div className="form-container">
                    <button id="save-password-button" className="main-button">
                        <i className="fas fa-save"></i>
                        Salvar nova senha
                    </button>
                </div>

                <div className="divider">
                    <hr className="divider-line" />
                    <span className="divider-text">ou</span>
                    <hr className="divider-line" />
                </div>

                <div className="form-container">
                    <Link to="/verify-code" className="google-button">
                        <i className="fas fa-arrow-left"></i>
                        Voltar
                    </Link>
                </div>

                <div className="features-list">
                    <ul>
                        <li className="feature-item">
                            <i className="fas fa-check-circle"></i>
                            <span className="feature-text">Use pelo menos 8 caracteres</span>
                        </li>
                        <li className="feature-item">
                            <i className="fas fa-check-circle"></i>
                            <span className="feature-text">Combine letras, números e símbolos</span>
                        </li>
                        <li className="feature-item">
                            <i className="fas fa-check-circle"></i>
                            <span className="feature-text">Evite senhas muito óbvias</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default NewPassword;