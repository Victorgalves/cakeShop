package com.cesarschool.coffeeshop.service;

import com.cesarschool.coffeeshop.domain.OrderEvaluation;
import com.cesarschool.coffeeshop.repository.OrderEvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderEvaluationService {

    @Autowired
    private OrderEvaluationRepository orderEvaluationRepository;

    public ResponseEntity<String> addOrderEvaluation(OrderEvaluation orderEvaluation) {
        orderEvaluationRepository.save(orderEvaluation);
        return ResponseEntity.status(HttpStatus.CREATED).body("Evaluation added successfully!");
    }

    public ResponseEntity<String> getOrderEvaluationById(Integer id) {
        OrderEvaluation orderEvaluation = orderEvaluationRepository.findById(id);

        if (orderEvaluation == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Evaluation not found");
        }

        return ResponseEntity.ok(String.format("Rating: %d - Review: %s", orderEvaluation.getProductRating(), orderEvaluation.getProductReview()));
    }

    public ResponseEntity<String> updateOrderEvaluation(OrderEvaluation orderEvaluation) {
        OrderEvaluation existingEvaluation = orderEvaluationRepository.findById(orderEvaluation.getId());

        if (existingEvaluation == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Evaluation not found");
        }

        orderEvaluationRepository.update(orderEvaluation);
        return ResponseEntity.ok("Evaluation updated");
    }

    public ResponseEntity<String> deleteOrderEvaluation(Integer id) {
        OrderEvaluation orderEvaluation = orderEvaluationRepository.findById(id);

        if (orderEvaluation == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Evaluation not found");
        }

        orderEvaluationRepository.delete(id);
        return ResponseEntity.ok("Evaluation deleted.");
    }

    public ResponseEntity<List<OrderEvaluation>> getAllOrderEvaluations() {
        List<OrderEvaluation> evaluations = orderEvaluationRepository.findAll();
        if (evaluations.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(evaluations);
    }
}
