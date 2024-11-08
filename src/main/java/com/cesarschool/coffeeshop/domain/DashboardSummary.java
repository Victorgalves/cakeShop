package com.cesarschool.coffeeshop.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSummary {
    private int totalClients;
    private int totalOrders;
    private double totalRevenue;
    private ProductSummary topSellingProduct;
    private ClientSummary topClient;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductSummary {
        private String name;
        private int totalSales;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ClientSummary {
        private String name;
        private int totalPurchases;
    }
}
