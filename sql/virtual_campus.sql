-- Virtual Campus Guide — manual database setup (optional).
-- The backend also creates the schema automatically (JPA) and loads the sample data.
CREATE DATABASE IF NOT EXISTS virtual_campus;
USE virtual_campus;

CREATE TABLE IF NOT EXISTS locations (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  category VARCHAR(255),
  description VARCHAR(1000),
  building VARCHAR(255),
  opening_hours VARCHAR(255),
  contact VARCHAR(255),
  latitude DOUBLE,
  longitude DOUBLE
);

CREATE TABLE IF NOT EXISTS departments (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(1000),
  hod VARCHAR(255),
  building VARCHAR(255),
  contact_email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS facilities (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(1000),
  location VARCHAR(255),
  opening_hours VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS events (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(1000),
  date VARCHAR(255),
  time VARCHAR(255),
  venue VARCHAR(255)
);
