import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { api } from '../services/api';
import { toast } from 'react-toastify'

const SignUp = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm();

    const password = watch("password");

    const saveUser = async (userData) => {
        try {
            await api.post("/auth/register", userData);
            reset();
            toast.success("Usuário criado com sucesso!")
        } catch (err) {
            toast.error("Erro ao cadastrar usuario")
            console.log("Erro ao cadastrar")
        }

    };

    const onSubmit = (data) => {
        const { confirmPassword, ...userData } = data;
        saveUser(userData);
    };

    return (
        <section id="signup-screen" className="screen active phone-mockup">
            <form className="main-content" onSubmit={handleSubmit(onSubmit)}>
                <div className="login-header">
                    <div className="login-logo">
                        <i className="fas fa-user-plus"></i>
                    </div>
                    <h1 className="login-title">Criar Conta</h1>
                    <p className="login-subtitle">Comece a organizar suas compras hoje mesmo</p>
                </div>

                <div className="form-container">
                    <label htmlFor="signup-name" className="form-label">Nome completo</label>
                    <input
                        type="text"
                        id="signup-name"
                        placeholder="Digite seu nome completo"
                        {...register("username", { required: "Nome é obrigatório" })}
                        className="form-input"
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>

                <div className="form-container">
                    <label htmlFor="signup-email" className="form-label">E-mail</label>
                    <input
                        type="email"
                        id="signup-email"
                        placeholder="Digite seu e-mail"
                        className="form-input"
                        {...register("email", {
                            required: "Email é obrigatório",
                            pattern: {
                                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                message: "Email inválido"
                            }
                        })}
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>

                <div className="form-container">
                    <label htmlFor="signup-password" className="form-label">Senha</label>
                    <input
                        type="password"
                        id="signup-password"
                        placeholder="Mínimo 8 caracteres"
                        className="form-input"
                        {...register("password", { required: "Senha obrigatória" })}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>

                <div className="form-container">
                    <label htmlFor="signup-confirm-password" className="form-label">Confirmar senha</label>
                    <input
                        type="password"
                        id="signup-confirm-password"
                        placeholder="Repita sua senha"
                        className="form-input"
                        {...register("confirmPassword", {
                            required: "Confirmação obrigatória",
                            validate: value => value === password || "As senhas não coincidem"
                        })}
                    />
                    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                </div>

                <div className="form-container">
                    <button type="submit" id="create-account-button" className="main-button">
                        <i className="fas fa-user-plus"></i>
                        Criar conta
                    </button>
                </div>

                <div className="signup-text">
                    <span className="signup-label">Já tem uma conta?</span>
                    <Link to="/login" id="login-link" className="signup-link">Fazer login</Link>
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
            </form>
        </section>
    );
};

export default SignUp;
