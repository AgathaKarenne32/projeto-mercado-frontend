import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate()

    const handleVerifyCode = () => {
        navigate("/verify-code")
    }

    return (
        <section id="forgot-password-screen" className="screen active phone-mockup">
            <div className="main-content">
                <div className="login-header">
                    <div className="login-logo">
                        <i className="fas fa-key"></i>
                    </div>
                    <h1 className="login-title">Recuperar Senha</h1>
                    <p className="login-subtitle">Insira seu e-mail para receber as instruções de redefinição</p>
                </div>

                <div className="form-container">
                    <label htmlFor="forgot-email" className="form-label">
                        E-mail cadastrado
                    </label>
                    <input
                        type="email"
                        id="forgot-email"
                        placeholder="Digite seu e-mail"
                        className="form-input"
                    />
                </div>

                <div className="form-container">
                    <button id="send-code-button" className="main-button" onClick={handleVerifyCode}>
                        <i className="fas fa-paper-plane"></i>
                        Enviar código
                    </button>
                </div>

                <div className="divider">
                    <hr className="divider-line" />
                    <span className="divider-text">ou</span>
                    <hr className="divider-line" />
                </div>

                <div className="form-container">
                    <Link to="/login" className="google-button">
                        <i className="fas fa-arrow-left"></i>
                        Voltar ao login
                    </Link>
                </div>

                <div className="features-list">
                    <ul>
                        <li className="feature-item">
                            <i className="fas fa-info-circle"></i>
                            <span className="feature-text">Você receberá um código por e-mail</span>
                        </li>
                        <li className="feature-item">
                            <i className="fas fa-info-circle"></i>
                            <span className="feature-text">O código é válido por 15 minutos</span>
                        </li>
                        <li className="feature-item">
                            <i className="fas fa-info-circle"></i>
                            <span className="feature-text">Verifique também a caixa de spam</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;