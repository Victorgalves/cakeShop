import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeeList() {
    // State para armazenar a lista de funcionários e o estado de carregamento
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Função para buscar os funcionários do backend
    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8080/employees'); // URL do seu backend
            setEmployees(response.data);
        } catch (error) {
            setError('Erro ao carregar os funcionários');
            console.error("Erro ao buscar os funcionários:", error);
        } finally {
            setLoading(false); // Indica que a requisição foi concluída
        }
    };

    // useEffect para buscar os dados quando o componente carrega
    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Lista de Funcionários</h2>

            {loading && <p>Carregando...</p>}  {/* Mensagem de carregamento */}

            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}  {/* Exibe erro se ocorrer */}

            {!loading && !error && employees.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                    <tr style={{ backgroundColor: '#f4f4f4' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nome</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Cargo</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Salário</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Data de Contratação</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map(employee => (
                        <tr key={employee.cpf}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.name}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.position}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                R$ {employee.salary.toFixed(2).replace('.', ',')}
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                {new Date(employee.hiringDate).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p style={{ textAlign: 'center' }}>Nenhum funcionário encontrado.</p>  // Mensagem caso não haja funcionários
            )}
        </div>
    );
}

export default EmployeeList;
