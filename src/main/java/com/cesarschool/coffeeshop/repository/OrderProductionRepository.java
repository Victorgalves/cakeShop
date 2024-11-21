package com.cesarschool.coffeeshop.repository;

import com.cesarschool.coffeeshop.domain.OrderProduction;
import java.util.List;

public interface OrderProductionRepository {
    List<OrderProduction> findAll();
    List<OrderProduction> findByOrderId(int idOrder);
    void save(OrderProduction orderProduction);
    void update(OrderProduction orderProduction);
    void delete(int id);
}
