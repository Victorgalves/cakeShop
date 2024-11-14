package com.cesarschool.coffeeshop.repository;

import com.cesarschool.coffeeshop.domain.OrderEvaluation;

import java.util.List;

public interface OrderEvaluationRepository {

    OrderEvaluation findByOrderId(Integer idOrder);
    List<OrderEvaluation> findAll();
    int save(OrderEvaluation orderEvaluation);
    int update(OrderEvaluation orderEvaluation);
    int delete(Integer idOrder, String clientCpf);

}
