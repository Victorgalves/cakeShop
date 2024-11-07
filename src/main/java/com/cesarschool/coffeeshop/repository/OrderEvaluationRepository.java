package com.cesarschool.coffeeshop.repository;

import com.cesarschool.coffeeshop.domain.OrderEvaluation;

public interface OrderEvaluationRepository {

    OrderEvaluation find(Integer idOrder, String clientCpf);
    int save(OrderEvaluation orderEvaluation);
    int update(OrderEvaluation orderEvaluation);
    int delete(Integer idOrder, String clientCpf);

}
