package com.cesarschool.coffeeshop.controller;

import com.cesarschool.coffeeshop.domain.Product;
import com.cesarschool.coffeeshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> allProducts = productService.getAllProducts();
        return ResponseEntity.ok(allProducts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id) {
        Product product = productService.getProductById(id);
        if (product == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(product);
    }

    @PostMapping
    public ResponseEntity<String> addProduct(@RequestBody Product product) {
        if (product.getName() == null || product.getPrice() <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nome e preço são obrigatórios!");
        }
        int initialQuantity = 0;
        productService.addProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body("Produto criado com sucesso!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        boolean isDeleted = productService.deleteProduct(id);
        if (!isDeleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado");
        }
        return ResponseEntity.ok("Produto removido.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable int id, @RequestBody Product product) {
        Product existingProduct = productService.getProductById(id);
        if (existingProduct == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado.");
        }
        productService.updateProduct(id, product);
        return ResponseEntity.ok("Produto atualizado com sucesso.");
    }
}
