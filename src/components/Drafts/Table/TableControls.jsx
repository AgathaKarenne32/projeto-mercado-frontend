import React from "react";
import styles from "./DraftsTable.module.css";

const TableControls = ({ onCreateDraft, onRefresh, loading, count }) => {
    return (
        <div className={styles.controls}>
            <button className={styles.btnCreate} onClick={onCreateDraft} type="button">
                Criar Rascunho
            </button>
           
            <div className={styles.meta}>{count} rascunho(s) encontrados</div>
        </div>
    );
};

export default TableControls;