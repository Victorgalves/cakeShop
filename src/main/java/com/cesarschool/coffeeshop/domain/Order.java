package com.cesarschool.coffeeshop.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.LocalTime;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Order {
    private int idOrder;
    private int idProduct;
    private String employeeCpf;
    private String clientCpf;
    private LocalDateTime orderTime;
}
