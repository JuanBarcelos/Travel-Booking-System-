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
import { PhoneInputField } from "../../components/Inputs/PhoneInputField";
import { CustomSelect } from "../../components/Inputs/CustomSelect";
import { driverOptions, serviceOptions, veiculoOptions } from "../../script/optionsData";

export default function Booking() {
  const { user } = useUser();
  const { previewBooking, setResetFunction  } = useBookings();

  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      CONTATO:"",
      SERVICO:"",
      VEICULO:"",
      MONO_BILINGUE:""
    }
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
                <label htmlFor="SOLICITANTE">
                  Nome do Solicitante / Requester Name
                </label>
                <input
                  id="SOLICITANTE"
                  type="text"
                  placeholder="Digite seu Usuário"
                  {...register("SOLICITANTE")}
                />
                {errors.SOLICITANTE && <p className="formError">{errors.SOLICITANTE.message}</p>}
              </div>
              <div className="form-inputs-content">
                <div className="booking-input-group">
                  <label htmlFor="CLIENTE">Nome do Cliente / Client Name</label>
                  <input
                    id="CLIENTE"
                    type="text"
                    placeholder="Digite seu Cliente"
                    {...register("CLIENTE")}
                  />
                  {errors.CLIENTE && <p className="formError">{errors.CLIENTE.message}</p>}
                </div>
                <div className="booking-input-group">
                  <PhoneInputField 
                    control={control}
                    name={'CONTATO'}
                    label={'Contato do Cliente / Client Contact'}
                    errors={errors}
                  />
                </div>
              </div>
              <div className="form-inputs-content">
                <div className="booking-input-group">
                  <label htmlFor="DATA">
                    Data do Serviço / Service Date
                  </label>
                  <input
                    id="DATA"
                    type="date"
                    {...register("DATA")}
                  />
                   {errors.DATA && <p className="formError">{errors.DATA.message}</p>}
                </div>
                <div className="booking-input-group">
                  <label htmlFor="H_SERVICO">
                    Hora do Serviço / Service Time
                  </label>
                  <input
                    id="H_SERVICO"
                    type="time"
                    {...register("H_SERVICO")}
                  />
                  {errors.H_SERVICO && <p className="formError">{errors.H_SERVICO.message}</p>}
                </div>
                <div className="booking-input-group">
                  <label htmlFor="VOO">Número do Voo / Flight Number</label>
                  <input
                    id="VOO"
                    type="text"
                    placeholder="Digite o número do voo"
                    {...register("VOO")}
                  />
                </div>
              </div>
              <div className="form-inputs-content-group">
                <div className="booking-input-group">
                  <label htmlFor="PAX">
                    Número de Passageiros / Number of Passengers
                  </label>
                  <input
                    id="PAX"
                    type="text"
                    placeholder="Digite o número de passageiros"
                    {...register("PAX")}
                  />
                </div>
                <div className="booking-input-group">
                  <CustomSelect 
                    control={control}
                    name={'SERVICO'}
                    label={`Tipo de Serviço / Service Type`}
                    options={serviceOptions}
                    errors={errors}
                  />
                </div>
                <div className="booking-input-group">
                <CustomSelect 
                  control={control}
                  name={'MONO_BILINGUE'}
                  label={`Preferência de Motorista/ Driver's language `}
                  options={driverOptions}
                  errors={errors}
                />
              </div>
              <div className="booking-input-group">
                <CustomSelect 
                  control={control}
                  name={'VEICULO'}
                  label={`Tipo de Veículo / Vehicle Type`}
                  options={veiculoOptions}
                  errors={errors}
                />
              </div>
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
                <label htmlFor="OBSERVACAO">Observações / Observations</label>
                <textarea
                  id="OBSERVACAO"
                  placeholder="Adicione observações"
                  {...register("OBSERVACAO")}
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
