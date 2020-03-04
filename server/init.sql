CREATE TABLE task (
  ID SERIAL PRIMARY KEY,
  task_name VARCHAR(255) NOT NULL,
  count INT NOT NULL, 
  breaks INT NOT NULL,
);

INSERT INTO task (id, task_name, count, breaks)
VALUES  (3, "task 3", 0,0);