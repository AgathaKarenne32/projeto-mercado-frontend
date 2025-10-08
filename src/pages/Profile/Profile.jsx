import React, { useMemo, useState } from "react";
import { api } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Profile.module.css";
import { toast } from "react-toastify";

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
  const [pwdSaving, setPwdSaving] = useState(false);

  const initials = useMemo(() => initialsFromName(user?.username || "U"), [user?.username]);

  async function onChangePassword(e) {
    e.preventDefault();

    if (pwd.next.length < 6) {
      toast.error("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (pwd.next !== pwd.confirm) {
      toast.error("As senhas não conferem.");
      return;
    }

    try {
      setPwdSaving(true);
      await api.put("/api/user/change-password", {
        currentPassword: pwd.current,
        newPassword: pwd.next,
        confirmNewPassword: pwd.confirm,
      });
      setPwd({ current: "", next: "", confirm: "" });
      toast.success("Senha alterada com sucesso!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Erro ao alterar senha.");
    } finally {
      setPwdSaving(false);
    }
  }

  return (
    <div className={styles.profileWrapper}>
      <aside className={styles.profileCard}>
        <div className={styles.avatar}>{initials}</div>
        <div className={styles.userInfo}>
          <strong className={styles.userName}>{user?.username}</strong>
          <span className={styles.userEmail}>{user?.email}</span>
        </div>
      </aside>

      <main className={styles.profileMain}>
        <section className={styles.profileHeader}>
          <h1>Perfil do Usuário</h1>
          <p>Gerencie suas informações e altere a senha</p>
        </section>

        <section className={styles.panel}>
          <h2>Alterar Senha</h2>
          <form className={styles.form} onSubmit={onChangePassword}>
            <div className={styles.formField}>
              <label htmlFor="current">Senha Atual</label>
              <input
                id="current"
                type="password"
                value={pwd.current}
                onChange={(e) => setPwd({ ...pwd, current: e.target.value })}
                placeholder="Digite sua senha atual"
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="next">Nova Senha</label>
              <input
                id="next"
                type="password"
                value={pwd.next}
                onChange={(e) => setPwd({ ...pwd, next: e.target.value })}
                placeholder="Nova senha (min. 6 caracteres)"
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="confirm">Confirmar Nova Senha</label>
              <input
                id="confirm"
                type="password"
                value={pwd.confirm}
                onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })}
                placeholder="Confirme a nova senha"
              />
            </div>

            <div className={styles.formActions}>
              <button className={styles.btnGreen} disabled={pwdSaving}>
                {pwdSaving ? "Alterando..." : "Alterar Senha"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
