package com.cesarschool.coffeeshop.repository;

import com.cesarschool.coffeeshop.domain.DashboardSummary;
import com.cesarschool.coffeeshop.domain.DashboardSummary.ClientSummary;
import com.cesarschool.coffeeshop.domain.DashboardSummary.ProductSummary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DashboardRepositoryImp implements DashboardRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public DashboardSummary getDashboardSummary() {
        // Total de clientes
        int totalClients = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM Cliente", Integer.class);

        // Total de pedidos
        int totalOrders = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM Pedidos", Integer.class);

        // Receita total
        Double totalRevenue = jdbcTemplate.queryForObject("SELECT SUM(preco_unitario * quantidade) FROM ItensPedido", Double.class);
        if (totalRevenue == null) totalRevenue = 0.0;

        // Ticket médio
        double averageTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0.0;

        // Média de avaliações (NPS)
        Double averageRating = jdbcTemplate.queryForObject("SELECT AVG(nota) FROM Avaliacao", Double.class);
        if (averageRating == null) averageRating = 0.0;

        // Produto mais vendido
        ProductSummary topSellingProduct = jdbcTemplate.queryForObject(
                "SELECT p.nome, SUM(i.quantidade) as totalSales " +
                        "FROM Produtos p " +
                        "JOIN ItensPedido i ON p.id = i.produto_id " +
                        "GROUP BY p.nome ORDER BY totalSales DESC LIMIT 1",
                (rs, rowNum) -> new ProductSummary(rs.getString("nome"), rs.getInt("totalSales"))
        );

        List<ProductSummary> productsSoldLast30Days = jdbcTemplate.query(
                "SELECT p.nome, SUM(i.quantidade) AS quantidade_vendida " +
                        "FROM Produtos p " +
                        "JOIN ItensPedido i ON p.id = i.produto_id " +
                        "JOIN Pedidos ped ON i.pedido_id = ped.id " +
                        "WHERE DATE(ped.dataHora) >= CURDATE() - INTERVAL 30 DAY " +
                        "GROUP BY p.nome " +
                        "ORDER BY quantidade_vendida DESC",
                (rs, rowNum) -> new ProductSummary(rs.getString("nome"), rs.getInt("quantidade_vendida"))
        );

        // Cliente com mais compras
        ClientSummary topClient = jdbcTemplate.queryForObject(
                "SELECT c.nome, COUNT(p.id) as totalPurchases " +
                        "FROM Cliente c " +
                        "JOIN Pedidos p ON c.cpf = p.cliente_cpf " +
                        "GROUP BY c.nome ORDER BY totalPurchases DESC LIMIT 1",
                (rs, rowNum) -> new ClientSummary(rs.getString("nome"), rs.getInt("totalPurchases"))
        );

        // Obter salesData (últimos 30 dias de vendas)
        List<DashboardSummary.SalesData> salesData = jdbcTemplate.query(
                "SELECT DATE(p.dataHora) as date, SUM(i.preco_unitario * i.quantidade) as sales " +
                        "FROM Pedidos p " +
                        "JOIN ItensPedido i ON p.id = i.pedido_id " +
                        "WHERE p.dataHora >= CURDATE() - INTERVAL 30 DAY " +
                        "GROUP BY DATE(p.dataHora) " +
                        "ORDER BY DATE(p.dataHora) ASC",
                (rs, rowNum) -> new DashboardSummary.SalesData(rs.getString("date"), rs.getDouble("sales"))
        );

        // Criar e retornar o objeto DashboardSummary com todos os dados
        return new DashboardSummary(totalClients, totalOrders, totalRevenue, averageTicket, averageRating, topSellingProduct , topClient, salesData, productsSoldLast30Days);
    }


}