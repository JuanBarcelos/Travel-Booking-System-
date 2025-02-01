import './ModalBooking.css';
import { X } from '@phosphor-icons/react';
import { formatDate } from '../../script/server-booking';

export default function ModalBooking({ booking, onClose }) {
    const dataServico = formatDate(booking.dataServico);
    return (
        <>
            <div id="modal" className="modal">
                <div className="modal-content">
                    <div className="btn-content">
                        <div className="close-button" onClick={onClose}>
                            <X size={16} />
                        </div>
                    </div>
                    <div className="detales-warpper">
                        <div className="detales-title">
                            <h2>Detalhes da Reserva</h2>
                            <h3>Visualize e gerencie sua reserva</h3>
                        </div>
                        <div className="detales-container">
                            <div className="detale-content">
                                <p className="title">Ordem de Serviço / Service Order:</p>
                                <p className="conteudo">{booking.id}</p>
                            </div>

                            <div className="detale-content">
                                <p className="title">Nome do Solicitante / Requester Name:</p>
                                <p className="conteudo">{booking.solicitante}</p>
                            </div>
                            <div className="detale-content">
                                <p className="title">Nome do Cliente / Client Name:</p>
                                <p className="conteudo">{booking.cliente}</p>
                            </div>
                            <div className="detale-content">
                                <p className="title">Contato do Cliente / Client Contact:</p>
                                <p className="conteudo">{booking.contato}</p>
                            </div>
                            <div className="detale-content">
                                <p className="title">Data do Serviço / Service Date:</p>
                                <p className="conteudo">{dataServico}</p>
                            </div>
                            <div className="detale-content">
                                <p className="title">Hora do Serviço / Service Time:</p>
                                <p className="conteudo">{booking.horaServico}</p>
                            </div>
                            <div className="detale-content">
                                <p className="title">Número do Voo / Flight Number:</p>
                                <p className="conteudo">{booking.voo}</p>
                            </div>
                            <div className="detale-content">
                                <p className="title">Local de Embarque / Pickup Location:</p>
                                <p className="conteudo">{booking.pickup}</p>
                            </div>
                            <div className="detale-content">
                                <p className="title">Local de Desembarque / Dropoff Location:</p>
                                <p className="conteudo">{booking.dropoff}</p>
                            </div>
                            <div className="detale-content">
                                <p className="title">Número de Passageiros / Number of Passengers:</p>
                                <p className="conteudo">{booking.pax}</p>
                            </div>
                            <div className="detale-content">
                                <p className="title">Tipo de Serviço / Service Type:</p>
                                <p className="conteudo">{booking.servico}</p>
                            </div>
                            <div className="detale-content">
                                <p className="title">Tipo de Veículo / Vehicle Type:</p>
                                <p className="conteudo">{booking.veiculo}</p>
                            </div>
                            <div className="detale-content">
                                <p className="title">Preferência de Motorista / Driver Preference:</p>
                                <p className="conteudo">{booking.driver}</p>
                            </div>
                            <div className="detale-content-observations">
                                <p className="title">Observações / Observations:</p>
                                <p className="conteudo">{booking.observation}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}