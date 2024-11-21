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

    @GetMapping("/{id}")
    public ResponseEntity<String> getOrderEvaluationById(@PathVariable Integer id) {
        return orderEvaluationService.getOrderEvaluationById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateOrderEvaluation(@PathVariable Integer id, @RequestBody OrderEvaluation updatedOrderEvaluation) {
        updatedOrderEvaluation.setId(id);
        return orderEvaluationService.updateOrderEvaluation(updatedOrderEvaluation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrderEvaluation(@PathVariable Integer id) {
        return orderEvaluationService.deleteOrderEvaluation(id);
    }

    @GetMapping
    public ResponseEntity<List<OrderEvaluation>> getAllOrderEvaluations() {
        return orderEvaluationService.getAllOrderEvaluations();
    }
}
