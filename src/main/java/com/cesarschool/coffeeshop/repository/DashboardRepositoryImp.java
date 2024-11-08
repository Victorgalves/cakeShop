package com.cesarschool.coffeeshop.repository;

import com.cesarschool.coffeeshop.domain.DashboardSummary;
import com.cesarschool.coffeeshop.domain.DashboardSummary.ClientSummary;
import com.cesarschool.coffeeshop.domain.DashboardSummary.ProductSummary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class DashboardRepositoryImp implements DashboardRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public DashboardSummary getDashboardSummary() {
        int totalClients = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM Cliente", Integer.class);
        int totalOrders = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM Pedidos", Integer.class);

        Double totalRevenue = jdbcTemplate.queryForObject("SELECT SUM(preco_unitario * quantidade) FROM ItensPedido", Double.class);
        if (totalRevenue == null) totalRevenue = 0.0;

        // Produto mais vendido
        ProductSummary topSellingProduct = jdbcTemplate.queryForObject(
                "SELECT p.nome, SUM(i.quantidade) as totalSales " +
                        "FROM Produtos p " +
                        "JOIN ItensPedido i ON p.id = i.produto_id " +
                        "GROUP BY p.nome ORDER BY totalSales DESC LIMIT 1",
                (rs, rowNum) -> new ProductSummary(rs.getString("nome"), rs.getInt("totalSales"))
        );

        // Cliente com mais compras
        ClientSummary topClient = jdbcTemplate.queryForObject(
                "SELECT c.nome, COUNT(p.id) as totalPurchases " +
                        "FROM Cliente c " +
                        "JOIN Pedidos p ON c.cpf = p.cliente_cpf " +
                        "GROUP BY c.nome ORDER BY totalPurchases DESC LIMIT 1",
                (rs, rowNum) -> new ClientSummary(rs.getString("nome"), rs.getInt("totalPurchases"))
        );
        return new DashboardSummary(totalClients, totalOrders, totalRevenue, topSellingProduct, topClient);
    }
}
