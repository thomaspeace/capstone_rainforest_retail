package com.example.rainforest_retail_server.services;

import com.example.rainforest_retail_server.models.RegionalHub;
import com.example.rainforest_retail_server.repositories.RegionalHubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegionalHubService {

    @Autowired
    private RegionalHubRepository regionalHubRepository;

    public List<RegionalHub> getAllRegionalHubs() {
        return regionalHubRepository.findAll();
    }

    public RegionalHub getRegionalHubById(Long id) {
        return regionalHubRepository.findById(id).orElse(null);
    }

    public RegionalHub createRegionalHub(RegionalHub regionalHub) {
        return regionalHubRepository.save(regionalHub);
    }

    public RegionalHub updateRegionalHub(Long id, RegionalHub regionalHubDetails) {
        RegionalHub regionalHub = regionalHubRepository.findById(id).orElse(null);
        if (regionalHub != null) {
            regionalHub.setRegion(regionalHubDetails.getRegion());
            return regionalHubRepository.save(regionalHub);
        }
        return null;
    }

//    Updated method fully update regionalHub details

//    public RegionalHub updateRegionalHub(Long id, RegionalHub regionalHubDetails) {
//        RegionalHub regionalHub = regionalHubRepository.findById(id).orElse(null);
//        if (regionalHub != null) {
//            if (regionalHubDetails.getRegion() != null) {
//                regionalHub.setRegion(regionalHubDetails.getRegion());
//            }
//            if (regionalHubDetails.getOrders() != null) {
//                regionalHub.setOrders(regionalHubDetails.getOrders());
//            }
//            if (regionalHubDetails.getVans() != null) {
//                regionalHub.setVans(regionalHubDetails.getVans());
//            }
//            return regionalHubRepository.save(regionalHub);
//        }
//        return null;
//    }

    public void deleteRegionalHub(Long id) {
        regionalHubRepository.deleteById(id);
    }
}