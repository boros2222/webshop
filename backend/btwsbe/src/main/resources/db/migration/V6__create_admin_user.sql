
-- Password: admin123
insert into user_account (id, email, hash, salt, name, registration_date)
values (nextval('s_user_account'), 'admin@borostack.eu', '$2a$12$1v6IUjJB0oa9VffV7bDQJu8nHgTAjYDkMeiO1aEJEUNgZh0UWU6p2', '$2a$12$1v6IUjJB0oa9VffV7bDQJu', 'Borostack Admin', current_date);

insert into user_role  (id, user_account_id, role)
values (nextval('s_user_role'), currval('s_user_account'), 'ADMIN');
