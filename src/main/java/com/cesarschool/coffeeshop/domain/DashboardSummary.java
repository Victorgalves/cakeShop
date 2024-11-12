package com.cesarschool.coffeeshop.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSummary {
    private int totalClients;
    private int totalOrders;
    private double totalRevenue;
    private double averageTicket;
    private double averageRating;
    private ProductSummary topSellingProduct;
    private ClientSummary topClient;
    private List<SalesData> salesData;
    private List<ProductSummary> productsSoldLast30Days;

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

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SalesData {
        private String date;
        private double sales;
    }
}
