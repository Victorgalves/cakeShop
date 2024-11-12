package com.cesarschool.coffeeshop.controller;

import com.cesarschool.coffeeshop.domain.Client;
import com.cesarschool.coffeeshop.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/clients")

public class ClientController {

    @Autowired
    private ClientRepository ClientRepository;

    @PostMapping
    public ResponseEntity<String> addClient(@RequestBody Client Client) {
        if (ClientRepository.existsByCpf(Client.getCpf())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("CPF já cadastrado!");
        }
        ClientRepository.save(Client);
        System.out.println("cpf: " + Client.getCpf());
        System.out.println("nome: " + Client.getName());
        System.out.println("email: " + Client.getEmail());
        System.out.println("telefone: " + Client.getPhone());
        System.out.println("rua: " + Client.getStreet());
        System.out.println("bairro: " + Client.getDistrict());
        System.out.println("numero: " + Client.getNumber());
        return ResponseEntity.status(HttpStatus.CREATED).body("Cliente criado com sucesso!");
    }

    @GetMapping
    public ResponseEntity<List<Client>> getAllClients() {
        List<Client> Clients = ClientRepository.findAll();
        return ResponseEntity.ok(Clients);
    }

    @GetMapping("/{cpf}")
    public ResponseEntity<?> getClientByCpf(@PathVariable String cpf) {
        if (!ClientRepository.existsByCpf(cpf)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("CPF não encontrado!");
        }

        Client Client = ClientRepository.findByCpf(cpf);
        return ResponseEntity.ok(Client);
    }

    @PutMapping("/{cpf}")
    public ResponseEntity<String> updateClient(@PathVariable String cpf, @RequestBody Client client) {
        if (!ClientRepository.existsByCpf(cpf)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("CPF não encontrado!");
        }
        Client existingClient = ClientRepository.findByCpf(cpf);

        existingClient.setName(client.getName());
        existingClient.setEmail(client.getEmail());
        existingClient.setPhone(client.getPhone());
        existingClient.setStreet(client.getStreet());
        existingClient.setDistrict(client.getDistrict());
        existingClient.setNumber(client.getNumber());

        ClientRepository.update(existingClient);

        return ResponseEntity.ok("Cliente atualizado com sucesso!");
    }

    @DeleteMapping("/{cpf}")
    public ResponseEntity<String> deleteClient(@PathVariable String cpf) {
        if (!ClientRepository.existsByCpf(cpf)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("CPF não encontrado!");
        }
        Client existingEmployee = ClientRepository.findByCpf(cpf);
        ClientRepository.delete(cpf);
        return ResponseEntity.ok("Cliente removido com sucesso!");
    }
}
