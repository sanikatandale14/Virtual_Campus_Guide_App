package com.example.campusguide.controller

import com.example.campusguide.entity.Facility
import com.example.campusguide.service.AuthService
import com.example.campusguide.service.FacilityService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/facilities")
@CrossOrigin(origins = ["*"])
class FacilityController(
    private val facilityService: FacilityService,
    private val authService: AuthService
) {

    @GetMapping
    fun getAllFacilities(): List<Facility> = facilityService.getAllFacilities()

    @GetMapping("/{id}")
    fun getFacilityById(@PathVariable id: Long): ResponseEntity<Facility> {
        val facility = facilityService.getFacilityById(id)
        return if (facility != null) ResponseEntity.ok(facility)
        else ResponseEntity.notFound().build()
    }

    @PostMapping
    fun createFacility(@RequestBody facility: Facility,
                       @RequestHeader(value = "Authorization", required = false) auth: String?): ResponseEntity<Facility> {
        authService.requireAdmin(auth)
        return ResponseEntity.status(HttpStatus.CREATED).body(facilityService.createFacility(facility))
    }

    @PutMapping("/{id}")
    fun updateFacility(@PathVariable id: Long, @RequestBody facility: Facility,
                       @RequestHeader(value = "Authorization", required = false) auth: String?): ResponseEntity<Facility> {
        authService.requireAdmin(auth)
        val updated = facilityService.updateFacility(id, facility)
        return if (updated != null) ResponseEntity.ok(updated)
        else ResponseEntity.notFound().build()
    }

    @DeleteMapping("/{id}")
    fun deleteFacility(@PathVariable id: Long,
                       @RequestHeader(value = "Authorization", required = false) auth: String?): ResponseEntity<Void> {
        authService.requireAdmin(auth)
        return if (facilityService.deleteFacility(id)) ResponseEntity.noContent().build()
        else ResponseEntity.notFound().build()
    }
}
