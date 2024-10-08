package com.example.rainforest_retail_server.services;

import com.example.rainforest_retail_server.models.RegionalHub;
import com.example.rainforest_retail_server.models.Van;
import com.example.rainforest_retail_server.models.VanDTO;
import com.example.rainforest_retail_server.repositories.RegionalHubRepository;
import com.example.rainforest_retail_server.repositories.VanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VanService {

    @Autowired
    private VanRepository vanRepository;

    @Autowired
    private RegionalHubRepository regionalHubRepository;

    public List<Van> getAllVans() {
        return vanRepository.findAll();
    }

    public Van getVanById(Long id) {
        return vanRepository.findById(id).orElse(null);
    }

    public Van createVan(VanDTO vanDTO) {
        RegionalHub foundRegionalHub = regionalHubRepository.findById(vanDTO.getRegionalHubId()).get();
        Van createdVan = new Van(foundRegionalHub);
        return vanRepository.save(createdVan);
    }

    public Van updateVan(Long id, Van vanDetails) {

        Van van = vanRepository.findById(id).orElse(null);
        if (van != null) {
            // Update van details
            return vanRepository.save(van);
        }
        return null;
    }

    public void deleteVan(Long id) {
        vanRepository.deleteById(id);
    }
}


