package com.cesarschool.coffeeshop.repository;

import com.cesarschool.coffeeshop.domain.OrderItems;
import java.util.List;

public interface OrderItemsRepository {
    List<OrderItems> findByOrderId(int orderId);
    List<OrderItems> findAll();
    int save(OrderItems orderItem);
    int update(OrderItems orderItem);
    int deleteById(int id);
}
