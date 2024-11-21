package com.cesarschool.coffeeshop.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    private String name;
    private String cpf;
    private Double salary;
    private String position;
    private Date hiringDate;
    private String isManager;

}
