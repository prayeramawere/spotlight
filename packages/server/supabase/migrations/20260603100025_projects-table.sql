CREATE TABLE Projects (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  client_id BIGINT NOT NULL,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  budget DECIMAL(10, 2),
  startDate DATE,
  dueDate DATE,
  progress DECIMAL(5, 2) DEFAULT 0.00,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);