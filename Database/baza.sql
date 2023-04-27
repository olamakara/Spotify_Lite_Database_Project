create table orders
(
  order_id int generated always as identity not null,
  shipper_id int,
  buyer_id int,
  constraint orders_pk primary key ( order_id ) enable
);

create table users (
    user_id int generated always as identity not null,
    email varchar2(50),
    firstname varchar2(50),
    lastname varchar2(50),
    address varchar2(100),
    phone varchar2(20),
    city varchar2(50),
    country varchar2(50),
    nip varchar2(20),
  constraint users_pk primary key ( user_id ) enable
);

create table order_details (
    order_id int not null,
    product_id int not null,
    quantity int not null,
    unit_price float not null,
    discount float not null
);

create table cart
(
    cart_id int generated always as identity not null,
    user_id int not null,
    constraint cart_pk primary key ( cart_id ) enable
);

create table cart_item (
    cart_id int not null ,
    product_id int not null ,
    quantity int not null
);

create table products (
    product_id int generated always as identity not null,
    seller_id int not null,
    product_name varchar2(50) not null,
    quantity int not null,
    unit_price float not null,
    start_date DATE not null,
    discount float not null,
    category_name varchar2(50) not null,
    description varchar2(250) not null,
    end_date DATE,
    constraint products_pk primary key ( product_id ) enable

);

create table review (
    review_id int generated always as identity not null,
    user_id int,
    product_id int,
    rate int,
    comment_string varchar2(250) not null,
    constraint review_pk primary key ( review_id ) enable
);

create table category (
    category_name varchar2(50) not null,
    description varchar2(150),
    constraint category_pk primary key ( category_name ) enable
);

create table shippers (
    shipper_id int generated always as identity not null,
    company_name varchar2(50) not null,
    nit varchar2(20) not null,
    address varchar2(50) not null,
    city varchar2(50) not null,
    constraint shippers_pk primary key ( shipper_id ) enable
);

alter table order_details
add constraint order_details_fk1 foreign key
( order_id ) references orders ( order_id ) enable;

alter table orders
add constraint orders_fk1 foreign key
( shipper_id ) references shippers ( shipper_id ) enable;

alter table orders
add constraint orders_fk2 foreign key
( buyer_id ) references users ( user_id ) enable;

alter table products
add constraint products_fk1 foreign key
( seller_id ) references users ( user_id ) enable;

alter table products
add constraint products_fk2 foreign key
( category_name ) references category ( category_name ) enable;

alter table review
add constraint review_fk1 foreign key
( user_id ) references users ( user_id ) enable;

alter table review
add constraint review_fk2 foreign key
( product_id ) references products ( product_id ) enable;

alter table cart
add constraint cart_fk1 foreign key
( user_id ) references users ( user_id ) enable;

alter table cart_item
add constraint cart_item_fk1 foreign key
( cart_id ) references cart ( cart_id ) enable;

alter table cart_item
add constraint cart_item_fk2 foreign key
( product_id ) references products ( product_id ) enable;

