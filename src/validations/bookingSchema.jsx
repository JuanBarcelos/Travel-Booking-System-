import * as yup from "yup";

export const bookingSchema = yup.object().shape({
    REQUESTING: yup.string().trim().required("O nome do solicitante é obrigatório"),
    CUSTOMER_NAME: yup.string().trim().required("O nome do cliente é obrigatório"),
    SERVICE_DATE: yup
        .date()
        .typeError("Data inválida")
        .min(new Date(), "A data do serviço não pode estar no passado")
        .required("A data do serviço é obrigatória"),
    SERVICE_HOUR: yup.string().required("A hora do serviço é obrigatória"),
    SERVICE_TYPE: yup.string().trim().required("O tipo de serviço é obrigatório"),
    VEHICLE_TYPE: yup.string().trim().required("O veículo é obrigatório"),
    CONTACT: yup.string().trim(),
    OBSERVATION: yup.string().trim(),
    DRIVER_LANGUAGE: yup.string().trim(),
    FLIGHT_NUMBER: yup.string().trim(),
    PICKUP: yup.string().trim(),
    DROPOFF: yup.string().trim(),
    PAX_NUMBER: yup.string().trim(),
});
