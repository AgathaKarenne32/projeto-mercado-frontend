import React, { useEffect, useMemo, useState } from "react";
import {
  getMe,
  updateProfile,
  changePassword,
} from "../../services/userService";
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

  // form de dados pessoais
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({}); // { name: "msg", email: "msg" }

  // form de senha
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [pwdErr, setPwdErr] = useState("");
  const [pwdSaving, setPwdSaving] = useState(false);

  // carrega usuário
  useEffect(() => {
    (async () => {
      const me = await getMe();
      setUser(me);
      setForm({ name: me.name, email: me.email });
    })();
  }, []);

  const initials = useMemo(
    () => initialsFromName(form.name || "U"),
    [form.name],
  );

  // validações simples (sem libs)
  function validateProfile(f) {
    const e = {};
    if (!f.name?.trim()) e.name = "Informe seu nome completo.";
    if (!f.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = "E-mail inválido.";
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
    // volta o formulário para os dados do usuário carregado
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
      await changePassword({ current: pwd.current, next: pwd.next });
      setPwd({ current: "", next: "", confirm: "" });
      alert("Senha alterada com sucesso!");
    } catch (err) {
      setPwdErr(err.message || "Erro ao alterar senha.");
    } finally {
      setPwdSaving(false);
    }
  }

  if (!user) return <div className="profile-loading">Carregando…</div>;

  return (
    <div className="dash-shell">
      {/* o Header já vem do seu Layout (Outlet). Só conteúdo daqui pra baixo */}
      <main className="profile-container">
        {/* HERO */}
        <section className="profile-hero">
          <h1>Perfil do Usuário</h1>
          <p>Altere sua senha</p>
        </section>

        {/* CARD DO USUÁRIO */}
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
