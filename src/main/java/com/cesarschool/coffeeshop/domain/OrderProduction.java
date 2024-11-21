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
public class OrderProduction {
    private int idOrderProduction;
    private String employeeCpf;
    private LocalDateTime productionTime;
    private String status;
    private int idOrder;
    private int idProduct;
    private int quantity;
}
