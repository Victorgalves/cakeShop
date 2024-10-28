package com.cesarschool.coffeeshop.repository;

import com.cesarschool.coffeeshop.domain.Product;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductRepositoryImp implements ProductRepository {

    private final JdbcTemplate jdbcTemplate;

    public ProductRepositoryImp(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Product findById(Integer id) {
        String sql = "SELECT * FROM Products WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, (rs, rowNum) -> {
            Product produto = new Product();
            produto.setId(rs.getInt("id"));
            produto.setName(rs.getString("nome"));
            produto.setPrice(rs.getFloat("preco"));
            produto.setCategory(rs.getString("categoria"));
            produto.setDescription(rs.getString("descricao"));
            return produto;
        });
    }

    @Override
    public List<Product> findAll() {
        String sql = "SELECT * FROM Products";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Product produto = new Product();
            produto.setId(rs.getInt("id"));
            produto.setName(rs.getString("nome"));
            produto.setPrice(rs.getFloat("preco"));
            produto.setCategory(rs.getString("categoria"));
            produto.setDescription(rs.getString("descricao"));
            return produto;
        });
    }

    @Override
    public void save(Product produto) {
        String sql = "INSERT INTO Products (nome, preco, categoria, descricao) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, produto.getName(), produto.getPrice(), produto.getCategory(), produto.getDescription());
    }

    @Override
    public void update(Product produto) {
        String sql = "UPDATE Products SET nome = ?, preco = ?, categoria = ?, descricao = ? WHERE id = ?";
        jdbcTemplate.update(sql, produto.getName(), produto.getPrice(), produto.getCategory(), produto.getDescription(), produto.getId());
    }

    @Override
    public void delete(Integer id) {
        String sql = "DELETE FROM Products WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}