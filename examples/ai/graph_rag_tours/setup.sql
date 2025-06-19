DROP TABLE IF EXISTS poi_links, points_of_interest;

-- tenant-aware POIs
CREATE TABLE points_of_interest (
  tenant_id  uuid    NOT NULL,
  poi_id     bigint  NOT NULL,
  name       text    NOT NULL,
  description text   NOT NULL,
  activity   text NOT NULL DEFAULT 'unknown',
  embedding  vector(1536),
  PRIMARY KEY (tenant_id, poi_id)
);

-- tenant-aware links between POIs
CREATE TABLE poi_links (
  tenant_id  uuid    NOT NULL,
  source_poi bigint  NOT NULL,
  target_poi bigint  NOT NULL,
  cost       float8  NOT NULL,
  link_type  text,              -- e.g. 'nearby', 'same_activity'
  PRIMARY KEY (tenant_id, source_poi, target_poi)
);

CREATE INDEX IF NOT EXISTS poi_links_src_idx ON poi_links (tenant_id, source_poi);
CREATE INDEX IF NOT EXISTS poi_links_tgt_idx ON poi_links (tenant_id, target_poi);
CREATE INDEX IF NOT EXISTS poi_tenant_activity_idx ON points_of_interest (tenant_id, activity);

-- create an HNSW index on the embedding column
CREATE INDEX poi_embedding_idx
  ON points_of_interest
  USING hnsw (embedding vector_cosine_ops)
  WITH (
    m               = 16,
    ef_construction = 64
  );

INSERT INTO tenants (id, name) VALUES ('f399d29c-c8ef-43a9-95e5-cd3b4a3c0100', 'SurfCo Travel');
INSERT INTO tenants (id, name) VALUES ('0b1f6ae9-1e62-45f6-92fe-1a274adc0222', 'TrailBlaze Adventures');
INSERT INTO tenants (id, name) VALUES ('9e6be4c2-133a-436a-b4ce-56bada7e0333', 'WineCountry Tours');