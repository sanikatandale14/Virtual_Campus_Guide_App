package com.example.campusguide.controller

import com.example.campusguide.entity.Department
import com.example.campusguide.service.AuthService
import com.example.campusguide.service.DepartmentService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = ["*"])
class DepartmentController(
    private val departmentService: DepartmentService,
    private val authService: AuthService
) {

    @GetMapping
    fun getAllDepartments(): List<Department> = departmentService.getAllDepartments()

    @GetMapping("/{id}")
    fun getDepartmentById(@PathVariable id: Long): ResponseEntity<Department> {
        val department = departmentService.getDepartmentById(id)
        return if (department != null) ResponseEntity.ok(department)
        else ResponseEntity.notFound().build()
    }

    @PostMapping
    fun createDepartment(@RequestBody department: Department,
                         @RequestHeader(value = "Authorization", required = false) auth: String?): ResponseEntity<Department> {
        authService.requireAdmin(auth)
        return ResponseEntity.status(HttpStatus.CREATED).body(departmentService.createDepartment(department))
    }

    @PutMapping("/{id}")
    fun updateDepartment(@PathVariable id: Long, @RequestBody department: Department,
                         @RequestHeader(value = "Authorization", required = false) auth: String?): ResponseEntity<Department> {
        authService.requireAdmin(auth)
        val updated = departmentService.updateDepartment(id, department)
        return if (updated != null) ResponseEntity.ok(updated)
        else ResponseEntity.notFound().build()
    }

    @DeleteMapping("/{id}")
    fun deleteDepartment(@PathVariable id: Long,
                         @RequestHeader(value = "Authorization", required = false) auth: String?): ResponseEntity<Void> {
        authService.requireAdmin(auth)
        return if (departmentService.deleteDepartment(id)) ResponseEntity.noContent().build()
        else ResponseEntity.notFound().build()
    }
}
