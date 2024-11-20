package com.cesarschool.coffeeshop.repository;

import com.cesarschool.coffeeshop.domain.Employee;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EmployeeRepositoryImp implements EmployeeRepository {

    private final JdbcTemplate jdbcTemplate;

    public EmployeeRepositoryImp(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int save(Employee employee) {
        return jdbcTemplate.update(
                "INSERT INTO Funcionario (nome, cpf, salario, cargo, dtContratacao, gerente) VALUES (?, ?, ?, ?, ?, ?)",
                employee.getName(), employee.getCpf(), employee.getSalary(), employee.getPosition(), employee.getHiringDate(), employee.getIsManager()
        );
    }

    @Override
    public List<Employee> findAll() {
        return jdbcTemplate.query("SELECT * FROM Funcionario", (rs, rowNum) -> {
            Employee employee = new Employee();
            employee.setName(rs.getString("nome"));
            employee.setCpf(rs.getString("cpf"));
            employee.setSalary(rs.getDouble("salario"));
            employee.setPosition(rs.getString("cargo"));
            employee.setHiringDate(rs.getDate("dtContratacao"));
            employee.setIsManager(rs.getString("gerente"));
            return employee;
        });
    }

    @Override
    public Employee findByCpf(String cpf) {
        return jdbcTemplate.queryForObject("SELECT * FROM Funcionario WHERE cpf = ?", new Object[]{cpf}, (rs, rowNum) -> {
            Employee employee = new Employee();
            employee.setName(rs.getString("nome"));
            employee.setCpf(rs.getString("cpf"));
            employee.setSalary(rs.getDouble("salario"));
            employee.setPosition(rs.getString("cargo"));
            employee.setHiringDate(rs.getDate("dtContratacao"));
            employee.setIsManager(rs.getString("gerente"));
            return employee;
        });
    }

    @Override
    public int update(Employee employee) {
        return jdbcTemplate.update(
                "UPDATE Funcionario SET nome = ?, salario = ?, cargo = ?, dtContratacao = ?, gerente = ? WHERE cpf = ?",
                employee.getName(), employee.getSalary(), employee.getPosition(), employee.getHiringDate(), employee.getIsManager(), employee.getCpf()
        );
    }

    @Override
    public int delete(String cpf) {
        String updateStatusSql = "UPDATE Funcionario SET status = 'Inativo' WHERE cpf = ?";
        return jdbcTemplate.update(updateStatusSql, cpf);
    }

    public boolean existsByCpf(String cpf) {
        String sql = "SELECT COUNT(*) FROM Funcionario WHERE cpf = ?";
        Integer count = jdbcTemplate.queryForObject(sql, new Object[]{cpf}, Integer.class);
        return count != null && count > 0;
    }
}
