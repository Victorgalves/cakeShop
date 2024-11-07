package com.cesarschool.coffeeshop.controller;

import com.cesarschool.coffeeshop.domain.OrderEvaluation;
import com.cesarschool.coffeeshop.repository.OrderEvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/orderevaluation")

public class OrderEvaluationController {

    @Autowired
    private OrderEvaluationRepository orderEvaluationRepository;

    @PostMapping("/{idOrder}")
    public ResponseEntity<String> addOrderEvaluation(@RequestBody OrderEvaluation orderEvaluation) {
        orderEvaluationRepository.save(orderEvaluation);
        return ResponseEntity.status(HttpStatus.CREATED).body("Evaluation added successfully!");
    }

    @GetMapping("/{idOrder}/{clientCpf}")
    public ResponseEntity<String> getIdOrderEvaluation(@PathVariable Integer idOrder, @PathVariable String clientCpf) {
        OrderEvaluation orderEvaluation = orderEvaluationRepository.find(idOrder, clientCpf);

        if (orderEvaluation == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Evaluation not found");
        }

        float nota = orderEvaluation.getProductRating();
        String mensagem = orderEvaluation.getProductReview();
        return ResponseEntity.ok(String.format("Rating: %f - Review: %s", nota, mensagem));
    }


    @PutMapping("/{idOrder}/{clientCpf}")
    public ResponseEntity<String> updateOrderEvaluation(@PathVariable Integer idOrder, @PathVariable String clientCpf) {
        OrderEvaluation orderEvaluation = orderEvaluationRepository.find(idOrder, clientCpf);
        if (orderEvaluation == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Evaluation not found");
        }
        orderEvaluation.setDate(orderEvaluation.getDate());
        orderEvaluation.setProductRating(orderEvaluation.getProductRating());
        orderEvaluation.setProductReview(orderEvaluation.getProductReview());
        orderEvaluation.setIdOrder(orderEvaluation.getIdOrder());
        orderEvaluation.setClientCpf(orderEvaluation.getClientCpf());
        orderEvaluationRepository.update(orderEvaluation);
        return ResponseEntity.ok("Evaluation updated");
    }

    @DeleteMapping("/{idOrder}/{clientCpf}")
    public ResponseEntity<String> deleteOrderEvaluation(@PathVariable Integer idOrder, @PathVariable String clientCpf) {
        OrderEvaluation orderEvaluation = orderEvaluationRepository.find(idOrder, clientCpf);
        if (orderEvaluation == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Evaluation not found");
        }
        orderEvaluationRepository.delete(idOrder, clientCpf);
        return ResponseEntity.ok("Evaluation deleted.");
    }



}

