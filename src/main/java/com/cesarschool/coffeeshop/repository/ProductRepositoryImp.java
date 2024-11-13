package com.cesarschool.coffeeshop.repository;

import com.cesarschool.coffeeshop.domain.Product;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductRepositoryImp implements ProductRepository {

    private final JdbcTemplate jdbcTemplate;
    private final InventoryRepositoryImp inventoryRepositoryImp;

    public ProductRepositoryImp(JdbcTemplate jdbcTemplate, InventoryRepositoryImp inventoryRepositoryImp) {
        this.jdbcTemplate = jdbcTemplate;
        this.inventoryRepositoryImp = inventoryRepositoryImp;
    }

    @Override
    public Product findById(Integer id) {
        String sql = "SELECT * FROM Produtos WHERE id = ?";
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
        String sql = "SELECT * FROM Produtos WHERE status= 'Ativo'";
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
    public void update(Product produto) {
        String sql = "UPDATE Produtos SET nome = ?, preco = ?, categoria = ?, descricao = ? WHERE id = ?";
        jdbcTemplate.update(sql, produto.getName(), produto.getPrice(), produto.getCategory(), produto.getDescription(), produto.getId());
    }

    @Override
    public void delete(Integer id) {
        // Verificar dependências nas tabelas
        String checkItensPedidoSql = "SELECT COUNT(*) FROM ItensPedido WHERE produto_id = ?";
        String checkEstoqueSql = "SELECT COUNT(*) FROM Estoque WHERE produto_id = ?";
        String checkProducaoPedidoSql = "SELECT COUNT(*) FROM Producao_pedido WHERE produto_id = ?";

        int countItensPedido = jdbcTemplate.queryForObject(checkItensPedidoSql, Integer.class, id);
        int countEstoque = jdbcTemplate.queryForObject(checkEstoqueSql, Integer.class, id);
        int countProducaoPedido = jdbcTemplate.queryForObject(checkProducaoPedidoSql, Integer.class, id);

        // Se houver dependências, atualizar o status para 'Inativo'
        if (countItensPedido > 0 || countEstoque > 0 || countProducaoPedido > 0) {
            String updateStatusSql = "UPDATE Produtos SET status = 'Inativo' WHERE id = ?";
            jdbcTemplate.update(updateStatusSql, id);
            System.out.println("Produto com ID " + id + " marcado como Inativo devido a dependências.");
        } else {
            String deleteSql = "DELETE FROM Produtos WHERE id = ?";
            jdbcTemplate.update(deleteSql, id);
            System.out.println("Produto com ID " + id + " deletado fisicamente.");
        }
    }


    @Override
    public void save(Product product, int initialQuantity) {
        String insertProductSql = "INSERT INTO Produtos (nome, preco, categoria, descricao) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(insertProductSql, product.getName(), product.getPrice(), product.getCategory(), product.getDescription());

        Integer productId = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);

        String insertInventorySql = "INSERT INTO Estoque (produto_id, dt_atualizacao, quantidade_produto) VALUES (?, CURDATE(), ?)";
        jdbcTemplate.update(insertInventorySql, productId, initialQuantity);


    }
}