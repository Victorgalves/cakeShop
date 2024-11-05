package com.cesarschool.coffeeshop.repository;

import com.cesarschool.coffeeshop.domain.OrderItems;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class OrderItemsRepositoryImp implements OrderItemsRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public OrderItemsRepositoryImp(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }



    @Override
    public List<OrderItems> findByOrderId(int orderId) {
        String sql = "SELECT * FROM ItensPedido WHERE pedido_id = ?";
        return jdbcTemplate.query(sql, new Object[]{orderId}, new OrderItemsRowMapper());
    }

    @Override
    public List<OrderItems> findAll() {
        String sql = "SELECT * FROM ItensPedido";
        return jdbcTemplate.query(sql, new OrderItemsRowMapper());
    }

    @Override
    public int save(OrderItems orderItem) {
        String getPriceSql = "SELECT preco FROM Produtos WHERE id = ?";
        Double price = jdbcTemplate.queryForObject(getPriceSql, new Object[]{orderItem.getIdProduct()}, Double.class);
        orderItem.setPrice(price);
        String insertSql = "INSERT INTO ItensPedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)";
        return jdbcTemplate.update(insertSql, orderItem.getOrderId(), orderItem.getIdProduct(), orderItem.getQuantity(), orderItem.getPrice());
    }


    @Override
    public int update(OrderItems orderItem) {
        String sql = "UPDATE ItensPedido SET quantidade = ?, preco_unitario = ? WHERE id = ? AND pedido_id = ?";
        return jdbcTemplate.update(sql, orderItem.getQuantity(), orderItem.getPrice(), orderItem.getIdOrderItems(), orderItem.getOrderId());
    }


    @Override
    public int deleteById(int id) {
        String sql = "DELETE FROM ItensPedido WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

    private static class OrderItemsRowMapper implements RowMapper<OrderItems> {
        @Override
        public OrderItems mapRow(ResultSet rs, int rowNum) throws SQLException {
            OrderItems orderItem = new OrderItems();
            orderItem.setIdOrderItems(rs.getInt("id"));
            orderItem.setOrderId(rs.getInt("pedido_id"));
            orderItem.setIdProduct(rs.getInt("produto_id"));
            orderItem.setQuantity(rs.getInt("quantidade"));
            orderItem.setPrice(rs.getDouble("preco_unitario"));
            return orderItem;
        }
    }
}
