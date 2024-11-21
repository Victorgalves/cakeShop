import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllEmployee, deleteEmployee } from '../../services/EmployeeService';
import Modal from 'react-modal';
import './EmployeeList.css';
import Menu from "../../components/Menu/Menu";

Modal.setAppElement('#root');

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [filter, setFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            const employeesData = await getAllEmployee();
            setEmployees(employeesData);
        };

        fetchEmployees();
    }, []);

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(filter.toLowerCase())
    );

    const handleDeleteEmployee = (cpf) => {
        setEmployeeToDelete(cpf);
        setShowModal(true);
    };

    const confirmDeleteEmployee = async () => {
        if (employeeToDelete) {
            try {
                await deleteEmployee(employeeToDelete);
                setEmployees(employees.filter(employee => employee.cpf !== employeeToDelete));
            } catch (error) {
                alert('Não é possível excluir o funcionário com pedido associado.');
            }
        }
        setShowModal(false);
    };

    const cancelDeleteEmployee = () => {
        setShowModal(false);
    };

    const handleGoHome = () => {
        navigate('/home');
    };

    return (
        <div className="employee-list-page">
            <Menu />
            <div className="employee-list-container">
                <div className="header">
                    <div className="header-buttons">
                        <button className="btn-back" onClick={handleGoHome}>Voltar</button>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Filtrar por nome"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                        </div>
                        <Link to="/employees/novo">
                            <button className="btn-primary">Adicionar Funcionário</button>
                        </Link>
                    </div>
                </div>

                <div className="employee-cards">
                    {filteredEmployees.map(employee => (
                        <div className="employee-card" key={employee.cpf}>
                            <h3>{employee.name}</h3>
                            <p><strong>Salário:</strong> {employee.salary}</p>
                            <p><strong>CPF:</strong> {employee.cpf}</p>
                            <p><strong>Cargo:</strong> {employee.position}</p>
                            <p><strong>Gerente:</strong> {employee.isManager ? 'Sim' : 'Não'}</p>
                            <p className="employee-details"><strong>Data de contratação:</strong> {employee.hiringDate}</p>
                            <div className="actions">
                                <Link to={`/employees/editar/${employee.cpf}`}>
                                    <button className="btn-edit">Editar</button>
                                </Link>
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDeleteEmployee(employee.cpf)}
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>Tem certeza que deseja excluir este funcionário?</h3>
                            <div className="modal-buttons">
                                <button onClick={confirmDeleteEmployee}>Confirmar</button>
                                <button onClick={cancelDeleteEmployee}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeList;
