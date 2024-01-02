INSERT INTO department (name) VALUES
  ('Engineering'),
  ('Finance'),
  ('Legal'),
  ('Sales');

INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Lead', 100000, 4),
  ('Salesperson', 80000, 4),
  ('Lead Engineer', 150000, 1),
  ('Software Engineer', 120000, 1),
  ('Account Manager', 160000, 2),
  ('Accountant', 125000, 2),
  ('Legal Team Lead', 250000, 3),
  ('Lawyer', 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('Tom', 'Hanks', 1, NULL),
  ('Emma', 'Watson', 2, 1),
  ('Leonardo', 'DiCaprio', 3, NULL),
  ('Jennifer', 'Lawrence', 4, 3),
  ('Brad', 'Pitt', 5, NULL),
  ('Scarlett', 'Johansson', 6, 5),
  ('Johnny', 'Depp', 7, NULL),
  ('Meryl', 'Streep', 8, 7),
  ('Robert', 'Downey Jr.', 1, 3);