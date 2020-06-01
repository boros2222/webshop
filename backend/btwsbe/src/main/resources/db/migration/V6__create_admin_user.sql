
-- Password: admin123
insert into user_account (id, email, hash, salt, name, registration_date, role)
values (nextval('s_user_account'), 'admin@borostack.eu', '$2a$12$1v6IUjJB0oa9VffV7bDQJu8nHgTAjYDkMeiO1aEJEUNgZh0UWU6p2', '$2a$12$1v6IUjJB0oa9VffV7bDQJu', 'Borostack Admin', current_date, 'SUPERADMIN');
