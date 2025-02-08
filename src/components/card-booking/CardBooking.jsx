import { CalendarBlank, Car, Clock } from "@phosphor-icons/react";
import { formatDate } from "../../script/server-booking";

export default function CardBooking({ onClick, Bookings }) {
  return (
    <div className="booking-container">
      {Bookings.map((booking) => (
        <div
          key={booking.ID}
          className="booking-content"
          onClick={() => onClick(booking)}
        >
          <div className="booking-warpper">
            <div className="booking-hearder">
              <div className="title">
                <span>{booking.SOLICITANTE}</span>
                <p className="booking-timer">
                  <Clock size={24} />
                  {booking.H_SERVICO}
                </p>
              </div>
              <p className="booking-code">{booking.ID}</p>
            </div>
            <div className="destination">
              <p>{booking.PICKUP}</p>
              <Car size={24} />
              <p>{booking.DROPOFF}</p>
            </div>
            <div className="footer">
              <p>
                <CalendarBlank size={24} />
                {formatDate(booking.DATA)}
              </p>
              <span>{booking.SERVICO}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
