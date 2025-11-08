import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "../services/api";

// ✅ Schema de validação com Zod
const verifyCodeSchema = z.object({
  email: z.email("Digite um e-mail válido").nonempty("O e-mail é obrigatório"),
  code: z
    .string()
    .min(6, "O código deve ter 6 dígitos")
    .max(6, "O código deve ter 6 dígitos"),
});

const VerifyCode = () => {
  const navigate = useNavigate();

  // ✅ React Hook Form com Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      email: "",
      code: "",
    },
  });

  // ✅ Quando o formulário for enviado
  const handleVerifyCode = async (data) => {
    try {
      console.log("Verificando código:", data);
      // Aqui você chamaria sua API, exemplo:
      await api.post("/auth/verify-reset-code", data);

      navigate("/reset-password");
    } catch (error) {
      console.error("Erro ao verificar código:", error);
    }
  };

  return (
    <section id="verify-code-screen" className="screen active phone-mockup">
      <div className="main-content">
        <div className="login-header">
          <div className="login-logo">
            <i className="fas fa-shield-alt"></i>
          </div>
          <h1 className="login-title">Verificar Código</h1>
          <p className="login-subtitle">
            Digite o código de 6 dígitos enviado para seu e-mail
          </p>
        </div>

        {/* ✅ Formulário com validação */}
        <form onSubmit={handleSubmit(handleVerifyCode)}>
          <div className="form-container">
            <label htmlFor="verify-email" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              id="verify-email"
              placeholder="Digite seu e-mail"
              className="form-input"
              {...register("email")}
            />
            {errors.email && (
              <span className="error-text">{errors.email.message}</span>
            )}
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
              {...register("code")}
            />
            {errors.code && (
              <span className="error-text">{errors.code.message}</span>
            )}
          </div>

          <div className="form-container">
            <button
              type="submit"
              id="verify-button"
              className="main-button"
              disabled={isSubmitting}
            >
              <i className="fas fa-check-circle"></i>
              {isSubmitting ? "Verificando..." : "Verificar código"}
            </button>
          </div>
        </form>

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
              <span className="feature-text">
                Verifique sua caixa de entrada
              </span>
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
