package com.cesarschool.coffeeshop.domain;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    private int id;
    private String name;
    private String description;
    private double price;
    private String category;
}
