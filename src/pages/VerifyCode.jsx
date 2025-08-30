import { Link, useNavigate } from "react-router-dom";

const VerifyCode = () => {
    const navigate = useNavigate()

    const handleResetPassword = () => {
        navigate("/reset-password")
    }
    return (
        <section id="verify-code-screen" className="screen active phone-mockup">
            <div className="main-content">
                <div className="login-header">
                    <div className="login-logo">
                        <i className="fas fa-shield-alt"></i>
                    </div>
                    <h1 className="login-title">Verificar Código</h1>
                    <p className="login-subtitle">Digite o código de 6 dígitos enviado para seu e-mail</p>
                </div>

                <div className="form-container">
                    <label htmlFor="verify-code" className="form-label">
                        Código de verificação
                    </label>
                    <input
                        type="text"
                        id="verify-code"
                        placeholder="000000"
                        className="form-input input-code"
                        maxLength="6"

                    />
                </div>

                <div className="form-container">
                    <button id="verify-button" className="main-button" onClick={handleResetPassword}>
                        <i className="fas fa-check-circle"></i>
                        Verificar código
                    </button>
                </div>

                <div className="signup-text">
                    <span className="signup-label">Não recebeu o código?</span>
                    <Link to="#" className="signup-link">
                        Reenviar código
                    </Link>
                </div>

                <div className="divider">
                    <hr className="divider-line" />
                    <span className="divider-text">ou</span>
                    <hr className="divider-line" />
                </div>

                <div className="form-container">
                    <Link to="/forgot-password" className="google-button">
                        <i className="fas fa-arrow-left"></i>
                        Voltar
                    </Link>
                </div>

                <div className="features-list">
                    <ul>
                        <li className="feature-item">
                            <i className="fas fa-clock"></i>
                            <span className="feature-text">Código válido por 15 minutos</span>
                        </li>
                        <li className="feature-item">
                            <i className="fas fa-envelope"></i>
                            <span className="feature-text">Verifique sua caixa de entrada</span>
                        </li>
                        <li className="feature-item">
                            <i className="fas fa-exclamation-triangle"></i>
                            <span className="feature-text">Confira também o spam</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default VerifyCode;