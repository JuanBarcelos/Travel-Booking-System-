import './Login.css';
import logoImg from '../../assets/logo.png';
import { User, LockSimple } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { isAuthenticatedUser  } from '../../script/server-login';
import { toast } from 'react-toastify';
import { useUser } from "../../context/UserContext";

function Login() {
    const navigate = useNavigate();
    const { setUser } = useUser(); 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const isAuthenticated = await isAuthenticatedUser(username,password);
        const user = isAuthenticated?.user || {};

        if (isAuthenticated.success === true) {
            toast.success(isAuthenticated.message);
            setUser(user)
            navigate('/dashboard') 
        }else{
            toast.error(isAuthenticated.message)
        }
    };

    return (
        <>
            <div className="container">
                <section id="login-section">
                    <header>
                        <p>Brummie Lines</p>
                    </header>
                    <main>
                        <h1>Bem-vindo de volta!</h1>
                        <h2>Faça login para gerenciar suas reservas</h2>
                        <form id="login-form">
                            <div className="login-inputs-container">
                                <div className="login-input-group">
                                    <label htmlFor="username">Usuário</label>
                                    <div className="login-input-icon">
                                        <div className="i">
                                            <User size={24} />
                                        </div>
                                        <input 
                                            required 
                                            id="username"
                                            name="username" 
                                            type="text" 
                                            placeholder="Digite seu Usuário" 
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="login-input-group">
                                    <label htmlFor="password">Senha</label>
                                    <div className="login-input-icon">
                                        <div className="i">
                                            <LockSimple size={24} />
                                        </div>
                                        <input 
                                            required 
                                            id="password" 
                                            name="password" 
                                            type="password" 
                                            placeholder="Digite sua senha"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button type='submit' id="submit-button-login" onClick={handleLogin}>Sign in</button>
                        </form>
                    </main>
                    <footer className='footer-login'>
                        <p>Problemas ao acessar? Entre em contato com a logística.</p>
                    </footer>
                </section>
                <section id="login-section-img">
                    <img src={logoImg} alt="um fundo preto com uma águia pintada com três cores, verde,amarela e azul" />
                </section>
            </div>
        </>
    )
}

export default Login