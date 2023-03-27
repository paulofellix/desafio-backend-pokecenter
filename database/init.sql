CREATE TABLE CLIENT (
  id int PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TYPE TRANSACTION_TYPE AS ENUM ('CREDIT', 'DEBIT');
CREATE TABLE TRANSACTION (
  id SERIAL PRIMARY KEY,
  client_id int not null,
  amount DECIMAL(10,2) NOT NULL,
  type TRANSACTION_TYPE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (client_id) REFERENCES CLIENT(id)
);

CREATE TABLE BALANCE (
  id SERIAL PRIMARY KEY,
  client_id int not null,
  amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (client_id) REFERENCES CLIENT(id)
);


INSERT INTO CLIENT (id, name, phone) VALUES (1, 'John Doe', '123456789');
INSERT INTO CLIENT (id, name, phone) VALUES (2, 'Jane Doe', '987654321');
INSERT INTO CLIENT (id, name, phone) VALUES (3, 'John Smith', '123456789');
INSERT INTO CLIENT (id, name, phone) VALUES (4, 'Jane Smith', '987654321');
INSERT INTO "transaction" (amount, type, client_id) VALUES (100.00, 'CREDIT', 1);
INSERT INTO "transaction" (amount, type, client_id) VALUES (50.00, 'DEBIT', 1);
INSERT INTO "transaction" (amount, type, client_id) VALUES (100.00, 'CREDIT', 2);
INSERT INTO "transaction" (amount, type, client_id) VALUES (50.00, 'DEBIT', 2);
INSERT INTO "transaction" (amount, type, client_id) VALUES (100.00, 'CREDIT', 3);
INSERT INTO "transaction" (amount, type, client_id) VALUES (50.00, 'DEBIT', 3);
INSERT INTO "transaction" (amount, type, client_id) VALUES (100.00, 'CREDIT', 4);
INSERT INTO "transaction" (amount, type, client_id) VALUES (50.00, 'DEBIT', 4);
INSERT INTO BALANCE (amount, client_id) VALUES (50.00, 1);
INSERT INTO BALANCE (amount, client_id) VALUES (50.00, 2);
INSERT INTO BALANCE (amount, client_id) VALUES (50.00, 3);
INSERT INTO BALANCE (amount, client_id) VALUES (50.00, 4);
