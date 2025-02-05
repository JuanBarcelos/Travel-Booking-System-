import "./Dashboard.css";
import Menu from "../../components/menu/Menu";
import { MagnifyingGlass } from "@phosphor-icons/react";
import CardBooking from "../../components/card-booking/CardBooking";
import ModalBooking from "../../components/modal-booking-details/ModalBooking";
import { useNavigate } from "react-router-dom";
import { useBookings } from "../../context/BookingContext";

function Dashboard() {
  const navigate = useNavigate();
  const { filteredBookings, isLoading, error, setSearchTerm, openModal } = useBookings();
  
  const handleBooking = () => {
    navigate("/booking");
  };

  return (
    <>
      <div className="conatiner">
        <Menu />
        <section id="dashboard-section">
          <div className="warpper">
            <header className="dashboard-header">
              <div className="input-search">
                <MagnifyingGlass size={24} />
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Pesquisar reserva..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                type="submit"
                id="search-button"
                className="button"
                onClick={handleBooking}
              >
                <i className="ph ph-plus"></i>
                Nova Reserva
              </button>
            </header>
            <main>
                {isLoading ? <p>Carregando reservas...</p> : ''}
                {error ? <p>Erro ao carregar reservas.</p> : ''}
                <CardBooking onClick={(booking) => openModal(booking)} Bookings={filteredBookings} />
                <ModalBooking />
            </main>
          </div>
        </section>
      </div>
    </>
  );
}

export default Dashboard;
