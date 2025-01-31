import { generateTodaysBookingPDF } from '../../script/creat-pdf';
import './ModalRelatorio.css';
import { X } from '@phosphor-icons/react';

export default function ModalRelatorio({ onClose }) {
    return (
        <>
            <div id="relatorio-modal" className="relatorio-modal">
                <div className="relatorio-modal-content">
                    <div className="btn-content">
                        <div className="close-button" onClick={onClose}>
                            <X size={16} />
                        </div>
                    </div>
                    
                    <div className="modal-warpper">
                        <div className="modal-main">
                            <div className="modal-title">
                                <h2>Relatório de Reservas do Dia</h2>
                                <h3>Gerar arquivo PDF com as reservas realizadas</h3>
                            </div>
                            <p>
                                Neste relatório, você encontrará todas as reservas realizadas por você no dia de hoje.
                                Ao clicar no botão abaixo, será gerado um arquivo PDF contendo os detalhes das reservas, incluindo datas, horários e outras informações relevantes.
                                Este relatório foi criado para facilitar o acompanhamento e a gestão das suas reservas diárias.
                            </p>
                        </div>
                        <button className="btn-modal-relatorio" onClick={generateTodaysBookingPDF}>
                            Gerar Relatório
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
}