package com.cesarschool.coffeeshop.controller;

import com.cesarschool.coffeeshop.domain.OrderItems;
import com.cesarschool.coffeeshop.service.OrderItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orderItems")
public class OrderItemsController {

    private final OrderItemsService orderItemsService;

    @Autowired
    public OrderItemsController(OrderItemsService orderItemsService) {
        this.orderItemsService = orderItemsService;
    }

    @GetMapping
    public ResponseEntity<List<OrderItems>> findAll() {
        List<OrderItems> orderItems = orderItemsService.getAllOrderItems();
        return new ResponseEntity<>(orderItems, HttpStatus.OK);
    }

    @GetMapping("/{idOrder}")
    public ResponseEntity<List<OrderItems>> getOrderItemsByOrderId(@PathVariable int idOrder) {
        List<OrderItems> items = orderItemsService.getOrderItemsByOrderId(idOrder);
        if (items.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(items);
    }

    @PostMapping
    public ResponseEntity<String> addOrderItem(@RequestBody OrderItems orderItem) {
        String result = orderItemsService.addOrderItem(orderItem);
        if (result.contains("sucesso")) {
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
    }

    @PutMapping("/{orderId}/{itemId}")
    public ResponseEntity<String> updateOrderItem(
            @PathVariable("orderId") int orderId,
            @PathVariable("itemId") int itemId,
            @RequestBody OrderItems orderItem) {
        orderItem.setOrderId(orderId);
        orderItem.setIdOrderItems(itemId);  // Garante que o ID do item é passado para a atualização

        String result = orderItemsService.updateOrderItem(orderItem);
        if (result.contains("sucesso")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrderItem(@PathVariable int id) {
        String result = orderItemsService.deleteOrderItem(id);
        if (result.contains("sucesso")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
    }
}
