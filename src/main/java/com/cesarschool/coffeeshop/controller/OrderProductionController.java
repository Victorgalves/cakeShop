package com.cesarschool.coffeeshop.controller;

import com.cesarschool.coffeeshop.domain.OrderProduction;
import com.cesarschool.coffeeshop.repository.OrderProductionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orderProduction")
public class OrderProductionController {

    @Autowired
    private final OrderProductionRepository orderProductionRepository;

    public OrderProductionController(OrderProductionRepository orderProductionRepository) {
        this.orderProductionRepository = orderProductionRepository;
    }
    @GetMapping
    public ResponseEntity<List<OrderProduction>> findAll() {
        List<OrderProduction> orderProductions = orderProductionRepository.findAll();
        return new ResponseEntity<>(orderProductions, HttpStatus.OK);
    }

    @GetMapping("/{idOrder}")
    public List<OrderProduction> getOrderProductionsByOrderId(@PathVariable int idOrder) {
        return orderProductionRepository.findByOrderId(idOrder);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createOrderProduction(@RequestBody OrderProduction orderProduction) {
        orderProductionRepository.save(orderProduction);
    }

    @PutMapping("/status/{idOrder}")
    public void updateOrderProductionStatusByOrderId(@PathVariable int idOrder, @RequestBody String status) {
        List<OrderProduction> orderProductions = orderProductionRepository.findByOrderId(idOrder);

        if (!orderProductions.isEmpty()) {
            orderProductions.forEach(orderProduction -> {
                orderProduction.setStatus(status);
                orderProductionRepository.update(orderProduction);
            });
        }
    }

    @DeleteMapping("/{id}")
    public void deleteOrderProduction(@PathVariable int id) {
        orderProductionRepository.delete(id);
    }
}
