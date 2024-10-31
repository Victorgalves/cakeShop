package com.cesarschool.coffeeshop.repository;

import com.cesarschool.coffeeshop.domain.Order;

import java.util.List;
import java.util.Optional;

public interface OrderRepository {
    int save(Order order);
    int deleteById(int idOrder);
    Optional<Order> findById(int idOrder);
    List<Order> findAll();
}
