CREATE TABLE trail_segments (
    trail_segments_id SERIAL PRIMARY KEY,
    stewards_id INTEGER REFERENCES stewards(stewards_id)
        ON DELETE CASCADE,
    motor_vehicles VARCHAR,
    foot VARCHAR,
    bicycle VARCHAR,
    horse VARCHAR,
    ski VARCHAR,
    wheelchair VARCHAR,
    osm_tags VARCHAR,
    geometry JSON
);

CREATE TABLE named_trails (
    named_trails_id SERIAL PRIMARY KEY,
    name VARCHAR,
    trail_segments_ids INTEGER REFERENCES trail_segments(trail_segments_ids)
        ON DELETE CASCADE,
    description VARCHAR,
    part_of VARCHAR
);

CREATE TABLE trailheads (
    trailheads_id SERIAL PRIMARY KEY,
    name VARCHAR,
    trail_segments_ids INTEGER REFERENCES trail_segments(trail_segments_ids)
        ON DELETE CASCADE,
    stewards_id INTEGER REFERENCES stewards(stewards_id) ON DELETE CASCADE,
    address VARCHAR,
    parking VARCHAR,
    drinkwater VARCHAR,
    restrooms VARCHAR,
    kiosk VARCHAR,
    osm_tags VARCHAR
    geometry JSON
);

CREATE TABLE stewards (
    stewards_id SERIAL PRIMARY KEY,
    name VARCHAR,
    url VARCHAR,
    phone VARCHAR,
    address VARCHAR,
    publisher VARCHAR,
    license VARCHAR
);

CREATE TABLE areas (
    areas_id SERIAL PRIMARY KEY,
    name VARCHAR,
    stewards_id INTEGER REFERENCES stewards(stewards_id) ON DELETE CASCADE,
    url VARCHAR,
    osm_tags VARCHAR
    geometry JSON
);

ALTER TABLE trail_segments OWNER TO trailseditor_user;
ALTER TABLE named_trails OWNER TO trailseditor_user;
ALTER TABLE trailheads OWNER TO trailseditor_user;
ALTER TABLE stewards OWNER TO trailseditor_user;
ALTER TABLE areas OWNER TO trailseditor_user;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO trailseditor_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO trailseditor_user;