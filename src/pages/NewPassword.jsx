import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "../services/api";

// ✅ Schema de validação com Zod
const newPasswordSchema = z
  .object({
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),

    confirmPassword: z.string().min(8, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

const NewPassword = () => {
  const navigate = useNavigate();

  // ✅ React Hook Form + Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // ✅ Envio do formulário
  const handleSavePassword = async (data) => {
    try {
      console.log("Nova senha:", data.password);
      // Aqui você chamaria sua API, exemplo:
      await api.post("/auth/reset-password", { password: data.password });

      navigate("/login");
    } catch (error) {
      console.error("Erro ao salvar nova senha:", error);
    }
  };

  return (
    <section id="new-password-screen" className="screen active phone-mockup">
      <div className="main-content">
        <div className="login-header">
          <div className="login-logo">
            <i className="fas fa-lock"></i>
          </div>
          <h1 className="login-title">Nova Senha</h1>
          <p className="login-subtitle">
            Crie uma senha forte para proteger sua conta
          </p>
        </div>

        {/* ✅ Formulário com validação */}
        <form onSubmit={handleSubmit(handleSavePassword)}>
          <div className="form-container">
            <label htmlFor="new-password" className="form-label">
              Nova senha
            </label>
            <input
              type="password"
              id="new-password"
              placeholder="Mínimo 8 caracteres"
              className="form-input"
              {...register("password")}
            />
            {errors.password && (
              <span className="error-text">{errors.password.message}</span>
            )}
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
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className="error-text">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="form-container">
            <button
              type="submit"
              id="save-password-button"
              className="main-button"
              disabled={isSubmitting}
            >
              <i className="fas fa-save"></i>
              {isSubmitting ? "Salvando..." : "Salvar nova senha"}
            </button>
          </div>
        </form>

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
              <span className="feature-text">
                Combine letras, números e símbolos
              </span>
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
