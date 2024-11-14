package com.cesarschool.coffeeshop.repository;

import com.cesarschool.coffeeshop.domain.Inventory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class InventoryRepositoryImp implements InventoryRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public int save(Inventory inventory) {
        return jdbcTemplate.update(
                "INSERT INTO Estoque (produto_id, dt_atualizacao, quantidade_produto) VALUES (?, ?, ?)",
                inventory.getProductId(), inventory.getDate(), inventory.getQuantity()
        );
    }

    @Override
    public List<Inventory> findAll() {
        String sql = "SELECT e.produto_id, e.quantidade_produto, e.dt_atualizacao, p.nome AS product_name " +
                "FROM Estoque e " +
                "JOIN Produtos p ON e.produto_id = p.id"; // Realizando o JOIN com a tabela Produtos

        return jdbcTemplate.query(sql, new RowMapper<Inventory>() {
            @Override
            public Inventory mapRow(java.sql.ResultSet rs, int rowNum) throws java.sql.SQLException {
                Inventory inventory = new Inventory();
                inventory.setProductId(rs.getInt("produto_id"));
                inventory.setQuantity(rs.getInt("quantidade_produto"));
                inventory.setDate(rs.getDate("dt_atualizacao").toLocalDate());
                inventory.setProductName(rs.getString("product_name"));
                return inventory;
            }
        });
    }


    @Override
    public int update(Inventory inventory, String action, int quantity) {

        Inventory currentInventory = findById(inventory.getProductId());
        if (currentInventory == null) {
            return 0;
        }

        int currentQuantity = currentInventory.getQuantity();
        int newQuantity = currentQuantity;

        switch (action) {
            case "increase":
                newQuantity = currentQuantity + quantity;
                break;
            case "decrease":
                if (currentQuantity - quantity < 0) {
                    return 0;
                }
                newQuantity = currentQuantity - quantity;
                break;
            case "remove":
                newQuantity = 0;
                break;
            default:
                return 0;
        }

        String sql = "UPDATE Estoque SET dt_atualizacao = ?, quantidade_produto = ? WHERE produto_id = ?";
        return jdbcTemplate.update(sql, inventory.getDate(), newQuantity, inventory.getProductId());
    }


    @Override
    public int delete(Integer productId) {
        return jdbcTemplate.update(
                "DELETE FROM Estoque WHERE produto_id = ?",
                productId
        );
    }

    @Override
    public Inventory findById(Integer id) {
        String sql = "SELECT * FROM Estoque WHERE produto_id = ?";
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{id}, (rs, rowNum) -> {
                Inventory inventory = new Inventory();
                inventory.setProductId(rs.getInt("produto_id"));
                inventory.setQuantity(rs.getInt("quantidade_produto"));
                inventory.setDate(rs.getDate("dt_atualizacao").toLocalDate());
                return inventory;
            });
        }catch (EmptyResultDataAccessException e) {
            return null;         }
    }

}


