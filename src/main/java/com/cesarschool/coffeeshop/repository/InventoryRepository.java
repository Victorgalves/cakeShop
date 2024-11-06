package com.cesarschool.coffeeshop.repository;

import com.cesarschool.coffeeshop.domain.Inventory;
import com.cesarschool.coffeeshop.domain.Product;
import java.util.List;
import java.util.Optional;

public interface InventoryRepository {

    Inventory findById(Integer id);
    List<Inventory> findAll();
    int save(Inventory inventory);
    int update(Inventory inventory);
    int delete(Integer id);
}
