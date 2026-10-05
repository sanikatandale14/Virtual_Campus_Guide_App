package com.example.campusguide.service

import com.example.campusguide.entity.Location
import com.example.campusguide.repository.LocationRepository
import org.springframework.stereotype.Service

@Service
class LocationService(private val locationRepository: LocationRepository) {

    fun getAllLocations(): List<Location> = locationRepository.findAll()

    fun getLocationById(id: Long): Location? = locationRepository.findById(id).orElse(null)

    fun searchLocations(query: String): List<Location> =
        locationRepository.findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(query, query)

    fun createLocation(location: Location): Location = locationRepository.save(location)

    fun updateLocation(id: Long, updated: Location): Location? {
        val existing = locationRepository.findById(id).orElse(null) ?: return null
        existing.name = updated.name
        existing.category = updated.category
        existing.description = updated.description
        existing.building = updated.building
        existing.floor = updated.floor
        existing.openingHours = updated.openingHours
        existing.contact = updated.contact
        existing.latitude = updated.latitude
        existing.longitude = updated.longitude
        return locationRepository.save(existing)
    }

    fun deleteLocation(id: Long): Boolean {
        if (!locationRepository.existsById(id)) return false
        locationRepository.deleteById(id)
        return true
    }
}
