import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.css";

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

  const getStepIcon = () => {
    switch (step) {
      case 1:
        return "fa-key";
      case 2:
        return "fa-shield-alt";
      case 3:
        return "fa-lock";
      default:
        return "fa-key";
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Recuperar Senha";
      case 2:
        return "Verificar Código";
      case 3:
        return "Nova Senha";
      default:
        return "Recuperar Senha";
    }
  };

  const getStepSubtitle = () => {
    switch (step) {
      case 1:
        return "Insira seu e-mail para receber o código de verificação";
      case 2:
        return `Digite o código enviado para ${userEmail}`;
      case 3:
        return `Crie uma nova senha para ${userEmail}`;
      default:
        return "";
    }
  };

  return (
    <div className={styles.forgotContainer}>
      <div className={styles.phoneMockup}>
        <div className={styles.illustrationSide}>
          <i className={`fas ${getStepIcon()} ${styles.illustrationIcon}`}></i>
          <h2 className={styles.illustrationTitle}>
            Recuperação de Senha Segura
          </h2>
          <p className={styles.illustrationText}>
            Siga os passos para redefinir sua senha de forma segura e rápida.
          </p>

          <div className={styles.featuresList}>
            <ul>
              <li className={styles.featureItem}>
                <i className={`fas fa-check-circle ${styles.featureIcon}`}></i>
                <span className={styles.featureText}>
                  Código de verificação por e-mail
                </span>
              </li>
              <li className={styles.featureItem}>
                <i className={`fas fa-check-circle ${styles.featureIcon}`}></i>
                <span className={styles.featureText}>Processo 100% seguro</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.formSide}>
          <div className={styles.mainContent}>
            <div className={styles.loginHeader}>
              <div className={styles.loginLogo}>
                <i
                  className={`fas ${getStepIcon()} ${styles.loginLogoIcon}`}
                ></i>
              </div>
              <h1 className={styles.loginTitle}>{getStepTitle()}</h1>
              <p className={styles.loginSubtitle}>{getStepSubtitle()}</p>
            </div>

            {step === 1 && (
              <form onSubmit={handleSubmitForgot(handleForgotSubmit)}>
                <div className={styles.formContainer}>
                  <label className={styles.formLabel}>E-mail cadastrado</label>
                  <input
                    type="email"
                    placeholder="Digite seu e-mail"
                    className={styles.formInput}
                    {...registerForgot("email")}
                  />
                  {forgotErrors.email && (
                    <span className={styles.formError}>
                      {forgotErrors.email.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className={`${styles.mainButton} ${
                    isSubmittingForgot ? styles.loading : ""
                  }`}
                  disabled={isSubmittingForgot}
                >
                  <i className="fas fa-paper-plane"></i>
                  {isSubmittingForgot ? "Enviando..." : "Enviar código"}
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmitCode(handleVerifySubmit)}>
                <div className={styles.formContainer}>
                  <label className={styles.formLabel}>
                    Código de verificação
                  </label>
                  <input
                    type="text"
                    placeholder="000000"
                    className={`${styles.formInput} ${styles.inputCode}`}
                    maxLength={6}
                    {...registerCode("code")}
                  />
                  {codeErrors.code && (
                    <span className={styles.formError}>
                      {codeErrors.code.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className={`${styles.mainButton} ${
                    isSubmittingCode ? styles.loading : ""
                  }`}
                  disabled={isSubmittingCode}
                >
                  <i className="fas fa-check-circle"></i>
                  {isSubmittingCode ? "Verificando..." : "Verificar código"}
                </button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmitNew(handleNewPasswordSubmit)}>
                <div className={styles.formContainer}>
                  <label className={styles.formLabel}>Nova senha</label>
                  <input
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    className={styles.formInput}
                    {...registerNew("password")}
                  />
                  {newErrors.password && (
                    <span className={styles.formError}>
                      {newErrors.password.message}
                    </span>
                  )}
                </div>

                <div className={styles.formContainer}>
                  <label className={styles.formLabel}>Confirmar senha</label>
                  <input
                    type="password"
                    placeholder="Repita a senha"
                    className={styles.formInput}
                    {...registerNew("confirmPassword")}
                  />
                  {newErrors.confirmPassword && (
                    <span className={styles.formError}>
                      {newErrors.confirmPassword.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className={`${styles.mainButton} ${
                    isSubmittingNew ? styles.loading : ""
                  }`}
                  disabled={isSubmittingNew}
                >
                  <i className="fas fa-save"></i>
                  {isSubmittingNew ? "Salvando..." : "Salvar nova senha"}
                </button>
              </form>
            )}

            <div className={styles.formContainer}>
              {step === 1 ? (
                <Link to="/login" className={styles.googleButton}>
                  <i className="fas fa-arrow-left"></i> Voltar ao login
                </Link>
              ) : (
                <button
                  className={styles.googleButton}
                  onClick={() => setStep(step - 1)}
                >
                  <i className="fas fa-arrow-left"></i> Voltar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
