USE employees;
-- department seeds
INSERT INTO department 
    (name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("HR"),
    ("IT");
    INSERT INTO role
        (title, salary, department_id)
    VALUES
        ("Sales rep", 35000, 1),
        ("Mechanical Engineer", 120000, 2),
        ("Software Engineer", 150000, 2),
        ("Jr Engineer", 80000, 2),
        ("HR", 85000, 3),
        ("IT", 70000, 4);
        INSERT INTO employee
            (first_name, last_name, role_id, manager_id)
        VALUES
        ("John", "Smith", 1, 1),
        ("Manoli", "K", 2, 2),
        ("Anne", "Foo", 2, NULL),
        ("Thomas", "Holland", 2, NULL),
        ("Kyle", "Andie", 3, 3),
        ("Ed", "Gibbons", 4, 4);