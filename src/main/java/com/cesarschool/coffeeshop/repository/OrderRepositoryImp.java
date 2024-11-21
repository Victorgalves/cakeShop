package com.cesarschool.coffeeshop.repository;

import com.cesarschool.coffeeshop.domain.Order;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public class OrderRepositoryImp implements OrderRepository {

    private final JdbcTemplate jdbcTemplate;

    public OrderRepositoryImp(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static final RowMapper<Order> ORDER_ROW_MAPPER = new RowMapper<Order>() {
        @Override
        public Order mapRow(ResultSet rs, int rowNum) throws SQLException {
            Order order = new Order();
            order.setIdOrder(rs.getInt("id"));
            order.setEmployeeCpf(rs.getString("funcionario_cpf"));
            order.setClientCpf(rs.getString("cliente_cpf"));
            java.sql.Timestamp timestamp = rs.getTimestamp("dataHora");
            order.setOrderTime(timestamp != null ? timestamp.toLocalDateTime() : null);
            return order;
        }
    };

    @Override
    public Order save(Order order) {
        if (order.getOrderTime() == null) {
            order.setOrderTime(LocalDateTime.now());
        }
        String sql = "INSERT INTO Pedidos (funcionario_cpf, cliente_cpf, dataHora) VALUES (?, ?, ?)";
        int rowsAffected = jdbcTemplate.update(sql, order.getEmployeeCpf(), order.getClientCpf(), order.getOrderTime());

        if (rowsAffected > 0) {
            String getIdSql = "SELECT LAST_INSERT_ID()";
            Integer id = jdbcTemplate.queryForObject(getIdSql, Integer.class);

            if (id != null) {
                order.setIdOrder(id);
                return order;
            } else {
                throw new RuntimeException("Não foi possível recuperar o ID do pedido.");
            }
        } else {
            throw new RuntimeException("Falha ao inserir o pedido no banco.");
        }
    }

    @Override
    public int deleteById(int idOrder) {
        String sql = "DELETE FROM Pedidos WHERE id = ?";
        return jdbcTemplate.update(sql, idOrder);
    }

    @Override
    public Optional<Order> findById(int idOrder) {
        String sql = "SELECT * FROM Pedidos WHERE id = ?";
        return jdbcTemplate.query(sql, ORDER_ROW_MAPPER, idOrder).stream().findFirst();
    }

    @Override
    public List<Order> findAll() {
        String sql = "SELECT * FROM Pedidos";
        return jdbcTemplate.query(sql, ORDER_ROW_MAPPER);
    }
}
