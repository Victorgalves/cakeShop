package com.cesarschool.coffeeshop.service;

import com.cesarschool.coffeeshop.domain.Inventory;
import com.cesarschool.coffeeshop.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    public ResponseEntity<String> getQuantityById(int id) {
        Inventory inventory = inventoryRepository.findById(id);
        if (inventory == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Inventory not found");
        }
        return ResponseEntity.ok("Quantity: " + inventory.getQuantity());
    }

    public ResponseEntity<String> updateQuantity(int id, String action, int quantity) {
        Inventory inventory = inventoryRepository.findById(id);
        if (inventory == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }

        inventory.setDate(LocalDate.now());
        int result = inventoryRepository.update(inventory, action, quantity);
        if (result == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid action or quantity");
        }

        return ResponseEntity.ok("Quantity updated successfully");
    }

    public ResponseEntity<String> deleteInventory(int id) {
        Inventory inventory = inventoryRepository.findById(id);
        if (inventory == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }
        inventoryRepository.delete(id);
        return ResponseEntity.ok("Product deleted.");
    }

    public ResponseEntity<List<Inventory>> getAllInventories() {
        List<Inventory> inventories = inventoryRepository.findAll();
        if (inventories.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(inventories);
    }
}
