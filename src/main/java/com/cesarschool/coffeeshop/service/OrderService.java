package com.cesarschool.coffeeshop.service;

import com.cesarschool.coffeeshop.domain.Order;
import com.cesarschool.coffeeshop.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(int id) {
        return orderRepository.findById(id);
    }

    public Order createOrder(Order order) {
        orderRepository.save(order);
        return order;
    }

    public boolean deleteOrder(int id) {
        if (orderRepository.findById(id).isPresent()) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
