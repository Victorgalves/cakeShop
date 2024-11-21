package com.cesarschool.coffeeshop.service;

import com.cesarschool.coffeeshop.domain.OrderProduction;
import com.cesarschool.coffeeshop.repository.OrderProductionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderProductionService {

    private final OrderProductionRepository orderProductionRepository;

    @Autowired
    public OrderProductionService(OrderProductionRepository orderProductionRepository) {
        this.orderProductionRepository = orderProductionRepository;
    }

    public List<OrderProduction> getAllOrderProductions() {
        return orderProductionRepository.findAll();
    }

    public List<OrderProduction> getOrderProductionsByOrderId(int idOrder) {
        return orderProductionRepository.findByOrderId(idOrder);
    }

    public void createOrderProduction(OrderProduction orderProduction) {
        orderProductionRepository.save(orderProduction);
    }

    public void updateOrderProductionStatus(int idOrder, String status) {
        List<OrderProduction> orderProductions = orderProductionRepository.findByOrderId(idOrder);
        if (!orderProductions.isEmpty()) {
            orderProductions.forEach(orderProduction -> {
                orderProduction.setStatus(status);
                orderProductionRepository.update(orderProduction);
            });
        }
    }

    public void deleteOrderProduction(int id) {
        orderProductionRepository.delete(id);
    }
}
