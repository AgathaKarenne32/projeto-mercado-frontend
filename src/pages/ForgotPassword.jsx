import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

const forgotSchema = z.object({
  email: z
    .email("Digite um e-mail válido")
    .min(3, "O e-mail deve ter pelo menos 3 caracteres"),
});

const verifyCodeSchema = z.object({
  code: z
    .string()
    .min(6, "O código deve ter 6 dígitos")
    .max(6, "O código deve ter 6 dígitos"),
});

const newPasswordSchema = z
  .object({
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string().min(8, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState("");
  const [userCode, setUserCode] = useState("");

  const {
    register: registerForgot,
    handleSubmit: handleSubmitForgot,
    formState: { errors: forgotErrors, isSubmitting: isSubmittingForgot },
  } = useForm({
    resolver: zodResolver(forgotSchema),
  });

  const handleForgotSubmit = async (data) => {
    try {
      await api.post("/auth/forgot-password", { email: data.email });
      setUserEmail(data.email);
      setStep(2);
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
    }
  };

  const {
    register: registerCode,
    handleSubmit: handleSubmitCode,
    formState: { errors: codeErrors, isSubmitting: isSubmittingCode },
  } = useForm({
    resolver: zodResolver(verifyCodeSchema),
  });

  const handleVerifySubmit = async (data) => {
    try {
      await api.post("/auth/verify-reset-code", {
        email: userEmail,
        code: data.code,
      });
      setUserCode(data.code);
      setStep(3);
    } catch (error) {
      console.error("Erro ao verificar código:", error);
    }
  };

  const {
    register: registerNew,
    handleSubmit: handleSubmitNew,
    formState: { errors: newErrors, isSubmitting: isSubmittingNew },
  } = useForm({
    resolver: zodResolver(newPasswordSchema),
  });

  const handleNewPasswordSubmit = async (data) => {
    try {
      await api.post("/auth/reset-password", {
        email: userEmail,
        code: userCode,
        newPassword: data.password,
      });
      navigate("/login");
    } catch (error) {
      console.error("Erro ao salvar nova senha:", error);
    }
  };

  return (
    <section id="password-recovery" className="screen active phone-mockup">
      <div className="main-content">
        {step === 1 && (
          <>
            <div className="login-header">
              <div className="login-logo">
                <i className="fas fa-key"></i>
              </div>
              <h1 className="login-title">Recuperar Senha</h1>
              <p className="login-subtitle">
                Insira seu e-mail para receber o código de verificação
              </p>
            </div>

            <form onSubmit={handleSubmitForgot(handleForgotSubmit)}>
              <div className="form-container">
                <label className="form-label">E-mail cadastrado</label>
                <input
                  type="email"
                  placeholder="Digite seu e-mail"
                  className="form-input"
                  {...registerForgot("email")}
                />
                {forgotErrors.email && (
                  <span className="error-text">
                    {forgotErrors.email.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="main-button"
                disabled={isSubmittingForgot}
              >
                {isSubmittingForgot ? "Enviando..." : "Enviar código"}
              </button>
            </form>

            <div className="form-container">
              <Link to="/login" className="google-button">
                <i className="fas fa-arrow-left"></i> Voltar ao login
              </Link>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="login-header">
              <div className="login-logo">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h1 className="login-title">Verificar Código</h1>
              <p className="login-subtitle">
                Digite o código enviado para <strong>{userEmail}</strong>
              </p>
            </div>

            <form onSubmit={handleSubmitCode(handleVerifySubmit)}>
              <div className="form-container">
                <label className="form-label">Código de verificação</label>
                <input
                  type="text"
                  placeholder="000000"
                  className="form-input input-code"
                  maxLength={6}
                  {...registerCode("code")}
                />
                {codeErrors.code && (
                  <span className="error-text">{codeErrors.code.message}</span>
                )}
              </div>

              <button
                type="submit"
                className="main-button"
                disabled={isSubmittingCode}
              >
                {isSubmittingCode ? "Verificando..." : "Verificar código"}
              </button>
            </form>

            <div className="form-container">
              <button className="google-button" onClick={() => setStep(1)}>
                <i className="fas fa-arrow-left"></i> Voltar
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="login-header">
              <div className="login-logo">
                <i className="fas fa-lock"></i>
              </div>
              <h1 className="login-title">Nova Senha</h1>
              <p className="login-subtitle">
                Crie uma nova senha para <strong>{userEmail}</strong>
              </p>
            </div>

            <form onSubmit={handleSubmitNew(handleNewPasswordSubmit)}>
              <div className="form-container">
                <label className="form-label">Nova senha</label>
                <input
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  className="form-input"
                  {...registerNew("password")}
                />
                {newErrors.password && (
                  <span className="error-text">
                    {newErrors.password.message}
                  </span>
                )}
              </div>

              <div className="form-container">
                <label className="form-label">Confirmar senha</label>
                <input
                  type="password"
                  placeholder="Repita a senha"
                  className="form-input"
                  {...registerNew("confirmPassword")}
                />
                {newErrors.confirmPassword && (
                  <span className="error-text">
                    {newErrors.confirmPassword.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="main-button"
                disabled={isSubmittingNew}
              >
                {isSubmittingNew ? "Salvando..." : "Salvar nova senha"}
              </button>
            </form>

            <div className="form-container">
              <button className="google-button" onClick={() => setStep(2)}>
                <i className="fas fa-arrow-left"></i> Voltar
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;
