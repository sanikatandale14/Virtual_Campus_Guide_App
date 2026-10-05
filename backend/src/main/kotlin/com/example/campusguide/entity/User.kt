package com.example.campusguide.entity

import jakarta.persistence.*

@Entity
@Table(name = "users")
class User(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,
    var name: String = "",
    @Column(unique = true)
    var email: String = "",
    var passwordHash: String = "",
    var role: String = "STUDENT"   // STUDENT, VISITOR, ADMIN
)
