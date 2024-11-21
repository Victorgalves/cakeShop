package com.cesarschool.coffeeshop.service;

import com.cesarschool.coffeeshop.domain.OrderItems;
import com.cesarschool.coffeeshop.domain.OrderProduction;
import com.cesarschool.coffeeshop.repository.OrderItemsRepository;
import com.cesarschool.coffeeshop.repository.OrderProductionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderItemsService {

    private final OrderItemsRepository orderItemsRepository;
    private final OrderProductionRepository orderProductionRepository;

    @Autowired
    public OrderItemsService(OrderItemsRepository orderItemsRepository, OrderProductionRepository orderProductionRepository) {
        this.orderItemsRepository = orderItemsRepository;
        this.orderProductionRepository = orderProductionRepository;
    }

    public List<OrderItems> getAllOrderItems() {
        return orderItemsRepository.findAll();
    }

    public List<OrderItems> getOrderItemsByOrderId(int orderId) {
        return orderItemsRepository.findByOrderId(orderId);
    }


    public String addOrderItem(OrderItems orderItem) {
        int rowsAffected = orderItemsRepository.save(orderItem);
        if (rowsAffected > 0) {
            OrderProduction orderProduction = new OrderProduction();
            orderProduction.setIdOrder(orderItem.getOrderId());
            orderProduction.setIdProduct(orderItem.getIdProduct());
            orderProduction.setStatus("Pendente");
            orderProduction.setProductionTime(LocalDateTime.now());
            orderProductionRepository.save(orderProduction);

            return "Item de pedido criado com sucesso e enviado para produção!";
        }
        return "Falha ao criar item de pedido.";
    }

    public String updateOrderItem(OrderItems orderItem) {
        int rowsAffected = orderItemsRepository.update(orderItem);
        if (rowsAffected > 0) {
            return "Item de pedido atualizado com sucesso!";
        }
        return "Item de pedido não encontrado.";
    }

    public String deleteOrderItem(int id) {
        int rowsAffected = orderItemsRepository.deleteById(id);
        if (rowsAffected > 0) {
            return "Item de pedido excluído com sucesso!";
        }
        return "Item de pedido não encontrado.";
    }
}
