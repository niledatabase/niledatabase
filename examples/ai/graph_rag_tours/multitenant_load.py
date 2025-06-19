import os, textwrap, uuid, openai, psycopg2, psycopg2.extras
import numpy as np
from pgvector.psycopg2 import register_vector
from collections import defaultdict

# ---- tenant-specific corpora ----------------------------------------------
TENANTS = {
    uuid.UUID("f399d29c-c8ef-43a9-95e5-cd3b4a3c0100"): [  # SurfCo
        ["Steamer Lane", """
            Steamer Lane in Santa Cruz offers world-class right-hand reef breaks
            and iconic surf culture just south of San Francisco.
        """, "surf"],
        ["Pacifica", """
            Pacifica's Linda Mar beach is a forgiving sand-bottom break ideal
            for beginners, with a vibrant local scene.
        """, "surf"],
        ["Ocean Beach", """
            Ocean Beach in San Francisco is a challenging beach break known for
            powerful waves and strong currents, for experts only.
        """, "surf"],
        ["Mavericks", """
            Mavericks near Half-Moon Bay sees 50-ft winter waves, a rite of
            passage for elite big-wave surfers.
        """, "surf"],
        ["Blacks Beach", """
            Blacks Beach in La Jolla delivers powerful barrels thanks to the
            steep submarine canyon off shore.
        """, "surf"],
    ],
    uuid.UUID("0b1f6ae9-1e62-45f6-92fe-1a274adc0222"): [  # TrailBlaze
        ["El Capitan, Yosemite", """
            El Capitan's 3 000-ft Nose route is a granite epic and the benchmark
            of big-wall free climbing.
        """, "climb"],
        ["Hidden Valley, Joshua Tree", """
            Hidden Valley offers coarse monzogranite, bomber cracks and stellar
            winter camping under desert skies.
        """, "climb"],
        ["Zion National Park", """
            Zion's towering sandstone cliffs offer world-renowned multi-pitch
            routes and breathtaking canyoneering adventures.
        """, "climb"],
        ["Mount Whitney", """
            The highest peak in the contiguous U.S., Mount Whitney's 22-mile
            round trip is a challenging, high-altitude trek.
        """, "hike"],
        ["Cone Peak, Big Sur", """
            Cone Peak rises 5 155 ft just three miles from the Pacific, making
            it one of North America's steepest coastal ascents.
        """, "hike"],
    ],
    uuid.UUID("9e6be4c2-133a-436a-b4ce-56bada7e0333"): [  # WineCountry
        ["Bixby Bridge", """
            Bixby Creek Bridge on Hwy 1 frames dramatic Pacific vistas and the
            gateway to Carmel wine country.
        ""","sightseeing"],
        ["Paso Robles", """
            Paso Robles is known for its bold Cabernet Sauvignon and Zinfandel,
            with a laid-back, rustic tasting room culture.
        """, "wine"],
        ["Healdsburg", """
            Nestled in Sonoma County, Healdsburg is a hub for tasting Pinot Noir,
            Chardonnay, and Zinfandel from three prestigious AVAs.
        """, "wine"],
        ["Stags Leap AVA", """
            Napa's Stags Leap District is famed for cabernet soils of volcanic
            tuff and river-bed loam.
        ""","wine"],
        ["Russian River Valley", """
            The Russian River Valley in Sonoma offers renowned pinot noir,
            coastal fog and redwood-lined backroads.
        ""","wine"],
    ],
}

openai.api_key  = os.getenv("OPENAI_API_KEY")
conn            = psycopg2.connect(os.getenv("DATABASE_URL"))
psycopg2.extras.register_uuid()
register_vector(conn)

def embed(text: str) -> list[float]:
    return openai.embeddings.create(
        model="text-embedding-3-small",
        input=text
    ).data[0].embedding

with conn, conn.cursor() as cur:
    # Clear tables before loading
    truncate_query = "TRUNCATE TABLE poi_links, points_of_interest"
    print(truncate_query)
    cur.execute(truncate_query)
    conn.commit() # avoid mixing dml and ddl in the same transaction
    poi_id_counter = 1
    for tenant_id, docs in TENANTS.items():
        tenant_rows = [] # we collect the generated ids here, so we can use them in the edges
        # insert nodes and collect the generated ids
        print(f"Loading {len(docs)} points of interest for tenant {tenant_id}")
        for title, description, activity in docs:
            description = textwrap.dedent(description).strip()
            embedding = embed(description)
            query = """
                INSERT INTO points_of_interest
                       (tenant_id, poi_id, name, description, activity, embedding)
                VALUES (%s, %s, %s, %s, %s, %s)
            """
            params = (tenant_id, poi_id_counter, title, description, activity, np.array(embedding))
            # print(cur.mogrify(query, params).decode('utf-8')) # Optional: uncomment for debugging
            cur.execute(query, params)
            tenant_rows.append((poi_id_counter, activity))
            poi_id_counter += 1

        # Generate linear graph edges for each activity
        edges = []
        
        # Group POIs by activity
        activity_groups = defaultdict(list)
        for poi_id, activity in tenant_rows:
            activity_groups[activity].append(poi_id)

        # The activity linking is a bit arbitrary, but it's a good way to get a sense of the graph structure
        # In real life, you'll probably connect them based on geographic proximity or other criteria
        for activity, poi_ids in activity_groups.items():
            for i in range(len(poi_ids) - 1):
                src_id = poi_ids[i]
                tgt_id = poi_ids[i+1]
                # Using fixed cost for simplicity, but in real life you'll probably use something like distance
                edges.append((tenant_id, src_id, tgt_id, 1.0, 'same_activity'))
                edges.append((tenant_id, tgt_id, src_id, 1.0, 'same_activity'))  # reverse path for bidirectional links


        if edges:
            print(f"Loading {len(edges)} edges for tenant {tenant_id}")
            query = """
                INSERT INTO poi_links
                       (tenant_id, source_poi, target_poi, cost, link_type)
                VALUES (%s, %s, %s, %s, %s)
                """
            cur.executemany(
                query,
                edges,
            )
        conn.commit() # commit after each tenant