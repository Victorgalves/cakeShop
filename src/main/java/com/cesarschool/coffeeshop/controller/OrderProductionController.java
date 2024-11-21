package com.cesarschool.coffeeshop.controller;

import com.cesarschool.coffeeshop.domain.OrderProduction;
import com.cesarschool.coffeeshop.service.OrderProductionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orderProduction")
public class OrderProductionController {

    private final OrderProductionService orderProductionService;

    @Autowired
    public OrderProductionController(OrderProductionService orderProductionService) {
        this.orderProductionService = orderProductionService;
    }

    @GetMapping
    public ResponseEntity<List<OrderProduction>> findAll() {
        List<OrderProduction> orderProductions = orderProductionService.getAllOrderProductions();
        return new ResponseEntity<>(orderProductions, HttpStatus.OK);
    }

    @GetMapping("/{idOrder}")
    public ResponseEntity<List<OrderProduction>> getOrderProductionsByOrderId(@PathVariable int idOrder) {
        List<OrderProduction> orderProductions = orderProductionService.getOrderProductionsByOrderId(idOrder);
        if (orderProductions.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(orderProductions);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createOrderProduction(@RequestBody OrderProduction orderProduction) {
        orderProductionService.createOrderProduction(orderProduction);
    }

    @PutMapping("/status/{idOrder}")
    public ResponseEntity<String> updateOrderProductionStatusByOrderId(@PathVariable int idOrder, @RequestBody String status) {
        orderProductionService.updateOrderProductionStatus(idOrder, status);
        return ResponseEntity.ok("Status da produção de pedido atualizado com sucesso!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrderProduction(@PathVariable int id) {
        orderProductionService.deleteOrderProduction(id);
        return ResponseEntity.ok("Produção de pedido excluída com sucesso!");
    }
}
