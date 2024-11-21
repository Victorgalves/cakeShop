package com.cesarschool.coffeeshop.repository;

import com.cesarschool.coffeeshop.domain.OrderEvaluation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class OrderEvaluationRepositoryImp implements OrderEvaluationRepository {

    @Autowired
    private final JdbcTemplate jdbcTemplate;

    public OrderEvaluationRepositoryImp(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int save(OrderEvaluation orderEvaluation) {
        if (orderEvaluation.getDate() == null) {
            orderEvaluation.setDate(LocalDateTime.now());
        }
        String sql = "INSERT INTO Avaliacao (id, data, nota, mensagem, tipo_avaliacao) VALUES (?, ?, ?, ?, ?)";
        return jdbcTemplate.update(
                sql,
                orderEvaluation.getId(),
                orderEvaluation.getDate(),
                orderEvaluation.getProductRating(),
                orderEvaluation.getProductReview(),
                orderEvaluation.getEvaluationType()
        );
    }

    @Override
    public int update(OrderEvaluation orderEvaluation) {
        return jdbcTemplate.update(
                "UPDATE Avaliacao SET data = ?, nota = ?, mensagem = ?, tipo_avaliacao = ? WHERE id = ?",
                orderEvaluation.getDate(),
                orderEvaluation.getProductRating(),
                orderEvaluation.getProductReview(),
                orderEvaluation.getEvaluationType(),
                orderEvaluation.getId()
        );
    }

    @Override
    public int delete(Integer id) {
        return jdbcTemplate.update(
                "DELETE FROM Avaliacao WHERE id = ?",
                id
        );
    }

    @Override
    public OrderEvaluation findById(Integer id) {
        String sql = "SELECT * FROM Avaliacao WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, (rs, rowNum) -> {
            OrderEvaluation orderEvaluation = new OrderEvaluation();
            orderEvaluation.setId(rs.getInt("id"));
            orderEvaluation.setDate(rs.getTimestamp("data").toLocalDateTime());
            orderEvaluation.setProductRating(rs.getInt("nota"));
            orderEvaluation.setProductReview(rs.getString("mensagem"));
            orderEvaluation.setEvaluationType(rs.getString("tipo_avaliacao"));
            return orderEvaluation;
        });
    }

    @Override
    public List<OrderEvaluation> findAll() {
        String sql = "SELECT * FROM Avaliacao";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            OrderEvaluation orderEvaluation = new OrderEvaluation();
            orderEvaluation.setId(rs.getInt("id"));
            orderEvaluation.setDate(rs.getTimestamp("data").toLocalDateTime());
            orderEvaluation.setProductRating(rs.getInt("nota"));
            orderEvaluation.setProductReview(rs.getString("mensagem"));
            orderEvaluation.setEvaluationType(rs.getString("tipo_avaliacao"));
            return orderEvaluation;
        });
    }
}
