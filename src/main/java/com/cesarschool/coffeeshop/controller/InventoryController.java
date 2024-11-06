package com.cesarschool.coffeeshop.controller;

import com.cesarschool.coffeeshop.domain.Inventory;
import com.cesarschool.coffeeshop.domain.Product;
import com.cesarschool.coffeeshop.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
public class InventoryController {
    @Autowired
    private InventoryRepository inventoryRepository;

    @GetMapping("/{id}")
    public ResponseEntity<String> getQuantityById(@PathVariable int id) {
        Inventory inventory = inventoryRepository.findById(id);

        if (inventory == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Inventory not found");
        }

        int quantidade = inventory.getQuantity();
        return ResponseEntity.ok("Quantity: " + quantidade);
    }


    @PutMapping("/{id}")
    public ResponseEntity<String> updateInventory(@PathVariable int id, @RequestBody Inventory inventory) {
        Inventory product = inventoryRepository.findById(id);
        if (product == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }
        product.setQuantity(inventory.getQuantity());
        product.setDate(inventory.getDate());
        inventoryRepository.update(product);
        return ResponseEntity.ok("Product updated");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInventory(@PathVariable int id) {
        Inventory product= inventoryRepository.findById(id);
        if (product == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }
        inventoryRepository.delete(id);
        return ResponseEntity.ok("Product deleted.");
    }
    @GetMapping
    public ResponseEntity<List<Inventory>> getAllInventories() {
        List<Inventory> inventories = inventoryRepository.findAll();
        if (inventories.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(inventories);
    }



}
