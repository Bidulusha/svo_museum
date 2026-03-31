-- Создаем пользователя если не существует
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'svo_museum_user') THEN
        CREATE USER svo_museum_user WITH PASSWORD 'N*nsRe8GvQ+GE*h';
    END IF;
END
$$;

-- Создаем базу данных если не существует
SELECT 'CREATE DATABASE svo_museum_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'svo_museum_db')\gexec

-- Подключаемся к базе
\c svo_museum_db

-- Даем права на схему public
GRANT ALL ON SCHEMA public TO svo_museum_user;
GRANT ALL PRIVILEGES ON DATABASE svo_museum_db TO svo_museum_user;

-- Создаем ENUM типы с проверкой существования через DO
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'application_status') THEN
        CREATE TYPE application_status AS ENUM (
            'submitted',
            'needs editing',
            'accepted'
        );
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'excursion_status') THEN
        CREATE TYPE excursion_status AS ENUM (
            'waiting accepting',
            'accepted',
            'moved',
            'cancelled',
            'succeed'
        );
    END IF;
END
$$;

-- Создаем таблицу
CREATE TABLE IF NOT EXISTS public.applications (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY (INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1),
    visit_date date NOT NULL,
    visit_time time without time zone NOT NULL,
    organization text NOT NULL,
    higher_school character varying(32) NOT NULL,
    course smallint NOT NULL,
    group_of integer NOT NULL,
    count_of_customers smallint NOT NULL,
    name_of_accompanying text NOT NULL,
    phone_number_of_accompanying character varying(32) NOT NULL,
    status_of_application application_status,
    status_of_excursion excursion_status,
    feedback text,
    real_count_of_customers smallint,
    CONSTRAINT applications_pkey PRIMARY KEY (id)
);

-- Даем права на таблицу и последовательности
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO svo_museum_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO svo_museum_user;