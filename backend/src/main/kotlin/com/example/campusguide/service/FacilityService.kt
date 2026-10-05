package com.example.campusguide.service

import com.example.campusguide.entity.Facility
import com.example.campusguide.repository.FacilityRepository
import org.springframework.stereotype.Service

@Service
class FacilityService(private val facilityRepository: FacilityRepository) {

    fun getAllFacilities(): List<Facility> = facilityRepository.findAll()

    fun getFacilityById(id: Long): Facility? = facilityRepository.findById(id).orElse(null)

    fun createFacility(facility: Facility): Facility = facilityRepository.save(facility)

    fun updateFacility(id: Long, updated: Facility): Facility? {
        val existing = facilityRepository.findById(id).orElse(null) ?: return null
        existing.name = updated.name
        existing.description = updated.description
        existing.location = updated.location
        existing.openingHours = updated.openingHours
        return facilityRepository.save(existing)
    }

    fun deleteFacility(id: Long): Boolean {
        if (!facilityRepository.existsById(id)) return false
        facilityRepository.deleteById(id)
        return true
    }
}
