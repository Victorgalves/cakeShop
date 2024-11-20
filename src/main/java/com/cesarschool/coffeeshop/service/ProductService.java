package com.cesarschool.coffeeshop.service;

import com.cesarschool.coffeeshop.domain.Product;
import com.cesarschool.coffeeshop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(int id) {
        return productRepository.findById(id);
    }

    public void addProduct(Product product) {
        productRepository.save(product);
    }

    public void updateProduct(int id, Product product) {
        Product existingProduct = productRepository.findById(id);
        if (existingProduct != null) {
            existingProduct.setName(product.getName());
            existingProduct.setPrice(product.getPrice());
            existingProduct.setCategory(product.getCategory());
            existingProduct.setDescription(product.getDescription());
            productRepository.update(existingProduct);
        }
    }

    public boolean deleteProduct(int id) {
        Product product = productRepository.findById(id);
        if (product != null) {
            productRepository.delete(id);
            return true;
        }
        return false;
    }
}
