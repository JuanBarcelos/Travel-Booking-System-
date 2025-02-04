import "./Menu.css";
import logoImg from "../../assets/logoMenor.png";
import { House, CalendarBlank, Note, SignOut } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import ModalRelatorio from "../modal-relatorio/ModalRelatorio";
import { logout } from "../../script/server-login";
import { useUser } from "../../context/UserContext";

export default function Menu() {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <section id="menu-section" className="section">
        <div className="warper">
          <header id="menu-header" className="header">
            <img src={logoImg} alt="Logo" id="menu-logo" className="logo" />
            <h1 id="menu-title" className="title">
              Olá, {user ? user.NOME : ", Seja Bem Vindo"}
            </h1>
            <h2 id="menu-subtitle" className="subtitle">
              Organize e controle suas reservas
            </h2>
          </header>
          <main id="menu-main" className="main">
            <nav id="menu-navigation" className="navigation">
              <ul className="menu-list">
                <li className="active">
                  <NavLink to={"/dashboard"} activeClassName="selected">
                    <House size={24} />
                    Dashboard
                  </NavLink>
                </li>
                <li className="">
                  <NavLink to={"/booking"} activeClassName="selected">
                    <CalendarBlank size={24} />
                    Agendar
                  </NavLink>
                </li>
                <li id="Relatorio" onClick={openModal}>
                  <a href="#">
                    <Note size={24} />
                    Relatório
                  </a>
                </li>
              </ul>
            </nav>
          </main>
        </div>
        <footer id="menu-footer" className="footer">
          <NavLink to={"/"} onClick={logout}>
            <SignOut size={24} />
            <span>Logout</span>
          </NavLink>
        </footer>
        {isModalOpen && <ModalRelatorio onClose={closeModal} />}
      </section>
    </>
  );
}
