package com.cesarschool.coffeeshop.controller;

import com.cesarschool.coffeeshop.domain.Product;
import com.cesarschool.coffeeshop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public ResponseEntity getAllProducts(){
        var allProducts = productRepository.findAll();
        return ResponseEntity.ok(allProducts);
    }

    @GetMapping("/{id}")
    public ResponseEntity getProductById(@PathVariable int id){
        var productId= productRepository.findById(id);
        return ResponseEntity.ok(productId);
    }

    @PostMapping
    public ResponseEntity<String> addProduct(@RequestBody Product product) {
        if (product.getName() == null || product.getPrice() == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nome e preço são obrigatórios!");
        }
        productRepository.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body("Product criado com sucesso!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        Product product= productRepository.findById(id);
        if (product == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado");
        }
        productRepository.delete(id);
        return ResponseEntity.ok("Produto removido.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable int id, @RequestBody Product product) {
        Product produtoExistente = productRepository.findById(id);
        if (produtoExistente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado.");
        }

        produtoExistente.setName(product.getName());
        produtoExistente.setPrice(product.getPrice());
        produtoExistente.setCategory(product.getCategory());
        produtoExistente.setDescription(product.getDescription());

        productRepository.update(produtoExistente);
        return ResponseEntity.ok("Produto atualizado com sucesso.");
}

}
