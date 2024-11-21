package com.cesarschool.coffeeshop.service;

import com.cesarschool.coffeeshop.domain.Client;
import com.cesarschool.coffeeshop.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public String addClient(Client client) {
        if (clientRepository.existsByCpf(client.getCpf())) {
            return "CPF já cadastrado!";
        }
        clientRepository.save(client);
        return "Cliente criado com sucesso!";
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Client getClientByCpf(String cpf) {
        if (!clientRepository.existsByCpf(cpf)) {
            return null;
        }
        return clientRepository.findByCpf(cpf);
    }

    public String updateClient(String cpf, Client client) {
        if (!clientRepository.existsByCpf(cpf)) {
            return "CPF não encontrado!";
        }

        Client existingClient = clientRepository.findByCpf(cpf);
        existingClient.setName(client.getName());
        existingClient.setEmail(client.getEmail());
        existingClient.setPhone(client.getPhone());
        existingClient.setStreet(client.getStreet());
        existingClient.setDistrict(client.getDistrict());
        existingClient.setNumber(client.getNumber());
        existingClient.setPhone2(client.getPhone2());

        clientRepository.update(existingClient);
        return "Cliente atualizado com sucesso!";
    }

    public String deleteClient(String cpf) {
        if (!clientRepository.existsByCpf(cpf)) {
            return "CPF não encontrado!";
        }
        clientRepository.delete(cpf);
        return "Cliente removido com sucesso!";
    }
}
