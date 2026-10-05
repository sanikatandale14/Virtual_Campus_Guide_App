package com.example.campusguide.service

import com.example.campusguide.entity.Department
import com.example.campusguide.repository.DepartmentRepository
import org.springframework.stereotype.Service

@Service
class DepartmentService(private val departmentRepository: DepartmentRepository) {

    fun getAllDepartments(): List<Department> = departmentRepository.findAll()

    fun getDepartmentById(id: Long): Department? = departmentRepository.findById(id).orElse(null)

    fun createDepartment(department: Department): Department = departmentRepository.save(department)

    fun updateDepartment(id: Long, updated: Department): Department? {
        val existing = departmentRepository.findById(id).orElse(null) ?: return null
        existing.name = updated.name
        existing.description = updated.description
        existing.hod = updated.hod
        existing.building = updated.building
        existing.contactEmail = updated.contactEmail
        return departmentRepository.save(existing)
    }

    fun deleteDepartment(id: Long): Boolean {
        if (!departmentRepository.existsById(id)) return false
        departmentRepository.deleteById(id)
        return true
    }
}
