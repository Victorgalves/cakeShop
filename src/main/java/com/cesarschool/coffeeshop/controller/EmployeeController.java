package com.cesarschool.coffeeshop.controller;

import com.cesarschool.coffeeshop.domain.Employee;
import com.cesarschool.coffeeshop.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<String> addEmployee(@RequestBody Employee employee) {
        if (employeeService.existsByCpf(employee.getCpf())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("CPF já cadastrado!");
        }
        employeeService.save(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body("Funcionário criado com sucesso!");
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.findAll();
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/{cpf}")
    public ResponseEntity<?> getEmployeeByCpf(@PathVariable String cpf) {
        if (!employeeService.existsByCpf(cpf)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("CPF não encontrado!");
        }

        Employee employee = employeeService.findByCpf(cpf);
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/{cpf}")
    public ResponseEntity<String> updateEmployee(@PathVariable String cpf, @RequestBody Employee employee) {
        if (!employeeService.existsByCpf(cpf)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("CPF não encontrado!");
        }

        Employee existingEmployee = employeeService.findByCpf(cpf);
        existingEmployee.setName(employee.getName());
        existingEmployee.setSalary(employee.getSalary());
        existingEmployee.setPosition(employee.getPosition());
        existingEmployee.setHiringDate(employee.getHiringDate());
        existingEmployee.setIsManager(employee.getIsManager());

        employeeService.update(existingEmployee);
        return ResponseEntity.ok("Funcionário atualizado com sucesso!");
    }

    @DeleteMapping("/{cpf}")
    public ResponseEntity<String> deleteEmployee(@PathVariable String cpf) {
        if (!employeeService.existsByCpf(cpf)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("CPF não encontrado!");
        }

        employeeService.delete(cpf);
        return ResponseEntity.ok("Funcionário removido com sucesso!");
    }
}
