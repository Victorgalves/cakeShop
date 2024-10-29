package com.cesarschool.coffeeshop.repository;

import com.cesarschool.coffeeshop.domain.Inventory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


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
    public int update(Inventory inventory) {
        return jdbcTemplate.update(
                "UPDATE Estoque SET dt_atualizacao = ?, quantidade_produto = ? WHERE produto_id = ?",
                inventory.getDate(), inventory.getQuantity(), inventory.getProductId()
        );
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
