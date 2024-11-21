package com.cesarschool.coffeeshop.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class    OrderEvaluation {
    private int id;
    private LocalDateTime date;
    private int productRating;
    private String productReview;
    private String evaluationType;
}
