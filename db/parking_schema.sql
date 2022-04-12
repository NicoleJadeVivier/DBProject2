ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;

CREATE DATABASE parking_schema;

-- Stadiums must be named uniquely in this database
CREATE TABLE stadium (
    stadium_name VARCHAR(30) PRIMARY KEY,
    stadium_address VARCHAR(50),
    is_open BOOLEAN
);

-- Parking lot IDs will range from 'A' to 'F' with no repeated values at either stadium
CREATE TABLE parking_lot (
    lot_id VARCHAR(2) PRIMARY KEY,
    number_of_spaces INTEGER,
    stadium_name VARCHAR(30) REFERENCES stadium(stadium_name)
);

CREATE TABLE parking_space (
    spot_number INTEGER,
    lot_id VARCHAR(2) REFERENCES parking_lot(lot_id),
    stadium_name VARCHAR(30) REFERENCES stadium(stadium_name),
    is_available BOOLEAN,
    is_handicap BOOLEAN,
    PRIMARY KEY(spot_number, lot_id)
);

CREATE TABLE employee (
    employee_id INTEGER PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    lot_id VARCHAR(2) REFERENCES parking_lot(lot_id)
);

CREATE TABLE fan (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30)
);

CREATE TABLE car (
    license_plate_number VARCHAR(10) PRIMARY KEY,
    vehicle_type VARCHAR(20),
    owner INTEGER REFERENCES fan(id)
);

-- For this database, we are assuming each fan only has one car and each car belongs to one fan.
-- This is a one to one relationship, defined by foreign keys in both directions
ALTER TABLE fan
ADD COLUMN car VARCHAR(10) REFERENCES car(license_plate_number);

CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    event_name VARCHAR(30),
    stadium_name VARCHAR(30) REFERENCES stadium(stadium_name),
    date VARCHAR(10),
    time VARCHAR(10)
);

CREATE TABLE parking_assignment (
    parking_space INTEGER,
    lot_id VARCHAR(2),
    FOREIGN KEY(parking_space, lot_id) REFERENCES parking_space(spot_number, lot_id),
    event_id INTEGER REFERENCES event(id),
    employee_id INTEGER REFERENCES employee(employee_id),
    license_plate VARCHAR(10) REFERENCES car(license_plate_number),
    vehicle_type VARCHAR(20),
    fan INTEGER REFERENCES fan(id),
    date VARCHAR(10),
    time VARCHAR(10),
    PRIMARY KEY (event_id, parking_space)
);

-- Join table between fans keeps track of which fans attended which events.
-- This is a many to many relationship
CREATE TABLE events_fans (
    event_id INTEGER REFERENCES event(id),
    fan_id INTEGER REFERENCES fan(id)
);

INSERT INTO stadium (stadium_name, stadium_address, is_open)
VALUES
('Cowpokes Stadium', '123 Main Street, Dallas, TX 75025', true),
('Rodeo Stadium', '234 2nd Ave, Dallas, TX 75075', true);

INSERT INTO parking_lot (lot_id, number_of_spaces, stadium_name)
VALUES
('A', 5, 'Rodeo Stadium'),
('B', 5, 'Rodeo Stadium'),
('C', 5, 'Rodeo Stadium'),
('D', 5, 'Cowpokes Stadium'),
('E', 5, 'Cowpokes Stadium'),
('F', 5, 'Cowpokes Stadium');

INSERT INTO parking_space(spot_number, lot_id, stadium_name, is_available, is_handicap)
VALUES
(001, 'A', 'Rodeo Stadium', true, true),
(002, 'A', 'Rodeo Stadium', true, false),
(003, 'A', 'Rodeo Stadium', true, false),
(004, 'A', 'Rodeo Stadium', true, false),
(005, 'A', 'Rodeo Stadium', true, false),
(006, 'B', 'Rodeo Stadium', true, false),
(007, 'B', 'Rodeo Stadium', true, true),
(008, 'B', 'Rodeo Stadium', true, false),
(009, 'B', 'Rodeo Stadium', true, false),
(010, 'B', 'Rodeo Stadium', true, false),
(011, 'C', 'Rodeo Stadium', true, false),
(012, 'C', 'Rodeo Stadium', true, false),
(013, 'C', 'Rodeo Stadium', true, true),
(014, 'C', 'Rodeo Stadium', true, false),
(015, 'C', 'Rodeo Stadium', true, false),
(016, 'D', 'Cowpokes Stadium', true, true),
(017, 'D', 'Cowpokes Stadium', true, false),
(018, 'D', 'Cowpokes Stadium', true, false),
(019, 'D', 'Cowpokes Stadium', true, true),
(020, 'D', 'Cowpokes Stadium', true, false),
(021, 'E', 'Cowpokes Stadium', true, true),
(022, 'E', 'Cowpokes Stadium', true, false),
(023, 'E', 'Cowpokes Stadium', true, false),
(024, 'E', 'Cowpokes Stadium', true, false),
(025, 'E', 'Cowpokes Stadium', true, false),
(026, 'F', 'Cowpokes Stadium', true, true),
(027, 'F', 'Cowpokes Stadium', true, false),
(028, 'F', 'Cowpokes Stadium', true, false),
(029, 'F', 'Cowpokes Stadium', true, false),
(030, 'F', 'Cowpokes Stadium', true, false);

INSERT INTO employee (employee_id, first_name, last_name, lot_id)
VALUES
(71151, 'Sadiyah', 'Hayes', 'A'),
(58831, 'Sylvie', 'Jennings', 'A'),
(44062, 'Sanya', 'Meyers', 'A'),
(83581, 'Dolcie', 'Simmons', 'B'),
(93790, 'Shani', 'Grant', 'B'),
(21340, 'Corey', 'Salgado', 'B'),
(84854, 'Eoghan', 'Stone', 'C'),
(12464, 'Talha', 'Pena', 'C'),
(26883, 'Virginia', 'Pierce', 'C'),
(82947, 'Curtis', 'Mccarty', 'D'),
(35677, 'Akeel', 'Knight', 'D'),
(78773, 'Claire', 'Mclellan', 'D'),
(84762, 'Aneeka', 'Hines', 'E'),
(29073, 'Laibah', 'Gaines', 'E'),
(94896, 'Mariam', 'Jimenez', 'E'),
(66259, 'Eryk', 'Flores', 'F'),
(76713, 'Muhamed', 'Vaughn', 'F'),
(52177, 'Tom', 'Wagner', 'F');

INSERT INTO event (event_name, stadium_name, date, time)
VALUES
('Game 1', 'Cowpokes Stadium', '1-2-2022', '8:00 PM'),
('Game 2', 'Cowpokes Stadium', '5-23-2022', '7:00 PM'),
('Game 1', 'Rodeo Stadium', '7-20-2022', '9:00 PM'),
('Game 2', 'Rodeo Stadium', '11-3-2022', '2:00 PM');

INSERT INTO fan (first_name, last_name)
VALUES
('Rupert', 'Benson'),
('Jovan', 'Leech'),
('Abid', 'Bowers'),
('Wil', 'Fernandez'),
('Hafsa', 'Akhtar'),
('Amelia-Mae', 'French'),
('Earl', 'Randall'),
('Nichole', 'Ware'),
('Meadow', 'English'),
('Eva', 'Sosa');

INSERT INTO car (license_plate_number, vehicle_type, owner)
VALUES
('D7FJ89', 'Coupe', 1),
('J876FR', 'Sedan', 2),
('76JK51', 'Hatchback', 3),
('890KJE', 'SUV', 4),
('35FD4B', 'Minivan', 5),
('3JLKOP', 'Van', 6),
('9KJUB4', 'Truck', 7),
('YRT653', 'RV', 8),
('767Y51', 'Hatchback', 9),
('8KJUB4', 'Truck', 10);


INSERT INTO parking_assignment (parking_space, event_id, lot_id, employee_id, license_plate, vehicle_type, fan, date, time)
VALUES
(016, 1, 'D', 35677, 'D7FJ89', 'Coupe', 1, '1-2/2022', '7:52 PM'),
(021, 2, 'E', 84762, 'J876FR', 'Sedan', 2, '5-23-2022', '7:02 PM'),
(026, 1, 'F', 66259, '76JK51', 'Hatchback', 3, '1-2-2022', '7:58 PM'),
(001, 3, 'A', 71151, '890KJE', 'SUV', 4, '7-20-2022', '9:10 PM'),
(006, 3, 'B', 83581, '35FD4B', 'Minivan', 5, '7-20-2022', '8:46 PM'),
(011, 4, 'C', 84854, '3JLKOP', 'Van', 6, '11-3-2022', '1:47 PM'),
(017, 1, 'D', 35677, '9KJUB4', 'Truck', 7, '1-2-2022', '7:59 PM'),
(022, 2, 'E', 29073, 'YRT653', 'RV', 8, '5-23-2022', '6:40 PM'),
(001, 4, 'A', 44062, '767Y51', 'Hatchback', 9, '11-3-2022', '1:23 PM'),
(007, 4, 'B', 21340, '8KJUB4', 'Truck', 10, '11-3-2022', '1:55 PM');

UPDATE parking_space
SET is_available = false
WHERE spot_number IN (
    SELECT parking_space FROM parking_assignment
);

ALTER TABLE employee
ADD username VARCHAR(50),
ADD password VARCHAR(200);


