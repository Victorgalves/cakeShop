package com.cesarschool.coffeeshop.controller;

import com.cesarschool.coffeeshop.domain.DashboardSummary;
import com.cesarschool.coffeeshop.repository.DashboardRepository;
import com.cesarschool.coffeeshop.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/dashboard")
    public DashboardSummary getDashboardSummary() {
        return dashboardService.getDashboardSummary();
    }
}
