-- CREATE USER bravoeuser PASSWORD '1111';
-- ALTER ROLE bravouser createrole createdb;

\c postgres
DROP
    DATABASE bravo;
CREATE
    DATABASE bravo OWNER bravouser;
\c bravo

CREATE TABLE Users
(
    id            SERIAL       NOT NULL PRIMARY KEY,
    email         VARCHAR(255) NOT NULL UNIQUE,
    status        VARCHAR(50)  NOT NULL,
    creation_date BIGSERIAL    NOT NULL
);

CREATE TABLE Products
(
    id           SERIAL       NOT NULL PRIMARY KEY,
    name         VARCHAR(255) NOT NULL UNIQUE,
    code         VARCHAR(255) NOT NULL UNIQUE,
    availability VARCHAR(255) NOT NULL
);

CREATE TABLE Customers
(
    id            SERIAL       NOT NULL PRIMARY KEY,
    no            VARCHAR(255) NOT NULL UNIQUE,
    name          VARCHAR(255) NOT NULL,
    address       VARCHAR(255) NOT NULL,
    contact_name  VARCHAR(255) NOT NULL,
    delivery_days VARCHAR(255) NOT NULL,
    mobile_phone  VARCHAR(255) NULL,
    user_id       INT          NOT NULL REFERENCES Users (id) ON DELETE CASCADE
);

CREATE TABLE Orders
(
    id            SERIAL      NOT NULL PRIMARY KEY,
    no            VARCHAR(255) NOT NULL UNIQUE,
    status        VARCHAR(50) NOT NULL,
    req_delivery  BIGSERIAL   NOT NULL,
    orderate_date BIGSERIAL   NOT NULL,
    notes         TEXT        NULL,
    items         INT         NOT NULL,
    product_id    INT         NOT NULL REFERENCES Products (id) ON DELETE CASCADE,
    customer_id   INT         NULL
);

CREATE TABLE Replacements
(
    id            SERIAL NOT NULL PRIMARY KEY,
    replace_to_id INT    NOT NULL REFERENCES Products (id) ON DELETE CASCADE,
    product_id    INT    NOT NULL REFERENCES Products (id) ON DELETE CASCADE
);

CREATE TABLE Units
(
    id         SERIAL           NOT NULL PRIMARY KEY,
    unit       VARCHAR(255)     NOT NULL,
    price      double precision NOT NULL,
    product_id INT              NOT NULL REFERENCES Products (id) ON DELETE CASCADE
);

CREATE TABLE Exclusive
(
    id         SERIAL           NOT NULL PRIMARY KEY,
    percent    double precision NOT NULL,
    product_id INT              NOT NULL REFERENCES Products (id) ON DELETE CASCADE,
    user_id    INT              NOT NULL REFERENCES Users (id) ON DELETE CASCADE
);

INSERT INTO Users (email, status, creation_date)
VALUES ('bshmalko97@gmail.com', 'admin', 1625555312792);