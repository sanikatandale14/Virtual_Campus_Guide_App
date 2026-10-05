package com.example.campusguide.repository

import com.example.campusguide.entity.Location
import org.springframework.data.jpa.repository.JpaRepository

interface LocationRepository : JpaRepository<Location, Long> {
    fun findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(name: String, category: String): List<Location>
}
