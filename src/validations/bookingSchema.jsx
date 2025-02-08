import * as yup from "yup";

export const bookingSchema = yup.object().shape({
    SOLICITANTE: yup.string().trim().required("O nome do solicitante é obrigatório"),
    CLIENTE: yup.string().trim().required("O nome do cliente é obrigatório"),
    DATA: yup
        .date()
        .typeError("Data inválida")
        .min(new Date(), "A data do serviço não pode estar no passado")
        .required("A data do serviço é obrigatória"),
    H_SERVICO: yup.string().required("A hora do serviço é obrigatória"),
    SERVICO: yup.string().trim().required("O tipo de serviço é obrigatório"),
    VEICULO: yup.string().trim().required("O veículo é obrigatório"),
    CONTATO: yup.string().trim(),
    OBSERVACAO: yup.string().trim(),
    MONO_BILINGUE: yup.string().trim(),
    VOO: yup.string().trim(),
    PICKUP: yup.string().trim(),
    DROPOFF: yup.string().trim(),
    PAX: yup.string().trim(),
});
