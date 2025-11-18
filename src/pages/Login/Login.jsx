// Login.jsx
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Login.module.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { login } = useAuth();

  const handleLoginGoogle = () => {
    const redirectUri = "http://localhost:5173/auth/callback";
    const googleUrl = `http://localhost:8080/oauth2/authorize/google?redirect_uri=${encodeURIComponent(
      redirectUri
    )}`;
    window.location.href = googleUrl;
  };

  const handleLogin = async (userData) => {
    try {
      const response = await api.post("/auth/login", userData);
      login(response.data);
      reset();
      toast.success("Usuário logado com sucesso!");
    } catch (err) {
      toast.error("Erro ao logar usuário");
      console.error("Erro ao logar:", err);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.phoneMockup}>
        <div className={styles.illustrationSide}>
          <i className={`fas fa-receipt ${styles.illustrationIcon}`}></i>
          <h2 className={styles.illustrationTitle}>
            Controle suas compras de forma inteligente
          </h2>
          <p className={styles.illustrationText}>
            Organize seus gastos, analise seus hábitos de consumo e tome
            decisões financeiras mais conscientes.
          </p>

          <div className={styles.featuresList}>
            <ul>
              <li className={styles.featureItem}>
                <i className={`fas fa-check-circle ${styles.featureIcon}`}></i>
                <span className={styles.featureText}>
                  Análise detalhada de gastos
                </span>
              </li>

              <li className={styles.featureItem}>
                <i className={`fas fa-check-circle ${styles.featureIcon}`}></i>
                <span className={styles.featureText}>
                  Controle de orçamento
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.formSide}>
          <form
            className={styles.mainContent}
            onSubmit={handleSubmit(handleLogin)}
          >
            <div className={styles.loginHeader}>
              <div className={styles.loginLogo}>
                <i
                  className={`fas fa-file-invoice-dollar ${styles.loginLogoIcon}`}
                ></i>
              </div>
              <h1 className={styles.loginTitle}>Compras Fácil</h1>
              <p className={styles.loginSubtitle}>
                Gerencie suas compras e finanças com facilidade
              </p>
            </div>

            <div className={styles.formContainer}>
              <label htmlFor="login-email" className={styles.formLabel}>
                E-mail
              </label>
              <input
                type="email"
                id="login-email"
                placeholder="Digite seu e-mail"
                {...register("email", {
                  required: "E-mail é obrigatório",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "E-mail inválido",
                  },
                })}
                className={styles.formInput}
              />
              {errors.email && (
                <span className={styles.formError}>{errors.email.message}</span>
              )}
            </div>

            <div className={styles.formContainer}>
              <label htmlFor="login-password" className={styles.formLabel}>
                Senha
              </label>
              <input
                type="password"
                id="login-password"
                placeholder="********"
                {...register("password", { required: "Senha obrigatória" })}
                className={styles.formInput}
              />
              {errors.password && (
                <span className={styles.formError}>
                  {errors.password.message}
                </span>
              )}
              <Link to="/forgot-password" className={styles.formLinkRight}>
                Esqueceu a senha?
              </Link>
            </div>

            <div className={styles.formContainer}>
              <button
                type="submit"
                id="login-button"
                className={`${styles.mainButton} ${
                  isSubmitting ? styles.loading : ""
                }`}
                disabled={isSubmitting}
              >
                <i className="fas fa-sign-in-alt"></i>
                {isSubmitting ? "Entrando..." : "Entrar"}
              </button>
            </div>

            <div className={styles.divider}>
              <div className={styles.dividerLine}></div>
              <span className={styles.dividerText}>ou</span>
              <div className={styles.dividerLine}></div>
            </div>

            <div className={styles.formContainer}>
              <button
                type="button"
                className={styles.googleButton}
                onClick={handleLoginGoogle}
              >
                <i className={`fab fa-google ${styles.googleIcon}`}></i>
                Entrar com Google
              </button>
            </div>

            <div className={styles.signupText}>
              <span className={styles.signupLabel}>Ainda não tem conta?</span>
              <Link to="/signup" id="signup-link" className={styles.signupLink}>
                Cadastre-se
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
