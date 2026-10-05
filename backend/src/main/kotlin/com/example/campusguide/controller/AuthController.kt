package com.example.campusguide.controller

import com.example.campusguide.service.AuthService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

data class RegisterRequest(val name: String = "", val email: String = "", val password: String = "", val role: String = "STUDENT")
data class LoginRequest(val email: String = "", val password: String = "")

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = ["*"])
class AuthController(private val authService: AuthService) {

    @PostMapping("/register")
    fun register(@RequestBody request: RegisterRequest) =
        ResponseEntity.ok(authService.register(request.name, request.email, request.password, request.role))

    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest) =
        ResponseEntity.ok(authService.login(request.email, request.password))

    @PostMapping("/logout")
    fun logout(@RequestHeader(value = "Authorization", required = false) auth: String?): ResponseEntity<Void> {
        authService.logout(authService.extractToken(auth))
        return ResponseEntity.noContent().build()
    }
}
