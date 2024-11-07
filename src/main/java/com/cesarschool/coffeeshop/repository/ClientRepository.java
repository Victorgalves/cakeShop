package com.cesarschool.coffeeshop.repository;

import com.cesarschool.coffeeshop.domain.Client;

import java.util.List;

public interface ClientRepository {
    int save(Client client);
    int update(Client client);
    int delete(String cpf);
    Client findByCpf(String cpf);
    List<Client> findAll();
    boolean existsByCpf(String cpf);
}
