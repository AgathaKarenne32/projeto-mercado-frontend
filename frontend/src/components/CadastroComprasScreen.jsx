import React from "react";

const CadastroComprasScreen = () => {
    return (
        <div id="cadastro-compras-screen" className="screen active">
            <div className="cadastro-header">
                <div className="cadastro-logo">
                    <i className="fas fa-file-invoice"></i>
                </div>
                <h2 className="cadastro-title">Adicionar Nota Fiscal</h2>
                <p className="cadastro-subtitle">
                    Capture ou selecione uma imagem da sua nota fiscal
                </p>
            </div>

            <div className="cadastro-buttons">
                <button className="cadastro-camera-button">
                    <i className="fas fa-camera"></i> Tirar Foto
                </button>
                <button className="cadastro-gallery-button">
                    <i className="fas fa-images"></i> Selecionar da Galeria
                </button>
            </div>

            <div className="cadastro-ocr">
                <label className="cadastro-ocr-label">OCR Automático</label>
                <div className="custom-select-container">
                    <select className="custom-select">
                        <option>Extraímos as informações automaticamente</option>
                    </select>
                    <div className="custom-select-icon">
                        <i className="fas fa-chevron-down"></i>
                    </div>
                </div>
            </div>
            <div className="manual-cadastro-container">
                <button className="manual-cadastro-button">
                    <i className="fas fa-plus"></i> Cadastrar Manualmente
                </button>
            </div>
        </div>
    );
};

export default CadastroComprasScreen;