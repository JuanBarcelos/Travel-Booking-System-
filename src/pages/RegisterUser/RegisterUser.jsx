import './RegisterUser.css';
import { useState } from 'react';
import { getCode, } from '../../script/server-booking';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function RegisterUser() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        CODE: '',
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await getCode(formData);

        if (response.success) {
            toast.success(response.message);
            setFormData({ // Limpa o formulário
                CODE: "",
            });
            navigate('/register/user')
        } else {
            toast.error(response.message);
        }
    };

    return (
        <>
            <div className="conatiner">
                <section id="form-create-section" className="section">
                    <h2 id="form-title" className="title">Autenticação de usuário</h2>
                    <form id="create-user-form" className="form">
                        <div className="form-inputs-container">
                            <div className="input-group">
                                <label htmlFor="code">Código de Autenticação / Authentication Code</label>
                                <input
                                    required
                                    name="CODE"
                                    type="text"
                                    placeholder="Digite seu código enviado pela logística"
                                    value={formData.CODE}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="btn-container">
                            <button type="submit" id="btn-create-user" onClick={handleSubmit}>
                                Verificar Código
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}
