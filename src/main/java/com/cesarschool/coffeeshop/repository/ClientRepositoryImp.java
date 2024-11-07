package com.cesarschool.coffeeshop.repository;

import com.cesarschool.coffeeshop.domain.Client;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public  class ClientRepositoryImp implements ClientRepository {

    private final JdbcTemplate jdbcTemplate;
    public ClientRepositoryImp(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate;}

    @Override
    public int save(Client client) {
        return jdbcTemplate.update(
                "INSERT INTO Cliente (cpf, nome, email, telefone, rua, bairro, numero) VALUES(?,?,?,?,?,?,?)",
                client.getCpf(), client.getName(),client.getEmail(), client.getPhone(), client.getStreet(), client.getDistrict(), client.getNumber()
        );
    }

    @Override
    public int update(Client client) {
        return jdbcTemplate.update(
                "UPDATE Cliente SET cpf = ?, nome = ?, email = ?, telefone = ?, rua=?, bairro=?, numero=? WHERE cpf = ?",
                client.getCpf(), client.getName(),client.getEmail(), client.getPhone(), client.getStreet(), client.getDistrict(), client.getNumber()
        );
    }

    @Override
    public int delete(String cpf) {
        return jdbcTemplate.update(
                "DELETE FROM Cliente WHERE cpf = ?", cpf
        );
    }

    @Override
    public Client findByCpf(String cpf) {
        return jdbcTemplate.queryForObject("SELECT * FROM Cliente WHERE cpf=?", new Object[]{cpf},  (rs, rowNum) -> {
            Client client = new Client();
            client.setCpf(rs.getString("cpf"));
            client.setName(rs.getString("nome"));
            client.setEmail(rs.getString("email"));
            client.setPhone(rs.getString("telefone"));
            client.setStreet(rs.getString("rua"));
            client.setDistrict(rs.getString("bairro"));
            client.setNumber(rs.getString("numero"));
            return client;
        });
    }

    @Override
    public List<Client> findAll() {
        return jdbcTemplate.query("SELECT * FROM Cliente", (rs, rowNum) -> {
            Client client = new Client();
            client.setCpf(rs.getString("cpf"));
            client.setName(rs.getString("nome"));
            client.setEmail(rs.getString("email"));
            client.setPhone(rs.getString("telefone"));
            client.setStreet(rs.getString("rua"));
            client.setDistrict(rs.getString("bairro"));
            client.setNumber(rs.getString("numero"));
            return client;
        });
    }

    @Override
    public boolean existsByCpf(String cpf) {
        String sql = "SELECT COUNT(*) FROM Cliente WHERE cpf = ?";
        Integer count = jdbcTemplate.queryForObject(sql, new Object[]{cpf}, Integer.class);
        return count != null && count > 0;
    }
}