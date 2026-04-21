-- 01-init.sql (runs automatically on first start)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Production roles
CREATE ROLE backend_user WITH LOGIN PASSWORD '${POSTGRES_PASSWORD}';
CREATE ROLE backend_ro  WITH LOGIN PASSWORD '${POSTGRES_RO_PASSWORD:-ro_pass}' NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;

ALTER ROLE backend_user SET default_transaction_isolation = 'read committed';
ALTER ROLE backend_user SET search_path = 'public';

-- Indexes for performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_email ON users (lower(email));
