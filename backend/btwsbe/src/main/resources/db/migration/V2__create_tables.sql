create sequence s_address;
create table address (
    id integer,
    postal_code varchar(255) not null,
    city varchar(255) not null,
    street varchar(255) not null,
    house_number varchar(255) not null,

    constraint address_pk primary key (id)
);

create sequence s_user_account;
create table user_account (
    id integer,
    email varchar(255) not null unique,
    hash text not null,
    salt varchar(255) not null,
    name varchar(255) not null,
    registration_date date,
    invoice_address_id integer,
    shipping_address_id integer,

    constraint user_account_pk primary key (id),
    constraint user_account_fk_1 foreign key (invoice_address_id) references address(id),
    constraint user_account_fk_2 foreign key (shipping_address_id) references address(id)
);

create sequence s_user_role;
create table user_role (
    id integer,
    user_account_id integer not null,
    role varchar(255) not null,

    constraint user_role_pk primary key (id),
    constraint user_role_fk foreign key (user_account_id) references user_account(id)
);

create sequence s_order_details;
create table order_details (
    id integer,
    user_account_id integer not null,
    shipping_address_id integer not null,
    invoice_address_id integer not null,
    invoice_name varchar(255) not null,
    order_date date not null,

    constraint order_pk primary key (id),
    constraint order_fk_1 foreign key (user_account_id) references user_account(id),
    constraint order_fk_2 foreign key (shipping_address_id) references address(id),
    constraint order_fk_3 foreign key (invoice_address_id) references address(id)
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
    constraint product_fk foreign key (category_id) references category(id)
);

create sequence s_picture;
create table picture (
    id integer,
    product_id integer not null,
    path text not null,

    constraint picture_uq unique (product_id, path),
    constraint picture_pk primary key (id),
    constraint picture_fk foreign key (product_id) references product(id)
);

create sequence s_ordered_product;
create table ordered_product (
    id integer,
    order_details_id integer not null,
    product_id integer not null,
    quantity integer not null,

    constraint ordered_product_uq unique (order_details_id, product_id),
    constraint ordered_product_pk primary key (id),
    constraint ordered_product_fk_1 foreign key (order_details_id) references order_details (id),
    constraint ordered_product_fk_2 foreign key (product_id) references product (id),
    constraint ordered_product_check check (quantity > 0)
);

create sequence s_payment;
create table payment (
    id integer,
    order_details_id integer not null,
    service varchar(255),
    payment_date date,
    is_paid boolean not null,
    total_price integer not null,

    constraint payment_uq unique (order_details_id),
    constraint payment_pk primary key (id),
    constraint payment_fk foreign key (order_details_id) references order_details (id)
);