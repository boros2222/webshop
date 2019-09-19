create sequence s_address;
create table address (
    id integer,
    postal_code integer not null,
    country varchar(255) not null,
    street varchar(255) not null,
    house_number varchar(255) not null,

    constraint address_pk primary key (id)
);

create sequence s_password;
create table password (
    id integer,
    hash text not null,
    salt varchar(255) not null,

    constraint password_pk primary key (id)
);

create sequence s_user_account;
create table user_account (
    id integer,
    username varchar(255) not null,
    password integer not null,
    email varchar(255) not null,
    registration_date date,
    invoice_address integer,
    shipping_address integer,

    constraint user_account_pk primary key (id),
    constraint user_account_fk_1 foreign key (password) references password (id),
    constraint user_account_fk_2 foreign key (invoice_address) references address (id),
    constraint user_account_fk_3 foreign key (shipping_address) references address (id)
);

create sequence s_order_details;
create table order_details (
    id integer,
    user_account integer not null,
    shipping_address integer not null,
    order_date date not null,

    constraint order_pk primary key (id),
    constraint order_fk_1 foreign key (user_account) references user_account (id),
    constraint order_fk_2 foreign key (shipping_address) references address (id)
);

create table category (
    name varchar(255),

    constraint category_pk primary key (name)
);

create sequence s_product;
create table product (
    id integer,
    name varchar(255) not null,
    description text,
    price integer not null,
    category varchar(255) not null,

    constraint product_pk primary key (id),
    constraint product_fk foreign key (category) references category (name)
);

create table picture (
    product integer,
    path text,

    constraint picture_pk primary key (product, path),
    constraint picture_fk foreign key (product) references product (id)
);

create table ordered_product (
    order_details integer,
    product integer,
    quantity integer not null,

    constraint ordered_product_pk primary key (order_details, product),
    constraint ordered_product_fk_1 foreign key (order_details) references order_details (id),
    constraint ordered_product_fk_2 foreign key (product) references product (id),
    constraint ordered_product_check check (quantity > 0)
);

create table payment (
    order_details integer,
    service varchar(255),
    payment_date date,
    is_paid boolean not null,
    total_price integer not null,

    constraint payment_pk primary key (order_details),
    constraint payment_fk foreign key (order_details) references order_details (id)
);