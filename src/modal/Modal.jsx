import React from "react";

export default function Modal({ children, onClose }) {
    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: "#fff",
                    borderRadius: 12,
                    padding: "1.5rem",
                    minWidth: 320,
                    maxWidth: 680,
                    width: "90%",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
            >
                {children}
            </div>
        </div>
    );
}
