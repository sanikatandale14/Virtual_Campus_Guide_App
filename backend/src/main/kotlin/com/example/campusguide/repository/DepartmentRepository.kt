package com.example.campusguide.repository

import com.example.campusguide.entity.Department
import org.springframework.data.jpa.repository.JpaRepository

interface DepartmentRepository : JpaRepository<Department, Long>
