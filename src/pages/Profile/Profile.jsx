import React, { useMemo, useState } from "react";
import { api } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import "./Profile.css";

function initialsFromName(name) {
  return (name || "U")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export default function Profile() {
  const { authData } = useAuth();
  const user = authData?.user;

  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [pwdErr, setPwdErr] = useState("");
  const [pwdSaving, setPwdSaving] = useState(false);

  const initials = useMemo(() => initialsFromName(user?.username || "U"), [user?.username]);

  if (!user) return <div className="profile-loading">Carregando…</div>;

  async function onChangePassword(e) {
    e.preventDefault();
    setPwdErr("");

    if (pwd.next.length < 6) {
      setPwdErr("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (pwd.next !== pwd.confirm) {
      setPwdErr("As senhas não conferem.");
      return;
    }

    try {
      setPwdSaving(true);
      await api.post("/api/user/change-password", {
        currentPassword: pwd.current,
        newPassword: pwd.next,
        confirmNewPassword: pwd.confirm,
      });
      setPwd({ current: "", next: "", confirm: "" });
      alert("Senha alterada com sucesso!");
    } catch (err) {
      setPwdErr(err.response?.data?.message || "Erro ao alterar senha.");
    } finally {
      setPwdSaving(false);
    }
  }

  return (
    <div className="dash-shell">
      <main className="profile-container">
        <section className="profile-hero">
          <h1>Perfil do Usuário</h1>
          <p>Alterar senha</p>
        </section>

        <section className="profile-card">
          <div className="avatar" aria-hidden>
            {initials}
          </div>
          <div className="user-ident">
            <strong className="user-name">{user.username}</strong>
            <div className="user-email">{user.email}</div>
          </div>
        </section>

        <div className="profile-main">
          <section className="panel">
            <h2>Alterar Senha</h2>
            <form className="form-grid" onSubmit={onChangePassword}>
              <div className="form-field">
                <label htmlFor="current">Senha Atual</label>
                <input
                  id="current"
                  type="password"
                  value={pwd.current}
                  onChange={(e) => setPwd({ ...pwd, current: e.target.value })}
                  placeholder="Digite sua senha atual"
                />
              </div>

              <div className="form-field">
                <label htmlFor="next">Nova Senha</label>
                <input
                  id="next"
                  type="password"
                  value={pwd.next}
                  onChange={(e) => setPwd({ ...pwd, next: e.target.value })}
                  placeholder="Digite a nova senha (min. 6 caracteres)"
                />
              </div>

              <div className="form-field">
                <label htmlFor="confirm">Confirmar nova senha</label>
                <input
                  id="confirm"
                  type="password"
                  value={pwd.confirm}
                  onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })}
                  placeholder="Confirme a nova senha"
                />
              </div>

              {pwdErr && <small className="error">{pwdErr}</small>}

              <div className="form-actions">
                <button className="btn btn-green" disabled={pwdSaving}>
                  {pwdSaving ? "Alterando..." : "Alterar Senha"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
