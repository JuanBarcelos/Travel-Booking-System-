import * as yup from "yup";

export const bookingSchema = yup.object().shape({
    solicitante: yup.string().trim().required("O nome do solicitante é obrigatório"),
    cliente: yup.string().trim().required("O nome do cliente é obrigatório"),
    dataServico: yup
        .date()
        .typeError("Data inválida")
        .min(new Date(), "A data do serviço não pode estar no passado")
        .required("A data do serviço é obrigatória"),
    horaServico: yup.string().required("A hora do serviço é obrigatória"),
    servico: yup.string().trim().required("O tipo de serviço é obrigatório"),
    veiculo: yup.string().trim().required("O veículo é obrigatório"),
    contato: yup.string().trim(),
    observation: yup.string().trim(),
    driver: yup.string().trim(),
    voo: yup.string().trim(),
    pickup: yup.string().trim(),
    dropoff: yup.string().trim(),
    pax: yup.string().trim(),
});
