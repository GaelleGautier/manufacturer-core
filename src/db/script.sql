CREATE DATABASE manufacturer_db;

USE manufacturer_db;

CREATE TABLE manufacturer (
  id BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  headquarter_country_code VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  catalog_size INT(11) NOT NULL,
  review_state VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE alias (
  id BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  manufacturer_id BIGINT(20) NOT NULL,
  FOREIGN KEY (manufacturer_id) REFERENCES manufacturer(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO manufacturer (name, url, address, headquarter_country_code, category, catalog_size, review_state) VALUES
('Tech Innovators', 'http://www.techinnovators.com', '123 Innovation Road, Silicon Valley, CA', 'US', 'Electronics', 150, 'none'),
('Green Solutions', 'http://www.greensolutions.com', '456 Eco Park, Green City, TX', 'US', 'Renewable Energy', 200, 'done'),
('Smart Home Ltd.', 'http://www.smarthomeltd.com', '789 Home St., London', 'UK', 'Home Automation', 120, 'todo'),
('EcoFriendly Systems', 'http://www.ecofriendlysystems.com', '101 Nature Blvd, Amsterdam', 'NL', 'Environmental Technology', 250, 'todo'),
('Future Mobility', 'http://www.futuremobility.com', '202 Drive Ave, Berlin', 'DE', 'Automotive', 180, 'done');

INSERT INTO alias (name, manufacturer_id) VALUES
('Tech Innovate', 1),
('Innovative Tech', 1),
('GreenTech', 2),
('Eco Green', 2),
('Smart Living', 3),
('Home Smart', 3),
('Eco Systems', 4),
('Green Systems', 4),
('Eco Friendly Tech', 4),
('Future Cars', 5),
('Mobility Innovations', 5);
