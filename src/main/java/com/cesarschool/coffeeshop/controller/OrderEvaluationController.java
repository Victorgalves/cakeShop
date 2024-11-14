package com.cesarschool.coffeeshop.controller;

import com.cesarschool.coffeeshop.domain.OrderEvaluation;
import com.cesarschool.coffeeshop.service.OrderEvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orderEvaluation")
public class OrderEvaluationController {

    @Autowired
    private OrderEvaluationService orderEvaluationService;

    @PostMapping
    public ResponseEntity<String> addOrderEvaluation(@RequestBody OrderEvaluation orderEvaluation) {
        return orderEvaluationService.addOrderEvaluation(orderEvaluation);
    }

    @GetMapping("/{idOrder}")
    public ResponseEntity<String> getOrderEvaluationById(@PathVariable Integer idOrder) {
        return orderEvaluationService.getOrderEvaluationById(idOrder);
    }

    @PutMapping("/{idOrder}")
    public ResponseEntity<String> updateOrderEvaluation(@PathVariable Integer idOrder, @RequestBody OrderEvaluation updatedOrderEvaluation) {
        updatedOrderEvaluation.setIdOrder(idOrder); // Garantir que o idOrder é setado no objeto
        return orderEvaluationService.updateOrderEvaluation(updatedOrderEvaluation);
    }

    @DeleteMapping("/{idOrder}/{clientCpf}")
    public ResponseEntity<String> deleteOrderEvaluation(@PathVariable Integer idOrder, @PathVariable String clientCpf) {
        return orderEvaluationService.deleteOrderEvaluation(idOrder, clientCpf);
    }

    @GetMapping
    public ResponseEntity<List<OrderEvaluation>> getAllOrderEvaluations() {
        return orderEvaluationService.getAllOrderEvaluations();
    }
}
