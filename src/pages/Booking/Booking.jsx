import "./Booking.css";
import Menu from "../../components/menu/Menu";
import { Plus } from "@phosphor-icons/react";
import { createBooking } from "../../script/server-booking";
import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext";
import { useBookings } from "../../context/BookingContext";
import { useForm } from "react-hook-form";
import { bookingSchema } from "../../validations/bookingSchema";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Booking() {
  const { user } = useUser();
  const { addBooking } = useBookings();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(bookingSchema)
  });

  const onSubmit = async (data) => {

    const newBooking = createBooking(data, user);

    const response = await addBooking.mutateAsync(newBooking);

    if(response){
      toast.success("Agendamento realizado com sucesso");
    }else{
      toast.success("Erro ao realizar o agendamento");
    }
  };

  return (
    <>
      <div className="booking-conatiner">
        <Menu />
        <section id="booking-form-section" className="section">
          <h2 id="form-title" className="title">
            Agendamento Brummie
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}id="booking-form" className="form">
            <div className="form-inputs-container">
              <div className="booking-input-group">
                <label htmlFor="solicitante">
                  Nome do Solicitante / Requester Name
                </label>
                <input
                  id="solicitante"
                  type="text"
                  placeholder="Digite seu Usuário"
                  {...register("solicitante")}
                />
                {errors.solicitante && <p className="formError">{errors.solicitante.message}</p>}
              </div>
              <div className="form-inputs-content">
                <div className="booking-input-group">
                  <label htmlFor="cliente">Nome do Cliente / Client Name</label>
                  <input
                    id="cliente"
                    type="text"
                    placeholder="Digite seu Cliente"
                    {...register("cliente")}
                  />
                  {errors.cliente && <p className="formError">{errors.cliente.message}</p>}
                </div>
                <div className="booking-input-group">
                  <label htmlFor="contato">
                    Contato do Cliente / Client Contact
                  </label>
                  <input
                    id="contato"
                    type="text"
                    placeholder="Digite o contato do cliente"
                    {...register("contato")}
                  />
                </div>
              </div>
              <div className="form-inputs-content">
                <div className="booking-input-group">
                  <label htmlFor="dataServico">
                    Data do Serviço / Service Date
                  </label>
                  <input
                    id="data-serviço"
                    type="date"
                    {...register("dataServico")}
                  />
                   {errors.dataServico && <p className="formError">{errors.dataServico.message}</p>}
                </div>
                <div className="booking-input-group">
                  <label htmlFor="horaServico">
                    Hora do Serviço / Service Time
                  </label>
                  <input
                    id="horaServico"
                    type="time"
                    {...register("horaServico")}
                  />
                  {errors.horaServico && <p className="formError">{errors.horaServico.message}</p>}
                </div>
                <div className="booking-input-group">
                  <label htmlFor="voo">Número do Voo / Flight Number</label>
                  <input
                    id="voo"
                    type="text"
                    placeholder="Digite o número do voo"
                    {...register("voo")}
                  />
                </div>
              </div>
              <div className="form-inputs-content">
                <div className="booking-input-group">
                  <label htmlFor="pax">
                    Número de Passageiros / Number of Passengers
                  </label>
                  <input
                    id="pax"
                    type="text"
                    placeholder="Digite o número de passageiros"
                    {...register("pax")}
                  />
                </div>
                <div className="booking-input-group">
                  <label htmlFor="servico">
                    Tipo de Serviço / Service Type
                  </label>
                  <input
                    id="servico"
                    type="text"
                    placeholder="Digite o tipo de serviço"
                    {...register("servico")}
                  />
                </div>
                {errors.servico && <p className="formError">{errors.servico.message}</p>}
              </div>
              <div className="booking-input-group">
                <label htmlFor="driver">
                  Preferência de Motorista (Bilingue ou Monolíngue) / Driver
                  Preference (Bilingual or Monolingual)
                </label>
                <input
                  id="driver"
                  type="text"
                  placeholder="Digite a preferência do motorista"
                  {...register("driver")}
                />
              </div>
              <div className="booking-input-group">
                <label htmlFor="veiculo">Tipo de Veículo / Vehicle Type</label>
                <input
                  required
                  id="veiculo"
                  type="text"
                  placeholder="Digite o tipo de veículo"
                  {...register("veiculo")}
                />
                {errors.veiculo && <p className="formError">{errors.veiculo.message}</p>}
              </div>
              <div className="booking-input-group">
                <label htmlFor="pickup">
                  Local de Embarque / Pickup Location
                </label>
                <input
                  required
                  id="pickup"
                  type="text"
                  placeholder="Digite o local de embarque"
                  {...register("pickup")}
                />
              </div>
              <div className="booking-input-group">
                <label htmlFor="dropoff">
                  Local de Desembarque / Dropoff Location
                </label>
                <input
                  id="dropoff"
                  type="text"
                  placeholder="Digite o local de desembarque"
                  {...register("dropoff")}
                />
              </div>
              <div className="booking-input-group">
                <label htmlFor="observation">Observações / Observations</label>
                <textarea
                  id="observation"
                  placeholder="Adicione observações"
                  {...register("observation")}
                ></textarea>
              </div>
            </div>
            <div className="btn-container">
              <button
                type="submit"
                id="submit-button"
                className="button"
              >
                <Plus size={24} />
                Agendar
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
