import React, { useEffect, useMemo, useState } from "react";
import { getMe, updateProfile } from "../../services/userService";
import { api } from '../../services/api'
import "./Profile.css";

function initialsFromName(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [pwdErr, setPwdErr] = useState("");
  const [pwdSaving, setPwdSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const me = await getMe();
      setUser(me);
      setForm({ name: me.name, email: me.email });
    })();
  }, []);

  const initials = useMemo(() => initialsFromName(form.name || "U"), [form.name]);

  function validateProfile(f) {
    const e = {};
    if (!f.name?.trim()) e.name = "Informe seu nome completo.";
    if (!f.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "E-mail inválido.";
    return e;
  }

  async function onSaveProfile(e) {
    e.preventDefault();
    const val = validateProfile(form);
    setErrors(val);
    if (Object.keys(val).length > 0) return;

    try {
      setSaving(true);
      const updated = await updateProfile(form);
      setUser(updated);
      setEditing(false);
    } catch (err) {
      alert("Falha ao atualizar perfil. Tente novamente.");
      console.log(err);
    } finally {
      setSaving(false);
    }
  }

  function onCancelEdit() {
    setForm({ name: user.name, email: user.email });
    setErrors({});
    setEditing(false);
  }

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

  if (!user) return <div className="profile-loading">Carregando…</div>;

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
            <strong className="user-name">{user.name}</strong>
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
