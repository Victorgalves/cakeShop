package com.cesarschool.coffeeshop.service;

import com.cesarschool.coffeeshop.domain.DashboardSummary;
import com.cesarschool.coffeeshop.repository.DashboardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private DashboardRepository dashboardRepository;

    public DashboardSummary getDashboardSummary() {
        return dashboardRepository.getDashboardSummary();
    }
}
