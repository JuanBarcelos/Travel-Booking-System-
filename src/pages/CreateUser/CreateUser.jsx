import './CreateUser.css';
import { useState } from 'react';
import { createUser, } from '../../script/server-booking';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function CreateUser() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await createUser(formData);

        if (response.success) {
            toast.success(response.message);
            setFormData({ // Limpa o formulário
                name: '',
                lastName: '',
                email: '',
                username: '',
                password: '',
            });
            navigate('/');
        } else {
            toast.error(response.message);
        }
    };

    return (
        <>
            <div className="conatiner">
                <section id="form-create-section" className="section">
                    <h2 id="form-title" className="title">Cadastro de usuário</h2>
                    <form id="create-user-form" className="form">
                        <div className="form-inputs-container">
                            <div className="input-group">
                                <label htmlFor="name">Seu Nome / Your Name</label>
                                <input
                                    required
                                    name="name"
                                    type="text"
                                    placeholder="Digite seu nome"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="lastName">Seu Sobrenome / Your Last Name</label>
                                <input
                                    required
                                    name="lastName"
                                    type="text"
                                    placeholder="Digite seu sobrenone"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="email">Seu Email / Your Email</label>
                                <input
                                    required
                                    name="email"
                                    type="email"
                                    placeholder="Digite seu email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="username">Seu Usuário / Your Nickname</label>
                                <input
                                    required
                                    name="username"
                                    type="text"
                                    placeholder="Digite seu nome de usuário"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Sua Senha / Your Password</label>
                                <input
                                    required
                                    name="password"
                                    type="password"
                                    placeholder="Digite sua senha"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="btn-container">
                            <button type="submit" id="btn-create-user" onClick={handleSubmit}>
                                Enviar
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}