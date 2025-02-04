import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";

// Função para gerar o PDF estilizado
export const generateTodaysBookingPDF = () => {
  try {
    // Obtém a data de hoje no formato "DD/MM/AAAA"
    const today = new Date().toLocaleDateString("pt-BR");

    // Busca as reservas no localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Filtra apenas as reservas que são do dia atual
    const todaysBookings = bookings.filter(
      (booking) => booking.dataAgendamento === today
    );

    if (todaysBookings.length === 0) {
      alert("Nenhuma reserva encontrada para hoje.");
      return;
    }

    // Criando um novo documento PDF no formato A4
    const doc = new jsPDF("p", "mm", "a4");

    // Capa do documento
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text("Relatório de Reservas", 70, 20);
    doc.setFontSize(16);
    doc.text(`Data: ${today}`, 80, 30);
    doc.setLineWidth(0.5);
    doc.line(10, 35, 200, 35); // Linha separadora

    // Criando um cabeçalho e rodapé em todas as páginas
    const addHeaderFooter = (doc, pageNumber) => {
      doc.setFontSize(10);
      doc.text(`Página ${pageNumber}`, 180, 285);
    };

    // Iterar sobre cada reserva e adicioná-las ao documento
    todaysBookings.forEach((booking, index) => {
      if (index > 0) doc.addPage(); // Adiciona nova página (exceto na primeira)

      addHeaderFooter(doc, index + 1); // Adiciona o rodapé

      doc.setFontSize(14);
      doc.text("Detalhes da Reserva", 80, 50);

      // Criar uma tabela para os dados
      doc.autoTable({
        startY: 60,
        head: [["Campo", "Informação"]],
        body: [
          ["Código", booking.id],
          ["Status", booking.status],
          ["Solicitante", booking.solicitante],
          ["Cliente", booking.cliente],
          ["Contato", booking.contato || "Não informado"],
          ["Data do Serviço", booking.dataServico],
          ["Hora do Serviço", booking.horaServico],
          ["Número do Voo", booking.voo || "Não informado"],
          ["Número de Pax", booking.pax || "Não informado"],
          ["Serviço", booking.servico],
          ["Motorista", booking.driver || "Não informado"],
          ["Veículo", booking.veiculo],
          ["Embarque", booking.pickup],
          ["Desembarque", booking.dropoff || "Não informado"],
          ["Observações", booking.observation || "Nenhuma"],
          ["Operador", booking.operador],
        ],
        theme: "grid",
        styles: { fontSize: 12, cellPadding: 3 },
        headStyles: {
          fillColor: [0, 102, 204],
          textColor: 255,
          fontStyle: "bold",
        },
        alternateRowStyles: { fillColor: [240, 240, 240] },
      });
    });

    // Salvar o PDF
    doc.save(`Relatorio-Reservas-${today}.pdf`);
    toast.success("Relatório gerado com sucesso");
  } catch (error) {
    console.log("Erro ao gerar PDF:", error);
    toast.error("Erro ao gerar o relatório.");
  }
};
