package com.cesarschool.coffeeshop.repository;


import com.cesarschool.coffeeshop.domain.Employee;

import java.util.List;

public interface EmployeeRepository {
    int save(Employee employee);
    int update(Employee employee);
    int delete(String cpf);
    Employee findByCpf(String cpf);
    List<Employee> findAll();
    boolean existsByCpf(String cpf);
}
