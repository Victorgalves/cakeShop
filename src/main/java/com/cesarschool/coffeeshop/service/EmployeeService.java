package com.cesarschool.coffeeshop.service;

import com.cesarschool.coffeeshop.domain.Employee;
import com.cesarschool.coffeeshop.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public boolean existsByCpf(String cpf) {
        return employeeRepository.existsByCpf(cpf);
    }

    public Employee findByCpf(String cpf) {
        return employeeRepository.findByCpf(cpf);
    }

    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    public void save(Employee employee) {
        employeeRepository.save(employee);
    }

    public void update(Employee employee) {
        employeeRepository.update(employee);
    }

    public void delete(String cpf) {
        employeeRepository.delete(cpf);
    }
}
