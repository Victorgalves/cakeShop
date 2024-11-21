package com.cesarschool.coffeeshop.controller;

import com.cesarschool.coffeeshop.domain.Inventory;
import com.cesarschool.coffeeshop.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @GetMapping("/{id}")
    public ResponseEntity<String> getQuantityById(@PathVariable int id) {
        return inventoryService.getQuantityById(id);
    }

    @PutMapping("/{id}/update-quantity")
    public ResponseEntity<String> updateQuantity(@PathVariable int id,
                                                 @RequestParam String action,
                                                 @RequestParam int quantity) {
        return inventoryService.updateQuantity(id, action, quantity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInventory(@PathVariable int id) {
        return inventoryService.deleteInventory(id);
    }

    @GetMapping
    public ResponseEntity<List<Inventory>> getAllInventories() {
        return inventoryService.getAllInventories();
    }
}
