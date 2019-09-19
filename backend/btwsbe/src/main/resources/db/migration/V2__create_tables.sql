create table todo (
    id int primary key,
    task varchar(255),
    dueDate date,
    isCompleted boolean,
    dateCompleted date,
    dateCreated date,
    timeCreated time
);