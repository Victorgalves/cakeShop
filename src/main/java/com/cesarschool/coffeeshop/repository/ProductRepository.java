package com.cesarschool.coffeeshop.repository;

import com.cesarschool.coffeeshop.domain.Product;

import java.util.List;

public interface ProductRepository {
        Product findById(Integer id);
        List<Product> findAll();
        void save(Product product, int initialQuantity);
        void update(Product product);
        void delete(Integer id);
    }

