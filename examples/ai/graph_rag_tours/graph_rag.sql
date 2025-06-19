/* nile.tenant_id is already set in the session */

/*
Finds the shortest path between the two POIs that are most semantically
similar to the user's query.
*/
WITH nearest_nodes AS (
    SELECT array_agg(poi_id) as ids
    FROM (
        SELECT poi_id
        FROM points_of_interest
        ORDER BY embedding <=> %s
        LIMIT 2
    ) as nearest
)
SELECT p.name, p.activity, p.description, d.agg_cost
FROM nearest_nodes, pgr_dijkstra(
    'SELECT row_number() OVER() AS id, source_poi as source, target_poi as target, cost FROM poi_links',
    (SELECT ids[1] FROM nearest_nodes),
    (SELECT ids[2] FROM nearest_nodes),
    false
) AS d
JOIN points_of_interest p ON p.poi_id = d.node
ORDER BY d.seq;
