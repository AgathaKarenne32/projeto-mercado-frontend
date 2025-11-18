import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { api } from "../services/api";
import { toast } from "react-toastify";
import styles from "./Signup.module.css";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const saveUser = async (userData) => {
    try {
      await api.post("/auth/register", userData);
      reset();
      toast.success("Usuário criado com sucesso!");
      navigate("/login");
    } catch (err) {
      toast.error("Erro ao cadastrar usuario");
      console.log("Erro ao cadastrar");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.phoneMockup}>
        <div className={styles.illustrationSide}>
          <i className={`fas fa-user-plus ${styles.illustrationIcon}`}></i>
          <h2 className={styles.illustrationTitle}>
            Junte-se à nossa comunidade
          </h2>
          <p className={styles.illustrationText}>
            Cadastre-se agora e comece a transformar sua forma de controlar
            gastos e compras.
          </p>

          <div className={styles.featuresList}>
            <ul>
              <li className={styles.featureItem}>
                <i className={`fas fa-check-circle ${styles.featureIcon}`}></i>
                <span className={styles.featureText}>
                  Controle seus gastos mensais
                </span>
              </li>
              <li className={styles.featureItem}>
                <i className={`fas fa-check-circle ${styles.featureIcon}`}></i>
                <span className={styles.featureText}>
                  Organize suas compras
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.formSide}>
          <form
            className={styles.mainContent}
            onSubmit={handleSubmit(saveUser)}
          >
            <div className={styles.loginHeader}>
              <div className={styles.loginLogo}>
                <i className={`fas fa-user-plus ${styles.loginLogoIcon}`}></i>
              </div>
              <h1 className={styles.loginTitle}>Criar Conta</h1>
              <p className={styles.loginSubtitle}>
                Comece a organizar suas compras hoje mesmo
              </p>
            </div>

            <div className={styles.formContainer}>
              <label htmlFor="signup-name" className={styles.formLabel}>
                Nome completo
              </label>
              <input
                type="text"
                id="signup-name"
                placeholder="Digite seu nome completo"
                {...register("username", { required: "Nome é obrigatório" })}
                className={styles.formInput}
              />
              {errors.username && (
                <span className={styles.formError}>
                  {errors.username.message}
                </span>
              )}
            </div>

            <div className={styles.formContainer}>
              <label htmlFor="signup-email" className={styles.formLabel}>
                E-mail
              </label>
              <input
                type="email"
                id="signup-email"
                placeholder="Digite seu e-mail"
                className={styles.formInput}
                {...register("email", {
                  required: "E-mail é obrigatório",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email inválido",
                  },
                })}
              />
              {errors.email && (
                <span className={styles.formError}>{errors.email.message}</span>
              )}
            </div>

            <div className={styles.formContainer}>
              <label htmlFor="signup-password" className={styles.formLabel}>
                Senha
              </label>
              <input
                type="password"
                id="signup-password"
                placeholder="Mínimo 8 caracteres"
                className={styles.formInput}
                {...register("password", {
                  required: "Senha obrigatória",
                  minLength: {
                    value: 8,
                    message: "A senha deve ter pelo menos 8 caracteres",
                  },
                })}
              />
              {errors.password && (
                <span className={styles.formError}>
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className={styles.formContainer}>
              <label
                htmlFor="signup-confirm-password"
                className={styles.formLabel}
              >
                Confirmar senha
              </label>
              <input
                type="password"
                id="signup-confirm-password"
                placeholder="Repita sua senha"
                className={styles.formInput}
                {...register("confirmPassword", {
                  required: "Confirmação obrigatória",
                  validate: (value) =>
                    value === password || "As senhas não coincidem",
                })}
              />
              {errors.confirmPassword && (
                <span className={styles.formError}>
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <div className={styles.formContainer}>
              <button
                type="submit"
                id="create-account-button"
                className={`${styles.mainButton} ${
                  isSubmitting ? styles.loading : ""
                }`}
                disabled={isSubmitting}
              >
                <i className="fas fa-user-plus"></i>
                {isSubmitting ? "Criando..." : "Criar conta"}
              </button>
            </div>

            <div className={styles.signupText}>
              <span className={styles.signupLabel}>Já tem uma conta?</span>
              <Link to="/login" id="login-link" className={styles.signupLink}>
                Fazer login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
