import './Booking.css';
import Menu from "../../components/menu/Menu";
import { Plus } from '@phosphor-icons/react';
import { useState } from 'react';
import { createBooking, updateBooking } from '../../script/server-booking';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';


export default function Booking() {
    const location = useLocation();
    // Obtém os dados da reserva se houver
    const existingBooking = location.state?.booking || null;

    const [formData, setFormData] = useState({
        solicitante: "",
        cliente: "",
        contato: "",
        dataServico: "",
        horaServico: "",
        voo: "",
        pax: "",
        servico: "",
        driver: "",
        veiculo: "",
        pickup: "",
        dropoff: "",
        observation: "",
    });

    useEffect(() => {
        if (existingBooking) {
            setFormData(existingBooking)
        }
    }, [existingBooking]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (existingBooking) {
            const response = await updateBooking(existingBooking.id, formData);
            if (response.success) {
                toast.success(response.message);
                setFormData({ // Limpa o formulário
                    solicitante: "",
                    cliente: "",
                    contato: "",
                    dataServico: "",
                    horaServico: "",
                    voo: "",
                    pax: "",
                    servico: "",
                    driver: "",
                    veiculo: "",
                    pickup: "",
                    dropoff: "",
                    observation: "",
                });
            } else {
                toast.error(response.message);
            }
        } else {
            const response = await createBooking(formData);

            if (response.success) {
                toast.success(response.message);
                setFormData({ // Limpa o formulário
                    solicitante: "",
                    cliente: "",
                    contato: "",
                    dataServico: "",
                    horaServico: "",
                    voo: "",
                    pax: "",
                    servico: "",
                    driver: "",
                    veiculo: "",
                    pickup: "",
                    dropoff: "",
                    observation: "",
                });
            } else {
                toast.error(response.message);
            }
        }
    };

    return (
        <>
            <div className="conatiner">
                <Menu />
                <section id="form-section" className="section">
                    <h2 id="form-title" className="title">Agendamento Brummie</h2>
                    <form id="booking-form" className="form">
                        <div className="form-inputs-container">
                            <div className="input-group">
                                <label htmlFor="solicitante">Nome do Solicitante / Requester Name</label>
                                <input required id="solicitante" name="solicitante" type="text" placeholder="Digite seu Usuário" value={formData.solicitante} onChange={handleChange} />
                            </div>
                            <div className="form-inputs-content">
                                <div className="input-group">
                                    <label htmlFor="cliente">Nome do Cliente / Client Name</label>
                                    <input required id="cliente" name="cliente" type="text" placeholder="Digite seu Cliente" value={formData.cliente} onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="contato">Contato do Cliente / Client Contact</label>
                                    <input id="contato" name="contato" type="text" placeholder="Digite o contato do cliente" value={formData.contato} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-inputs-content">
                                <div className="input-group">
                                    <label htmlFor="dataServico">Data do Serviço / Service Date</label>
                                    <input required id="data-serviço" name="dataServico" type="date" value={formData.dataServico} onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="horaServico">Hora do Serviço / Service Time</label>
                                    <input required id="horaServico" name="horaServico" type="time" value={formData.horaServico} onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="voo">Número do Voo / Flight Number</label>
                                    <input id="voo" name="voo" type="text" placeholder="Digite o número do voo" value={formData.voo} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-inputs-content">
                                <div className="input-group">
                                    <label htmlFor="pax">Número de Passageiros / Number of Passengers</label>
                                    <input id="pax" name="pax" type="text" placeholder="Digite o número de passageiros" value={formData.pax} onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="servico">Tipo de Serviço / Service Type</label>
                                    <input required id="servico" name="servico" type="text" placeholder="Digite o tipo de serviço" value={formData.servico} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="input-group">
                                <label htmlFor="driver">Preferência de Motorista  (Bilingue ou Monolíngue)  / Driver Preference (Bilingual or Monolingual)</label>
                                <input id="driver" name="driver" type="text" placeholder="Digite a preferência do motorista" value={formData.driver} onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="veiculo">Tipo de Veículo / Vehicle Type</label>
                                <input required id="veiculo" name="veiculo" type="text" placeholder="Digite o tipo de veículo" value={formData.veiculo} onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="pickup">Local de Embarque / Pickup Location</label>
                                <input required id="pickup" name="pickup" type="text" placeholder="Digite o local de embarque" value={formData.pickup} onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="dropoff">Local de Desembarque / Dropoff Location</label>
                                <input id="dropoff" name="dropoff" type="text" placeholder="Digite o local de desembarque" value={formData.dropoff} onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="observation">Observações / Observations</label>
                                <textarea name="observation" id="observation" placeholder="Adicione observações" value={formData.observation} onChange={handleChange}></textarea>
                            </div>
                        </div>
                        <div className="btn-container">
                            <button type="submit" id="submit-button" className="button" onClick={handleSubmit}>
                                <Plus size={24} />
                                {existingBooking ? "Atualizar" : "Agendar"}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}