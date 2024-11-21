package com.cesarschool.coffeeshop.controller;

import com.cesarschool.coffeeshop.domain.Client;
import com.cesarschool.coffeeshop.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/clients")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @PostMapping
    public ResponseEntity<String> addClient(@RequestBody Client client) {
        String result = clientService.addClient(client);
        if (result.equals("CPF já cadastrado!")) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @GetMapping
    public ResponseEntity<List<Client>> getAllClients() {
        List<Client> clients = clientService.getAllClients();
        return ResponseEntity.ok(clients);
    }

    @GetMapping("/{cpf}")
    public ResponseEntity<?> getClientByCpf(@PathVariable String cpf) {
        Client client = clientService.getClientByCpf(cpf);
        if (client == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("CPF não encontrado!");
        }
        return ResponseEntity.ok(client);
    }

    @PutMapping("/{cpf}")
    public ResponseEntity<String> updateClient(@PathVariable String cpf, @RequestBody Client client) {
        String result = clientService.updateClient(cpf, client);
        if (result.equals("CPF não encontrado!")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
        }
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{cpf}")
    public ResponseEntity<String> deleteClient(@PathVariable String cpf) {
        String result = clientService.deleteClient(cpf);
        if (result.equals("CPF não encontrado!")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
        }
        return ResponseEntity.ok(result);
    }
}
