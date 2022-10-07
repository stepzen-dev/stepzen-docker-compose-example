CREATE TABLE portfolio (
    symbol VARCHAR(16) NOT NULL,
    nshares INT NOT NULL
);
INSERT INTO portfolio (symbol, nshares)
VALUES ('AAPL', 100),
       ('MSFT', 200),
       ('TSLA', 300),
       ('GOOG', 400);
