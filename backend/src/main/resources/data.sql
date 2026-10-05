-- Sample seed data (also applied automatically by the backend on startup)
DELETE FROM locations;
DELETE FROM departments;
DELETE FROM facilities;
DELETE FROM events;
DELETE FROM announcements;

INSERT INTO locations (name, category, description, building, floor, opening_hours, contact, latitude, longitude) VALUES
('Main Gate', 'Entrance', 'The main entrance of the campus with security and visitor registration.', 'Front Side', 'Ground', '6:00 AM - 9:00 PM', 'Security Office: 020-1111', 18.52040, 73.85670),
('Library', 'Academic', 'Central library with thousands of books, journals and reading halls.', 'Block A', 'Floor 1', '8:00 AM - 8:00 PM', 'library@college.edu', 18.52100, 73.85720),
('CSE Department', 'Department', 'Department of Computer Science and Engineering with labs and classrooms.', 'Block B', 'Floor 2', '9:00 AM - 5:00 PM', 'cse@college.edu', 18.52150, 73.85620),
('IT Department', 'Department', 'Department of Information Technology focusing on software and networks.', 'Block B', 'Floor 3', '9:00 AM - 5:00 PM', 'it@college.edu', 18.52180, 73.85640),
('Canteen', 'Food', 'Student canteen serving snacks, lunch and beverages.', 'Block C', 'Ground Floor', '8:00 AM - 7:00 PM', 'canteen@college.edu', 18.52080, 73.85750),
('Auditorium', 'Event', 'Large auditorium for seminars, cultural programs and guest lectures.', 'Block D', 'Ground + 1', '8:00 AM - 8:00 PM', 'auditorium@college.edu', 18.52220, 73.85700),
('Hostel', 'Residence', 'Separate boys and girls hostels with mess and study rooms.', 'Hostel Block', 'G - 4 Floors', '24 Hours', 'hostel@college.edu', 18.52300, 73.85800),
('Sports Ground', 'Sports', 'Open ground for cricket, football and athletics events.', 'East Side', 'Open Air', '6:00 AM - 7:00 PM', 'sports@college.edu', 18.52250, 73.85850),
('Administration Office', 'Office', 'Office of the principal, fees and general administration.', 'Block A', 'Ground Floor', '9:30 AM - 5:00 PM', 'admin@college.edu', 18.52060, 73.85680),
('Computer Lab', 'Academic', 'Modern computer lab with internet access and 60 systems.', 'Block B', 'Floor 2', '9:00 AM - 5:00 PM', 'lab@college.edu', 18.52130, 73.85610);

INSERT INTO departments (name, description, hod, building, contact_email) VALUES
('Computer Science', 'Covers programming, data structures, DBMS and software engineering.', 'Dr. R. Sharma', 'Block B, Floor 2', 'cs@college.edu'),
('Information Technology', 'Focus on networking, web technologies and databases.', 'Dr. P. Mehta', 'Block B, Floor 3', 'it@college.edu'),
('Mechanical', 'Covers thermodynamics, manufacturing and machine design.', 'Prof. A. Khan', 'Block E', 'mech@college.edu'),
('Civil', 'Covers structural engineering, surveying and construction.', 'Dr. S. Patil', 'Block F', 'civil@college.edu'),
('Electronics', 'Covers circuits, embedded systems and communication.', 'Dr. V. Joshi', 'Block C, Floor 2', 'ece@college.edu');

INSERT INTO facilities (name, description, location, opening_hours) VALUES
('Library', 'Central library with books and digital resources.', 'Block A, Floor 1', '8:00 AM - 8:00 PM'),
('Canteen', 'Snacks, lunch and beverages for students and staff.', 'Block C, Ground Floor', '8:00 AM - 7:00 PM'),
('Hostel', 'On-campus accommodation with mess facility.', 'Hostel Block', '24 Hours'),
('Sports Ground', 'Cricket, football and athletics ground.', 'East Side', '6:00 AM - 7:00 PM'),
('Computer Lab', 'Modern computer lab with internet access.', 'Block B, Floor 2', '9:00 AM - 5:00 PM'),
('Auditorium', 'Seats 500+ people for events and seminars.', 'Block D', '8:00 AM - 8:00 PM');

INSERT INTO events (name, description, date, time, venue) VALUES
('Tech Fest 2026', 'Annual technical festival with coding contests and workshops.', '2026-11-15', '10:00 AM', 'Auditorium'),
('Cultural Night', 'Music, dance and drama performances by students.', '2026-11-25', '6:00 PM', 'Auditorium'),
('Sports Day', 'Track and field events for all departments.', '2026-12-05', '8:00 AM', 'Sports Ground'),
('Workshop on AI Basics', 'Hands-on workshop introducing basics of Artificial Intelligence.', '2026-12-12', '2:00 PM', 'Computer Lab'),
('Annual Prize Distribution', 'Felicitation of top students and faculty awards.', '2027-01-10', '5:00 PM', 'Auditorium');

INSERT INTO announcements (title, message, date, author) VALUES
('Mid-Semester Exams', 'Mid-semester examinations will begin from 10th November 2026.', '2026-10-01', 'Exam Cell'),
('Library Timings Extended', 'The library will remain open till 10:00 PM during exam week.', '2026-10-03', 'Librarian'),
('Sports Registration Open', 'Register for Sports Day events before 30th November.', '2026-10-04', 'Sports Committee'),
('Holiday on 2nd October', 'The college will remain closed for Gandhi Jayanti.', '2026-09-28', 'Administration');
