package com.cesarschool.coffeeshop.controller;

import com.cesarschool.coffeeshop.domain.Inventory;
import com.cesarschool.coffeeshop.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepository;

    // Obter quantidade de um produto específico
    @GetMapping("/{id}")
    public ResponseEntity<String> getQuantityById(@PathVariable int id) {
        Inventory inventory = inventoryRepository.findById(id);

        if (inventory == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Inventory not found");
        }

        int quantity = inventory.getQuantity();
        return ResponseEntity.ok("Quantity: " + quantity);
    }

    // Atualizar quantidade de um produto (aumentar, diminuir ou remover)
    @PutMapping("/{id}/update-quantity")
    public ResponseEntity<String> updateQuantity(@PathVariable int id,
                                                 @RequestParam String action,
                                                 @RequestParam int quantity) {
        Inventory inventory = inventoryRepository.findById(id);

        if (inventory == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }

        // Definir a data atual antes de atualizar
        inventory.setDate(LocalDate.now());

        // Chama o método update do repositório, passando a ação e a quantidade
        int result = inventoryRepository.update(inventory, action, quantity);

        // Verifica se a operação foi bem-sucedida
        if (result == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid action or quantity");
        }

        return ResponseEntity.ok("Quantity updated successfully");
    }

    // Remover um produto do estoque (ou seja, deletar)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInventory(@PathVariable int id) {
        Inventory inventory = inventoryRepository.findById(id);

        if (inventory == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }

        inventoryRepository.delete(id); // Remove o produto do banco de dados
        return ResponseEntity.ok("Product deleted.");
    }

    // Obter todos os itens do estoque
    @GetMapping
    public ResponseEntity<List<Inventory>> getAllInventories() {
        List<Inventory> inventories = inventoryRepository.findAll();

        if (inventories.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok(inventories);
    }
}
