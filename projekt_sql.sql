--Tomasz Stelągowski
--3ci etap zadania zaliczeniowego
--Creaty i Skrypty PL/SQL

DROP TABLE to_do_lists;
DROP TABLE to_do_items;
DROP TABLE to_do_single_items;
DROP TABLE travel_time;
DROP TABLE events;
DROP TABLE locations;
DROP TABLE types;
DROP TABLE users;
DROP TABLE links;

DROP VIEW view_get_task_list;

DROP SEQUENCE links_id;
DROP SEQUENCE single_items_id;
DROP SEQUENCE types_id;
DROP SEQUENCE locations_id;
DROP SEQUENCE events_id;
DROP SEQUENCE travel_time_id;
DROP SEQUENCE to_do_single_items_id;
DROP SEQUENCE to_do_items_id;
DROP SEQUENCE to_do_lists_id;

DROP TRIGGER links_insert_id;
DROP TRIGGER users_insert_id;
DROP TRIGGER types_insert_id;
DROP TRIGGER locations_insert_id;
DROP TRIGGER events_insert_id;
DROP TRIGGER travel_time_insert_id;
DROP TRIGGER to_do_single_items_insert_id;
DROP TRIGGER to_do_items_insert_id;
DROP TRIGGER to_do_lists_insert_id;



--tabela Links
CREATE TABLE links (
	id INTEGER PRIMARY KEY,
	name VARCHAR(20) UNIQUE,
	link VARCHAR(250) UNIQUE
);

--tabela users
CREATE TABLE users (
	id INTEGER PRIMARY KEY,
	login VARCHAR(10) UNIQUE,
	password RAW(16) NOT NULL,
	name VARCHAR(10),
	surname VARCHAR(20),
	from_usos char(1) NOT NULL CHECK (from_usos IN ('Y','N')),
	CONSTRAINT login_or_name 
		CHECK (NOT(login IS NULL AND name IS NULL AND surname IS NULL)
			AND ((name IS NOT NULL AND surname IS NOT NULL) OR (name IS NULL AND surname IS NULL)))
);

--events types
CREATE TABLE types (
	id INTEGER PRIMARY KEY,
	name VARCHAR(10) UNIQUE,
	description VARCHAR(250)
);
INSERT INTO types (name, description) VALUES ('GENERAL', 'General type fo all untyped events');


--lokalizacje *(dodane)
CREATE TABLE locations (
	id INTEGER PRIMARY KEY,
	name VARCHAR(10),
	street VARCHAR(250),
	home_number VARCHAR(10),
	zip_code VARCHAR(6),
	CONSTRAINT unique_address UNIQUE ( street, home_number, zip_code )
);

--tabela events
CREATE TABLE events (
	id INTEGER PRIMARY KEY,
	name VARCHAR(10),
	start_time DATE,
	end_time DATE,
	full_day char(1) CHECK (full_day IN ('Y','N')),
	type INTEGER REFERENCES types,
	attended char(1) CHECK (attended IN ('Y','N')),
	c_user INTEGER REFERENCES users,
	t_user INTEGER REFERENCES users,
	location INTEGER REFERENCES locations,
	CONSTRAINT is_full_day 
		CHECK ((full_day='Y' AND end_time IS NULL) OR (full_day='N' AND end_time IS NOT NULL))
);

--czasy podróży
CREATE TABLE travel_time (
	id INTEGER PRIMARY KEY,
	from_dest INTEGER REFERENCES locations,
	to_dest INTEGER REFERENCES locations,
	start_time DATE,
	end_time DATE,
	arrival char(1) NOT NULL CHECK (arrival IN ('Y','N')),
	event INTEGER REFERENCES events
);

-- To do single items
CREATE TABLE to_do_single_items (
	id INTEGER PRIMARY KEY,
	name VARCHAR(20),
	type INTEGER NOT NULL REFERENCES types,
	c_user INTEGER NOT NULL REFERENCES users,
	t_user INTEGER NOT NULL REFERENCES users
);

-- To do items
CREATE TABLE to_do_items (
	id INTEGER PRIMARY KEY,
	event_item INTEGER REFERENCES events,
	single_item INTEGER REFERENCES to_do_single_items,
	done CHAR(1) NOT NULL CHECK (done IN ('Y','N')),
	CONSTRAINT one_item 
		CHECK ((event_item IS NULL AND single_item IS NOT NULL) 
			OR (event_item IS NOT NULL AND single_item IS NULL))
);


--To do List
CREATE TABLE to_do_lists (
	id INTEGER PRIMARY KEY,
	day DATE,
	rank INTEGER,
	item INTEGER REFERENCES to_do_items
);

-----------------------------------------------------------
-- Blok odpowiadający za autoincrementy kluczy głównych tabel

CREATE SEQUENCE links_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE users_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE types_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE locations_id START WITH 1 INCREMENT BY 1;
--single items are addition to events to appear on to do lists therefor
--I prefer indexing them with common index
CREATE SEQUENCE events_or_single_item_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE travel_time_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE to_do_items_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE to_do_lists_id START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER links_insert_id BEFORE INSERT ON links
FOR EACH ROW
BEGIN
	SELECT links_id.nextval INTO :NEW.id from dual;
END;
/

CREATE OR REPLACE TRIGGER users_insert_id BEFORE INSERT ON users
FOR EACH ROW
BEGIN
	SELECT users_id.nextval INTO :NEW.id from dual;
END;
/

CREATE OR REPLACE TRIGGER types_insert_id BEFORE INSERT ON types
FOR EACH ROW
BEGIN
	SELECT types_id.nextval INTO :NEW.id from dual;
END;
/

CREATE OR REPLACE TRIGGER locations_insert_id BEFORE INSERT ON locations
FOR EACH ROW
BEGIN
	SELECT locations_id.nextval INTO :NEW.id from dual;
END;
/

CREATE OR REPLACE TRIGGER events_insert_id BEFORE INSERT ON events
FOR EACH ROW
BEGIN
	SELECT events_or_single_item_id.nextval INTO :NEW.id from dual;
END;
/

CREATE OR REPLACE TRIGGER travel_time_insert_id BEFORE INSERT ON travel_time
FOR EACH ROW
BEGIN
	SELECT travel_time_id.nextval INTO :NEW.id from dual;
	SELECT NVL( :NEW.arrival, 'N' ) INTO :NEW.arrival from dual;
END;
/

CREATE OR REPLACE TRIGGER to_do_single_items_insert_id BEFORE INSERT ON to_do_single_items
FOR EACH ROW
BEGIN
	SELECT events_or_single_item_id.nextval INTO :NEW.id from dual;
END;
/

CREATE OR REPLACE TRIGGER to_do_items_insert_id BEFORE INSERT ON to_do_items
FOR EACH ROW
BEGIN
	SELECT to_do_items_id.nextval INTO :NEW.id from dual;
END;
/

CREATE OR REPLACE TRIGGER to_do_lists_insert_id BEFORE INSERT ON to_do_lists
FOR EACH ROW
BEGIN
	SELECT to_do_lists_id.nextval INTO :NEW.id from dual;
END;
/


--Koniec bloku odpowiadającego za autoincrementy
-----------------------------------------------------------


-------------------------------------------------
-- Blok Widoków
CREATE VIEW view_get_task_list AS
	SELECT B.id, A.name, A.type, A.c_user, A.t_user,  B.done, C.day, C.rank
	FROM to_do_single_items A, to_do_items B, to_do_lists C
	WHERE B.id = C.item and B.single_item = A.id
	UNION
	SELECT B.id, A.name, A.type, A.c_user, A.t_user,  B.done, C.day, C.rank
	FROM events A, to_do_items B, to_do_lists C
	WHERE B.id = C.item and B.event_item = A.id;

-- koniec bloku widoków 
-------------------------------------------------



-------------------------------------------------
-- Blok funkcji

--new user
CREATE OR REPLACE PROCEDURE add_user (login IN VARCHAR, name IN VARCHAR, surname IN VARCHAR, password IN VARCHAR)
IS
	enc_pass RAW(32);
BEGIN
	select standard_hash(add_user.password, 'MD5') INTO enc_pass from dual;
	IF login IS NOT NULL THEN
		INSERT INTO users (login, password, from_usos) VALUES (add_user.login, enc_pass, 'N');
	ELSE
		INSERT INTO users (name, surname, password, from_usos) VALUES (add_user.name, add_user.surname, enc_pass, 'N');
	END IF;
END;
/


--create task
CREATE OR REPLACE PROCEDURE add_to_do_item (name IN VARCHAR, type IN INT, c_user IN INT, t_user IN INT, datum IN DATE, rank IN INT)
IS
	last_single_item INT;
	last_to_do_item INT;
BEGIN
	INSERT INTO to_do_single_items (name, type, c_user, t_user) VALUES (name, type, c_user, t_user) RETURNING id INTO last_single_item;
	INSERT INTO to_do_items (single_item, done) VALUES (last_single_item, 'N') RETURNING id INTO last_to_do_item;
	INSERT INTO to_do_lists (day, rank, item) VALUES (datum, rank, last_to_do_item);
END;
/


--Zmiana dnia listy zadan
CREATE OR REPLACE PROCEDURE change_day_of_to_do_list (now_day IN DATE, new_day IN DATE)
IS
	nr INT;
	CURSOR current_list IS 
		SELECT day, rank FROM to_do_lists WHERE TRUNC(day, 'DD') = TRUNC(change_day_of_to_do_list.now_day, 'DD') 
		ORDER BY rank ASC FOR UPDATE OF day, rank;
BEGIN
	SELECT MAX(rank)+1 INTO nr FROM to_do_lists WHERE TRUNC(day, 'DD') = TRUNC(change_day_of_to_do_list.new_day, 'DD');
	FOR item_on_list IN current_list
	LOOP
		UPDATE to_do_lists SET day=change_day_of_to_do_list.new_day, rank=nr 
		WHERE CURRENT OF current_list;
		COMMIT;
		nr:=nr+1;
	END LOOP;
END;
/

--Koniec Bloku funkcji
------------------------------------------------