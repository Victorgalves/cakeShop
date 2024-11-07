package com.cesarschool.coffeeshop.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class OrderEvaluation {
    private int id;
    private LocalDate date;
    private int productRating;
    private String productReview;
    private int idOrder;
    private String clientCpf;
}
