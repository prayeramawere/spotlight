CREATE TABLE Tasks (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  project_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES Projects(id) ON DELETE CASCADE,gvb hc fxczvmn cx x
  assignedTo BIGINT,
  priority VARCHAR(50),
  dueDate DATE
);