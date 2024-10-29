package com.cesarschool.coffeeshop.repository;

import com.cesarschool.coffeeshop.domain.Inventory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public class InventoryRepositoryImp implements InventoryRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<Inventory> inventoryRowMapper = new RowMapper<>() {
        @Override
        public Inventory mapRow(ResultSet rs, int rowNum) throws SQLException {
            Inventory inventory = new Inventory();
            inventory.setProductId(rs.getInt("productId"));
            inventory.setDate(rs.getDate("date").toLocalDate());
            inventory.setQuantity(rs.getInt("quantity"));
            return inventory;
        }
    };

    @Override
    public int save(Inventory inventory) {
        return jdbcTemplate.update(
                "INSERT INTO inventory (productId, date, quantity) VALUES (?, ?, ?)",
                inventory.getProductId(), inventory.getDate(), inventory.getQuantity()
        );
    }

    @Override
    public int update(Inventory inventory) {
        return jdbcTemplate.update(
                "UPDATE inventory SET date = ?, quantity = ? WHERE productId = ?",
                inventory.getDate(), inventory.getQuantity(), inventory.getProductId()
        );
    }

    @Override
    public int delete(Integer productId) {
        return jdbcTemplate.update(
                "DELETE FROM inventory WHERE productId = ?",
                productId
        );
    }

    @Override
    public Optional<Inventory> findByProductId(int productId) {
        return jdbcTemplate.query(
                "SELECT * FROM inventory WHERE productId = ?",
                new Object[]{productId},
                inventoryRowMapper
        ).stream().findFirst();
    }
}
