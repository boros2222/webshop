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
    password_id integer not null,
    email varchar(255) not null,
    registration_date date,
    invoice_address_id integer,
    shipping_address_id integer,

    constraint user_account_pk primary key (id),
    constraint user_account_fk_1 foreign key (password_id) references password (id),
    constraint user_account_fk_2 foreign key (invoice_address_id) references address (id),
    constraint user_account_fk_3 foreign key (shipping_address_id) references address (id)
);

create sequence s_order_details;
create table order_details (
    id integer,
    user_account_id integer not null,
    shipping_address_id integer not null,
    order_date date not null,

    constraint order_pk primary key (id),
    constraint order_fk_1 foreign key (user_account_id) references user_account (id),
    constraint order_fk_2 foreign key (shipping_address_id) references address (id)
);

create sequence s_category;
create table category (
    id integer,
    name varchar(255) not null,

    constraint category_pk primary key (id)
);

create sequence s_product;
create table product (
    id integer,
    name varchar(255) not null,
    description text,
    price integer not null,
    category_id integer not null,

    constraint product_pk primary key (id),
    constraint product_fk foreign key (category_id) references category (id)
);

create table picture (
    product_id integer,
    path text,

    constraint picture_pk primary key (product_id, path),
    constraint picture_fk foreign key (product_id) references product (id)
);

create table ordered_product (
    order_details_id integer,
    product_id integer,
    quantity integer not null,

    constraint ordered_product_pk primary key (order_details_id, product_id),
    constraint ordered_product_fk_1 foreign key (order_details_id) references order_details (id),
    constraint ordered_product_fk_2 foreign key (product_id) references product (id),
    constraint ordered_product_check check (quantity > 0)
);

create table payment (
    order_details_id integer,
    service varchar(255),
    payment_date date,
    is_paid boolean not null,
    total_price integer not null,

    constraint payment_pk primary key (order_details_id),
    constraint payment_fk foreign key (order_details_id) references order_details (id)
);