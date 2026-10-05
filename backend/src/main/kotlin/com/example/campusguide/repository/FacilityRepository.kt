package com.example.campusguide.repository

import com.example.campusguide.entity.Facility
import org.springframework.data.jpa.repository.JpaRepository

interface FacilityRepository : JpaRepository<Facility, Long>
