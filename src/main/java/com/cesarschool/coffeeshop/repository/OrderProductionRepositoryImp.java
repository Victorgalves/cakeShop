package com.cesarschool.coffeeshop.repository;
import com.cesarschool.coffeeshop.domain.OrderProduction;
import com.cesarschool.coffeeshop.repository.OrderProductionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class OrderProductionRepositoryImp implements OrderProductionRepository {

    private final JdbcTemplate jdbcTemplate;

    public OrderProductionRepositoryImp(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }



    private RowMapper<OrderProduction> rowMapper = (rs, rowNum) -> new OrderProduction(
            rs.getInt("idProducao"),
            rs.getString("funcionario_cpf"),
            rs.getObject("dataHora", LocalDateTime.class),
            rs.getString("status"),
            rs.getInt("pedido_id"),
            rs.getInt("produto_id")
    );

    @Override
    public List<OrderProduction> findAll() {
        String sql = "SELECT * FROM Producao_pedido";
        return jdbcTemplate.query(sql, rowMapper);
    }

    @Override
    public List<OrderProduction> findByOrderId(int idOrder) {
        String sql = "SELECT * FROM Producao_pedido WHERE pedido_id = ?";
        return jdbcTemplate.query(sql, new Object[]{idOrder}, rowMapper);
    }


    @Override
    public void save(OrderProduction orderProduction) {
        String sql = "INSERT INTO Producao_pedido (funcionario_cpf, dataHora, status, pedido_id, produto_id) " +
                "VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, orderProduction.getEmployeeCpf(), orderProduction.getProductionTime(),
                orderProduction.getStatus(), orderProduction.getIdOrder(), orderProduction.getIdProduct());
    }

    @Override
    public void update(OrderProduction orderProduction) {
        String sql = "UPDATE Producao_pedido SET status = ? WHERE pedido_id = ?";
        jdbcTemplate.update(sql, orderProduction.getStatus(), orderProduction.getIdOrder());
    }


    @Override
    public void delete(int id) {
        String sql = "DELETE FROM Producao_pedido WHERE idProducao = ?";
        jdbcTemplate.update(sql, id);
    }
}
