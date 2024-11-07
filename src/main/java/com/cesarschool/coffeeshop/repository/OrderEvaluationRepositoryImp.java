package com.cesarschool.coffeeshop.repository;

import com.cesarschool.coffeeshop.domain.OrderEvaluation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


@Repository
public class OrderEvaluationRepositoryImp implements OrderEvaluationRepository {

    @Autowired
    private final JdbcTemplate jdbcTemplate;
    public OrderEvaluationRepositoryImp(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate;}

    @Override
    public int save(OrderEvaluation orderEvaluation) {
        String sql = "INSERT INTO Avaliacao (id, data, nota, mensagem, pedido_id, cliente_cpf) VALUES (?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql, orderEvaluation.getId(), orderEvaluation.getDate(), orderEvaluation.getProductRating(), orderEvaluation.getProductReview(), orderEvaluation.getIdOrder(), orderEvaluation.getClientCpf()
        );
    }


    @Override
    public int update(OrderEvaluation orderEvaluation) {
        return jdbcTemplate.update(
                "UPDATE Avaliacao SET data = ?, nota = ?, mensagem = ? WHERE produto_id = ? AND cliente_cpf = ?",
                orderEvaluation.getDate(), orderEvaluation.getProductRating(), orderEvaluation.getProductReview()
        );
    }

    @Override
    public int delete(Integer idOrder, String clientCpf) {
        return jdbcTemplate.update(
                "DELETE FROM Avaliacao WHERE pedido_id = ? AND cliente_cpf =?",
                idOrder, clientCpf
        );
    }

    @Override
    public OrderEvaluation find(Integer idOrder, String clientCpf) {
        return jdbcTemplate.queryForObject("SELECT * FROM Avaliacao WHERE pedido_id = ? AND cliente_cpf =?", new Object[]{idOrder, clientCpf}, (rs, rowNum) -> {
            OrderEvaluation orderEvaluation = new OrderEvaluation();
            orderEvaluation.setDate(rs.getDate("data").toLocalDate());
            orderEvaluation.setProductRating(rs.getInt("nota"));
            orderEvaluation.setProductReview(rs.getString("mensagem"));
            orderEvaluation.setIdOrder(rs.getInt("pedido_id"));
            orderEvaluation.setClientCpf(rs.getString("cliente_cpf"));
            return orderEvaluation;
        });
    }
}