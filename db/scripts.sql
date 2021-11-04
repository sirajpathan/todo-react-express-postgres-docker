CREATE TABLE IF NOT EXISTS task (
	id serial PRIMARY KEY,
	title VARCHAR ( 50 ) UNIQUE NOT NULL,
	status BOOLEAN NOT NULL,
	created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS subtask (
	id serial PRIMARY KEY,
	title VARCHAR ( 50 ) UNIQUE NOT NULL,
	status BOOLEAN NOT NULL,
	created_at TIMESTAMP NOT NULL,
	task_id BIGINT,
    CONSTRAINT fk_task
        FOREIGN KEY(task_id) 
        REFERENCES task(id)
);

insert into task(title, status, created_at) values('pick up the clothes', '0', NOW());

insert into subtask(title, status, created_at, task_id) values('pick up the clothes', '0', NOW(), 1);
insert into subtask(title, status, created_at, task_id) values('Throw the clothes in the machine', '0', NOW(), 1);
insert into subtask(title, status, created_at, task_id) values('Turn on the machine', '0', NOW(), 1);