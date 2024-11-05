package com.cesarschool.coffeeshop.controller;

import com.cesarschool.coffeeshop.domain.OrderItems;
import com.cesarschool.coffeeshop.repository.OrderItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orderItems")
public class OrderItemsController {

    private final OrderItemsRepository orderItemsRepository;

    @Autowired
    public OrderItemsController(OrderItemsRepository orderItemsRepository) {
        this.orderItemsRepository = orderItemsRepository;
    }


    @GetMapping()
    public ResponseEntity<List<OrderItems>> findAll() {
        List<OrderItems> orderItems = orderItemsRepository.findAll();
        return new ResponseEntity<>(orderItems, HttpStatus.OK);
    }

    @GetMapping("/order/{idOrder}")
    public ResponseEntity<List<OrderItems>> getOrderItemsByOrderId(@PathVariable int idOrder) {
        List<OrderItems> items = orderItemsRepository.findByOrderId(idOrder);
        if (items.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(items);
    }



    @PostMapping
    public ResponseEntity<String> addOrderItem(@RequestBody OrderItems orderItem) {
        int rowsAffected = orderItemsRepository.save(orderItem);
        if (rowsAffected > 0) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Item de pedido criado com sucesso!");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Falha ao criar item de pedido.");
    }

    @PutMapping("{orderId}")
    public ResponseEntity<String> updateOrderItem(
            @PathVariable("orderId") int orderId,
            @RequestBody OrderItems orderItem) {

        // Define o ID do pedido no item para assegurar que ele pertence ao pedido correto
        orderItem.setOrderId(orderId);

        int rowsAffected = orderItemsRepository.update(orderItem);
        if (rowsAffected > 0) {
            return ResponseEntity.ok("Item de pedido atualizado com sucesso!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item de pedido não encontrado.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrderItem(@PathVariable int id) {
        int rowsAffected = orderItemsRepository.deleteById(id);
        if (rowsAffected > 0) {
            return ResponseEntity.ok("Item de pedido excluído com sucesso!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item de pedido não encontrado.");
    }
}
