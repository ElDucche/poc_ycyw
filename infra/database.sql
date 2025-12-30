-- Création des tables pour l'application Your Car Your Way
-- SGBD Cible : PostgreSQL
-- Convention : snake_case, sans guillemets

-- 1. Table des Agences
CREATE TABLE agency (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    opening_hours VARCHAR(255)
);

-- 2. Table des Utilisateurs (Renommée app_user pour éviter le mot-clé réservé 'user')
CREATE TABLE app_user (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date DATE,
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table des Véhicules
CREATE TABLE vehicle (
    id BIGSERIAL PRIMARY KEY,
    acriss_code VARCHAR(4) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'AVAILABLE',
    agency_id BIGINT REFERENCES agency(id)
);

-- 4. Table des Réservations
CREATE TABLE booking (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES app_user(id),
    vehicle_id BIGINT NOT NULL REFERENCES vehicle(id),
    departure_agency_id BIGINT NOT NULL REFERENCES agency(id),
    return_agency_id BIGINT NOT NULL REFERENCES agency(id),
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'CONFIRMED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT check_dates CHECK (end_date > start_date)
);

-- 5. Table des Paiements
CREATE TABLE payment (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT UNIQUE NOT NULL REFERENCES booking(id),
    stripe_payment_intent_id VARCHAR(255) UNIQUE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Table des Messages
CREATE TABLE message (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES app_user(id),
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_from_user BOOLEAN DEFAULT TRUE,
    is_read BOOLEAN DEFAULT FALSE
);

-- Index pour optimiser les performances
CREATE INDEX idx_booking_user ON booking(user_id);
CREATE INDEX idx_vehicle_acriss ON vehicle(acriss_code);
CREATE INDEX idx_message_user ON message(user_id);

-- SEED DATA
INSERT INTO agency (name, city, address, opening_hours) VALUES 
('Agence Paris Gare de Lyon', 'Paris', 'Place Louis Armand, 75012 Paris', '08:00-20:00');

INSERT INTO app_user (email, password_hash, first_name, last_name, birth_date, address) VALUES
('client@example.com', 'hashedpassword123', 'Jean', 'Dupont', '1985-05-15', '10 Rue de la Paix, Paris'),
('support@example.com', 'hashedpassword456', 'Marie', 'Curie', '1990-11-07', 'Support Center HQ');
