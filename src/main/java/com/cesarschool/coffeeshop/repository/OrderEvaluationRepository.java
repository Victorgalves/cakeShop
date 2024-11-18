package com.cesarschool.coffeeshop.repository;

import com.cesarschool.coffeeshop.domain.OrderEvaluation;
import java.util.List;

public interface OrderEvaluationRepository {

    List<OrderEvaluation> findAll();
    int save(OrderEvaluation orderEvaluation);
    int update(OrderEvaluation orderEvaluation);
    int delete(Integer id);
    OrderEvaluation findById(Integer id);
}
