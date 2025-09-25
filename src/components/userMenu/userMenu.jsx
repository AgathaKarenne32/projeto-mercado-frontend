import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./userMenu.css";

function initialsFromName(name) {
  return (name || "U")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export default function UserMenu({ user, onSignOut }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const initials = useMemo(() => initialsFromName(user?.name), [user?.name]);

  useEffect(() => {
    function onDocClick(e) {
      if (!open) return;
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function toggle(e) {
    e.preventDefault();
    setOpen((v) => !v);
  }

  return (
    <div className="user-menu">
      <button
        ref={btnRef}
        className="usermenu-trigger"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="avatar-sm" aria-hidden>
          {initials}
        </span>
        <span className="user-short">{user?.name?.split(" ")[0]}</span>
        <svg
          className={`chev ${open ? "rot" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            d="M7 10l5 5 5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>

      {open && (
        <div ref={menuRef} className="userdropdown" role="menu">
          <div className="userdropdown-head">
            <span className="avatar-md" aria-hidden>
              {initials}
            </span>
            <div className="ud-ident">
              <strong className="ud-name">{user?.name}</strong>
              <span className="ud-email">{user?.email}</span>
            </div>
          </div>

          <div className="userdropdown-sep" />

          <Link
            to="/perfil"
            className="ud-item"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <span className="fa-solid fa-user" aria-hidden></span>
            <span>Meu Perfil</span>
          </Link>

          <button
            className="ud-item danger"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onSignOut?.();
            }}
          >
            <span className="fas fa-sign-out" aria-hidden></span>
            <span>Sair</span>
          </button>
        </div>
      )}
    </div>
  );
}
