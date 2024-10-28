package com.cesarschool.coffeeshop.domain;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Client {
    private String cpf;
    private String name;
    private String email;
    private String phone;
    private String address;
}
