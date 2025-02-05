import "./Booking.css";
import Menu from "../../components/menu/Menu";
import { Plus } from "@phosphor-icons/react";
import { createBooking } from "../../script/server-booking";
//import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext";
import { useBookings } from "../../context/BookingContext";
import { useForm } from "react-hook-form";
import { bookingSchema } from "../../validations/bookingSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalBooking from "../../components/modal-booking-details/ModalBooking";
import { useEffect } from "react";

export default function Booking() {
  const { user } = useUser();
  const { previewBooking, setResetFunction  } = useBookings();

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(bookingSchema)
  });

  // Registrar a função de reset no contexto
  useEffect (() => {
    setResetFunction(() => reset());
  }, [setResetFunction, reset]);

  const onPreview = async (data) => {
    const newBooking = createBooking(data, user);
    previewBooking(newBooking);
  };

  return (
    <>
      <div className="booking-conatiner">
        <Menu />
        <section id="booking-form-section" className="section">
          <h2 id="form-title" className="title">
            Agendamento Brummie
          </h2>
          <form onSubmit={handleSubmit(onPreview)}id="booking-form" className="form">
            <div className="form-inputs-container">
              <div className="booking-input-group">
                <label htmlFor="REQUESTING">
                  Nome do Solicitante / Requester Name
                </label>
                <input
                  id="REQUESTING"
                  type="text"
                  placeholder="Digite seu Usuário"
                  {...register("REQUESTING")}
                />
                {errors.REQUESTING && <p className="formError">{errors.REQUESTING.message}</p>}
              </div>
              <div className="form-inputs-content">
                <div className="booking-input-group">
                  <label htmlFor="CUSTOMER_NAME">Nome do Cliente / Client Name</label>
                  <input
                    id="CUSTOMER_NAME"
                    type="text"
                    placeholder="Digite seu Cliente"
                    {...register("CUSTOMER_NAME")}
                  />
                  {errors.CUSTOMER_NAME && <p className="formError">{errors.CUSTOMER_NAME.message}</p>}
                </div>
                <div className="booking-input-group">
                  <label htmlFor="CONTACT">
                    Contato do Cliente / Client Contact
                  </label>
                  <input
                    id="CONTACT"
                    type="text"
                    placeholder="Digite o contato do cliente"
                    {...register("CONTACT")}
                  />
                </div>
              </div>
              <div className="form-inputs-content">
                <div className="booking-input-group">
                  <label htmlFor="SERVICE_DATE">
                    Data do Serviço / Service Date
                  </label>
                  <input
                    id="SERVICE_DATE"
                    type="date"
                    {...register("SERVICE_DATE")}
                  />
                   {errors.SERVICE_DATE && <p className="formError">{errors.SERVICE_DATE.message}</p>}
                </div>
                <div className="booking-input-group">
                  <label htmlFor="SERVICE_HOUR">
                    Hora do Serviço / Service Time
                  </label>
                  <input
                    id="SERVICE_HOUR"
                    type="time"
                    {...register("SERVICE_HOUR")}
                  />
                  {errors.SERVICE_HOUR && <p className="formError">{errors.SERVICE_HOUR.message}</p>}
                </div>
                <div className="booking-input-group">
                  <label htmlFor="FLIGHT_NUMBER">Número do Voo / Flight Number</label>
                  <input
                    id="FLIGHT_NUMBER"
                    type="text"
                    placeholder="Digite o número do voo"
                    {...register("FLIGHT_NUMBER")}
                  />
                </div>
              </div>
              <div className="form-inputs-content">
                <div className="booking-input-group">
                  <label htmlFor="PAX_NUMBER">
                    Número de Passageiros / Number of Passengers
                  </label>
                  <input
                    id="PAX_NUMBER"
                    type="text"
                    placeholder="Digite o número de passageiros"
                    {...register("PAX_NUMBER")}
                  />
                </div>
                <div className="booking-input-group">
                  <label htmlFor="SERVICE_TYPE">
                    Tipo de Serviço / Service Type
                  </label>
                  <input
                    id="SERVICE_TYPE"
                    type="text"
                    placeholder="Digite o tipo de serviço"
                    {...register("SERVICE_TYPE")}
                  />
                  {errors.SERVICE_TYPE && <p className="formError">{errors.SERVICE_TYPE.message}</p>}
                </div>
              </div>
              <div className="booking-input-group">
                <label htmlFor="DRIVER_LANGUAGE">
                  Preferência de Motorista (Bilingue ou Monolíngue) / Driver
                  Preference (Bilingual or Monolingual)
                </label>
                <input
                  id="DRIVER_LANGUAGE"
                  type="text"
                  placeholder="Digite a preferência do motorista"
                  {...register("DRIVER_LANGUAGE")}
                />
              </div>
              <div className="booking-input-group">
                <label htmlFor="VEHICLE_TYPE">Tipo de Veículo / Vehicle Type</label>
                <input
                  required
                  id="VEHICLE_TYPE"
                  type="text"
                  placeholder="Digite o tipo de veículo"
                  {...register("VEHICLE_TYPE")}
                />
                {errors.VEHICLE_TYPE && <p className="formError">{errors.VEHICLE_TYPE.message}</p>}
              </div>
              <div className="booking-input-group">
                <label htmlFor="PICKUP">
                  Local de Embarque / Pickup Location
                </label>
                <input
                  required
                  id="PICKUP"
                  type="text"
                  placeholder="Digite o local de embarque"
                  {...register("PICKUP")}
                />
              </div>
              <div className="booking-input-group">
                <label htmlFor="DROPOFF">
                  Local de Desembarque / Dropoff Location
                </label>
                <input
                  id="DROPOFF"
                  type="text"
                  placeholder="Digite o local de desembarque"
                  {...register("DROPOFF")}
                />
              </div>
              <div className="booking-input-group">
                <label htmlFor="OBSERVATION">Observações / Observations</label>
                <textarea
                  id="OBSERVATION"
                  placeholder="Adicione observações"
                  {...register("OBSERVATION")}
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
        <ModalBooking />
      </div>
    </>
  );
}
