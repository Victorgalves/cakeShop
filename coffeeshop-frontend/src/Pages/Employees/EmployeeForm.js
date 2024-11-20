import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeByCpf, addEmployee, updateEmployee } from '../../services/EmployeeService';
import Menu from '../../components/Menu/Menu';
import '../Employees/EmployeeForm.css';

const EmployeeForm = () => {
    const navigate = useNavigate();
    const { cpf } = useParams();
    const [employee, setEmployee] = useState({
        name: '',
        cpf: '',
        salary: '',
        position: '',
        hiringDate: '',
        isManager: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        if (cpf) {
            const fetchEmployee = async () => {
                try {
                    const employeeData = await getEmployeeByCpf(cpf);
                    setEmployee(employeeData);
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        setModalMessage('Funcionário não encontrado!');
                        setShowModal(true);
                        navigate('/employees');
                    } else {
                        setModalMessage('Erro ao carregar Funcionário.');
                        setShowModal(true);
                    }
                }
            };
            fetchEmployee();
        }
    }, [cpf, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (cpf) {
                await updateEmployee(cpf, employee);
                setModalMessage('Funcionário atualizado com sucesso!');
            } else {
                await addEmployee(employee);
                setModalMessage('Funcionário criado com sucesso!');
            }
            setShowModal(true); // Exibe o modal após sucesso
        } catch (error) {
            console.error(error);
            setModalMessage('Erro ao salvar funcionário. Tente novamente.');
            setShowModal(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/employees');
    };

    const handleGoBack = () => {
        navigate('/employees');
    };

    return (
        <div className="employee-form-page">
            <Menu /> {/* Adicionando o Menu aqui */}
            <div className="employee-form-container">
                <button className="btn-back" onClick={handleGoBack}>Voltar</button>
                <h2>{cpf ? 'Editar Funcionário' : 'Adicionar Funcionário'}</h2>
                <form onSubmit={handleSubmit} className="employee-form">
                    {!cpf && (
                        <div className="form-group">
                            <label>CPF:</label>
                            <input
                                type="text"
                                name="cpf"
                                value={employee.cpf}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Nome:</label>
                        <input
                            type="text"
                            name="name"
                            value={employee.name}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Salário:</label>
                        <input
                            type="number"
                            name="salary"
                            value={employee.salary}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Cargo:</label>
                        <select
                            name="position"
                            value={employee.position}
                            onChange={handleChange}
                            required
                            className="form-control"
                        >
                            <option value="">Selecione um cargo</option>
                            <option value="Atendente">Atendente</option>
                            <option value="Cozinheiro">Cozinheiro</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Data de contratação:</label>
                        <input
                            type="date"
                            name="hiringDate"
                            value={employee.hiringDate}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Gerente:</label>
                        <select
                            name="isManager"
                            value={employee.isManager}
                            onChange={handleChange}
                            required
                            className="form-control"
                        >
                            <option value="">Selecione</option>
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                        </select>
                    </div>
                    <div className="form-group" style={{ width: '100%' }}>
                        <button type="submit" className="btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Salvando...' : (cpf ? 'Atualizar Funcionário' : 'Adicionar Funcionário')}
                        </button>
                    </div>
                </form>

                {/* Modal de Sucesso */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-container">
                            <h3>{modalMessage}</h3>
                            <button onClick={handleCloseModal} className="btn-close">Fechar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeForm;
