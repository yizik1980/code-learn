import type { Lesson } from '../../types'

export const gisLessons: Lesson[] = [
  // ─── שיעור 1 ───────────────────────────────────────────────────────────────
  {
    id: 'gis-intro',
    title: 'מבוא ל-GIS — מושגי יסוד',
    summary: 'מה זה GIS, מערכות קואורדינטות, CRS, שכבות ופורמטי נתונים גיאוגרפיים',
    emoji: '🌍',
    content: [
      { type: 'heading', text: 'מה זה GIS?' },
      {
        type: 'text',
        text: 'GIS (Geographic Information System) היא מערכת לאיסוף, אחסון, ניתוח והצגת נתונים שקשורים למיקום גיאוגרפי. כל אובייקט מקבל קואורדינטות (lon/lat) ומאפיינים (attributes) — כמו מסד נתונים שכל שורה בו קשורה לנקודה, קו או פוליגון על פני כדור הארץ.',
      },
      {
        type: 'table',
        caption: 'רכיבי GIS עיקריים',
        headers: ['רכיב', 'תיאור', 'דוגמה'],
        rows: [
          ['Layer (שכבה)', 'אוסף אובייקטים מאותו סוג', 'כל הכבישים בישראל'],
          ['Feature (אובייקט)', 'אובייקט גיאוגרפי בודד עם geometry ו-attributes', 'כביש מספר 1'],
          ['Geometry', 'הייצוג המרחבי — נקודה, קו, פוליגון', 'LINESTRING(34.7 31.9, ...)'],
          ['Attribute', 'מידע תיאורי על האובייקט', 'שם, אורך, מהירות מותרת'],
          ['CRS', 'מערכת הקואורדינטות', 'WGS84, ITM'],
          ['Basemap', 'מפת רקע', 'OpenStreetMap, Google Maps'],
        ],
      },
      { type: 'heading', text: 'מערכות קואורדינטות (CRS)' },
      {
        type: 'text',
        text: 'CRS (Coordinate Reference System) מגדירה איך ממפים נקודות על פני כדור הארץ לזוג מספרים. WGS84 (EPSG:4326) היא הסטנדרט הגלובלי — זוג lon/lat בדרגות. לישראל משתמשים ב-ITM (Israeli Transverse Mercator, EPSG:2039) — מטרים מנקודת ייחוס. חובה לדעת באיזה CRS נמצאים הנתונים לפני כל פעולה מרחבית.',
      },
      {
        type: 'code',
        lang: 'python',
        caption: 'CRS — המרה בין מערכות קואורדינטות',
        code: `from pyproj import Transformer, CRS

# ─── WGS84 (lon/lat) ↔ ITM (מטרים) ───────────────────────
transformer_to_itm = Transformer.from_crs(
    "EPSG:4326",   # WGS84
    "EPSG:2039",   # ITM
    always_xy=True
)

transformer_to_wgs = Transformer.from_crs(
    "EPSG:2039",
    "EPSG:4326",
    always_xy=True
)

# המרת נקודה: תל אביב
lon, lat = 34.7818, 32.0853

x_itm, y_itm = transformer_to_itm.transform(lon, lat)
print(f"ITM: {x_itm:.0f}, {y_itm:.0f}")
# ITM: 181722, 664325

# בחזרה ל-WGS84
lon2, lat2 = transformer_to_wgs.transform(x_itm, y_itm)
print(f"WGS84: {lon2:.6f}, {lat2:.6f}")
# WGS84: 34.781800, 32.085300

# ─── CRS נפוצות ───────────────────────────────────────────
# EPSG:4326 — WGS84, lon/lat, גלובלי
# EPSG:3857 — Web Mercator, מטרים, שימוש בGoogle/OSM tiles
# EPSG:2039 — ITM, מטרים, ישראל
# EPSG:32636 — UTM Zone 36N, מטרים, אזור ישראל`,
      },
      { type: 'heading', text: 'פורמטי נתונים גיאוגרפיים' },
      {
        type: 'table',
        caption: 'פורמטים נפוצים',
        headers: ['פורמט', 'סיומת', 'שימוש', 'יתרון'],
        rows: [
          ['GeoJSON', '.geojson', 'ווב, APIs', 'קריא, JSON סטנדרטי'],
          ['Shapefile', '.shp + .dbf + .prj', 'GIS קלאסי', 'נפוץ, תמיכה רחבה'],
          ['GeoPackage', '.gpkg', 'SQLite מרחבי', 'קובץ אחד, FOSS'],
          ['PostGIS', 'DB table', 'ניתוח מרחבי כבד', 'SQL + spatial index'],
          ['GeoTIFF', '.tif', 'Raster (תמונות)', 'DEM, satellite imagery'],
          ['WKT/WKB', 'text/binary', 'DB, APIs', 'קומפקטי, ביצועים'],
        ],
      },
      {
        type: 'code',
        lang: 'json',
        caption: 'GeoJSON — פורמט הסטנדרט לווב',
        code: `{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [34.7818, 32.0853]
      },
      "properties": {
        "name": "תל אביב",
        "population": 460000,
        "country": "IL"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [34.7818, 32.0853],
          [35.2137, 31.7683]
        ]
      },
      "properties": {
        "name": "כביש 1",
        "length_km": 65
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [34.75, 32.05],
          [34.82, 32.05],
          [34.82, 32.12],
          [34.75, 32.12],
          [34.75, 32.05]
        ]]
      },
      "properties": {
        "name": "אזור תל אביב",
        "area_km2": 52
      }
    }
  ]
}`,
      },
      {
        type: 'tip',
        text: 'תמיד בדוק את ה-CRS לפני ניתוח! שכבה ב-WGS84 ושכבה ב-ITM לא יסתדרו יחד. כל חישוב מרחק/שטח ב-WGS84 (דרגות) יהיה שגוי — יש להמיר ל-CRS מטרי כמו ITM לפני חישובים.',
      },
    ],
    questionBank: [
      {
        id: 'gis-intro-q1',
        text: 'מה ההבדל בין CRS WGS84 ל-ITM?',
        options: [
          'WGS84 מדויק יותר',
          'WGS84 = קואורדינטות בדרגות (lon/lat), גלובלי; ITM = מטרים, מותאם לישראל לחישובים מדויקים',
          'ITM גלובלי, WGS84 מקומי',
          'אין הבדל',
        ],
        correct: 1,
        explanation: 'WGS84 (EPSG:4326) הוא הסטנדרט הגלובלי (lon/lat בדרגות) — GPS משתמש בו. ITM (EPSG:2039) מבוסס מטרים ומותאם לישראל. לחישובי מרחק ושטח בישראל — תמיד ITM.',
      },
      {
        id: 'gis-intro-q2',
        text: 'מה Geometry בהקשר GIS?',
        options: [
          'חישוב מתמטי',
          'הייצוג המרחבי של אובייקט — Point, LineString, Polygon ועוד',
          'מטאדאטה של שכבה',
          'צבע על המפה',
        ],
        correct: 1,
        explanation: 'Geometry = הצורה הגיאוגרפית: Point (נקודה אחת), LineString (קו מרצף נקודות), Polygon (שטח סגור). Feature = Geometry + Attributes (מאפיינים עסקיים).',
      },
      {
        id: 'gis-intro-q3',
        text: 'למה GeoJSON הפך לסטנדרט ה-ווב?',
        options: [
          'כי הוא הכי קטן',
          'כי הוא JSON סטנדרטי — נתמך בכל שפה, קריא אנושית, עובד ישירות עם APIs ו-JavaScript',
          'כי הוא מהיר יותר מShapefile',
          'כי Google ממליצה עליו',
        ],
        correct: 1,
        explanation: 'GeoJSON = JSON + geometry מרחבית. כל REST API יכול להחזיר GeoJSON, כל ספריית מפות (Leaflet, Mapbox) קוראת אותו ישירות. Shapefile = 3+ קבצים בפורמט בינארי ישן.',
      },
      {
        id: 'gis-intro-q4',
        text: 'מה Web Mercator (EPSG:3857) משמש לו?',
        options: [
          'חישובי מרחק מדויקים',
          'Tiles של מפות ווב (Google Maps, OpenStreetMap) — מאפשר tiles מרובעות אחידות',
          'ניתוח סטטיסטי',
          'GPS tracking',
        ],
        correct: 1,
        explanation: 'Web Mercator = projection שמאפשר tiles מרובעות אחידות בגדלים 256x256. כל שכבת tile ב-Google/OSM משתמשת בה. לא מדויק לחישובי שטח/מרחק — מעוות קטבים.',
      },
      {
        id: 'gis-intro-q5',
        text: 'מה GeoPackage עדיף על Shapefile?',
        options: [
          'GeoPackage מהיר יותר תמיד',
          'GeoPackage = קובץ SQLite אחד עם כל השכבות; Shapefile = לפחות 3 קבצים, מגבלת 2GB ו-10 תווים לשם עמודה',
          'Shapefile לא תומך ב-Polygon',
          'אין הבדל',
        ],
        correct: 1,
        explanation: 'Shapefile: .shp + .dbf + .prj + .shx = 4+ קבצים, מגבלת שם עמודה 10 תווים, 2GB. GeoPackage: SQLite אחד, ללא מגבלות אלו, OGC standard מודרני.',
      },
    ],
  },

  // ─── שיעור 2 ───────────────────────────────────────────────────────────────
  {
    id: 'gis-postgis',
    title: 'PostGIS — SQL מרחבי',
    summary: 'הרחבת PostgreSQL לנתונים גיאוגרפיים: ST_ functions, spatial indexes ו-queries מרחביים',
    emoji: '🗄️',
    content: [
      { type: 'heading', text: 'PostGIS — הקדמה' },
      {
        type: 'text',
        text: 'PostGIS היא הרחבה ל-PostgreSQL שמוסיפה סוגי נתונים גיאוגרפיים (geometry, geography) ומאות פונקציות ST_ לניתוח מרחבי. היא הסטנדרט ה-de-facto לניתוח GIS בסיסי-נתונים — מאפשרת JOIN, filter, aggregate על נתונים גיאוגרפיים בדיוק כמו כל שאילתת SQL.',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'PostGIS — התקנה וטבלאות ראשונות',
        code: `-- הפעלת PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;

-- בדיקת גרסה
SELECT PostGIS_Full_Version();

-- ─── יצירת טבלאות עם geometry ────────────────────────────
CREATE TABLE cities (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    population  INT,
    location    geometry(Point, 4326)   -- Point ב-WGS84
);

CREATE TABLE roads (
    id          SERIAL PRIMARY KEY,
    name        TEXT,
    road_type   TEXT,
    geom        geometry(LineString, 2039)  -- קו ב-ITM
);

CREATE TABLE districts (
    id          SERIAL PRIMARY KEY,
    name        TEXT,
    geom        geometry(MultiPolygon, 4326)
);

-- ─── הוספת נתונים ─────────────────────────────────────────
INSERT INTO cities (name, population, location) VALUES
    ('תל אביב',  460000, ST_SetSRID(ST_MakePoint(34.7818, 32.0853), 4326)),
    ('ירושלים',  970000, ST_SetSRID(ST_MakePoint(35.2137, 31.7683), 4326)),
    ('חיפה',     285000, ST_SetSRID(ST_MakePoint(34.9896, 32.7940), 4326));

-- ─── Spatial Index — חובה לביצועים ────────────────────────
CREATE INDEX idx_cities_location  ON cities  USING GIST(location);
CREATE INDEX idx_roads_geom       ON roads   USING GIST(geom);
CREATE INDEX idx_districts_geom   ON districts USING GIST(geom);`,
      },
      { type: 'heading', text: 'ST_ Functions — פונקציות מרחביות' },
      {
        type: 'text',
        text: 'פונקציות ST_ (Spatial Type) הן הלב של PostGIS. ST_Distance מחשבת מרחק, ST_Buffer יוצרת אזור סביב אובייקט, ST_Intersects בודקת חפיפה, ST_Within בודקת שייכות. חשוב: ST_Distance על geometry מחזירה תוצאה ביחידות ה-CRS (דרגות ב-WGS84, מטרים ב-ITM). לחישוב מרחק מדויק בקילומטרים — השתמש ב-geography type או המר ל-ITM.',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'ST_ Functions — מרחק, buffer, intersect',
        code: `-- ─── מרחק בין ערים ──────────────────────────────────────
-- geography type: מרחק במטרים, מדויק על כדור
SELECT
    a.name,
    b.name,
    ST_Distance(
        a.location::geography,
        b.location::geography
    ) / 1000 AS distance_km
FROM cities a, cities b
WHERE a.id < b.id
ORDER BY distance_km;

-- תוצאה:
-- תל אביב | ירושלים | 55.6 km
-- תל אביב | חיפה    | 87.2 km

-- ─── Buffer — אזור X מטר מסביב ───────────────────────────
-- ערים בתוך 100 ק"מ מתל אביב
SELECT name, population
FROM cities
WHERE ST_DWithin(
    location::geography,
    (SELECT location::geography FROM cities WHERE name = 'תל אביב'),
    100000   -- מטרים
);

-- ─── Spatial JOIN — ערים בתוך מחוז ─────────────────────
SELECT c.name AS city, d.name AS district
FROM cities c
JOIN districts d ON ST_Within(c.location, d.geom);

-- ─── ST_Intersects — כבישים שעוברים במחוז ──────────────
SELECT r.name AS road, d.name AS district
FROM roads r
JOIN districts d ON ST_Intersects(r.geom, ST_Transform(d.geom, 2039));

-- ─── Aggregate — גודל ממוצע של מחוזות ───────────────────
SELECT
    name,
    ST_Area(geom::geography) / 1_000_000 AS area_km2,
    ST_Perimeter(geom::geography) / 1000  AS perimeter_km
FROM districts
ORDER BY area_km2 DESC;`,
      },
      { type: 'heading', text: 'ניתוח מרחבי מתקדם' },
      {
        type: 'text',
        text: 'PostGIS תומך בפעולות גיאומטריות מורכבות: ST_Union מאחדת פוליגונים, ST_Difference מחסרת, ST_Intersection מחזירה חפיפה, ST_Voronoi יוצרת תאי Voronoi. אלו הם כלי הניתוח המרחבי הבסיסי שכל מערכת GIS מציעה.',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'Overlay Analysis, Clustering ו-Nearest Neighbor',
        code: `-- ─── Nearest Neighbor — עיר קרובה ביותר לנקודה ──────────
SELECT
    name,
    ST_Distance(
        location::geography,
        ST_SetSRID(ST_MakePoint(34.9, 32.1), 4326)::geography
    ) / 1000 AS distance_km
FROM cities
ORDER BY location <-> ST_SetSRID(ST_MakePoint(34.9, 32.1), 4326)
LIMIT 3;
-- <-> = KNN operator, משתמש ב-GIST index (מהיר מאוד!)

-- ─── Clustering — מציאת אשכולות ──────────────────────────
SELECT
    ST_ClusterDBSCAN(location, eps := 0.5, minpoints := 3)
        OVER () AS cluster_id,
    name,
    population
FROM cities;

-- ─── Voronoi Diagram ─────────────────────────────────────
SELECT (ST_Dump(ST_VoronoiPolygons(
    ST_Collect(location)
))).geom AS voronoi_cell
FROM cities;

-- ─── Convex Hull — מעטפת קמורה ──────────────────────────
SELECT ST_ConvexHull(ST_Collect(location)) AS hull
FROM cities;

-- ─── Grid Analysis — ספירה לפי תא ──────────────────────
WITH grid AS (
    SELECT ST_SquareGrid(0.1, ST_Extent(location)) AS cell
    FROM cities
)
SELECT
    grid.cell,
    COUNT(c.id) AS city_count
FROM grid
LEFT JOIN cities c ON ST_Within(c.location, grid.cell)
GROUP BY grid.cell;`,
      },
      {
        type: 'tip',
        text: 'GIST Index הוא הסוד לביצועי PostGIS. ללא index, ST_Within על מיליון שורות = full scan. עם GIST index + KNN operator (<->) — שאילתת nearest neighbor רצה במאית השנייה. תמיד צור GIST index על עמודות geometry/geography.',
      },
    ],
    questionBank: [
      {
        id: 'postgis-q1',
        text: 'למה להשתמש ב-geography type לעומת geometry ב-ST_Distance?',
        options: [
          'geography מהיר יותר',
          'geography מחשבת מרחק בקשת ישרה על כדור הארץ — תוצאה במטרים ללא המרה ידנית',
          'geometry לא תומך ב-ST_Distance',
          'אין הבדל',
        ],
        correct: 1,
        explanation: 'geometry ST_Distance מחזיר ביחידות ה-CRS (דרגות ב-WGS84 = חסר משמעות). geography ST_Distance מחשב geodesic distance = מרחק אמיתי במטרים על פני הכדור.',
      },
      {
        id: 'postgis-q2',
        text: 'מה GIST Index עושה?',
        options: [
          'מסנן שורות כפולות',
          'מאפשר חיפוש מרחבי מהיר — מחלק מרחב ל-bounding boxes בהיררכיה עצית',
          'מנרמל קואורדינטות',
          'מוסיף CRS לטבלה',
        ],
        correct: 1,
        explanation: 'GIST (Generalized Search Tree) = R-tree index. שאילתות ST_Within, ST_Intersects, <-> ניגשות לindex ולא סורקות כל שורה. חיפוש nearest neighbor ב-1M נקודות: ללא index = שניות, עם GIST = מילישניות.',
      },
      {
        id: 'postgis-q3',
        text: 'מה operator <-> עושה ב-PostGIS?',
        options: [
          'בודק intersection',
          'KNN operator — מחשב מרחק לצורך ORDER BY עם שימוש ב-GIST index',
          'מבצע union',
          'מגדיר CRS',
        ],
        correct: 1,
        explanation: 'ORDER BY location <-> point LIMIT 5 = חמש הנקודות הקרובות ביותר. <-> הוא index-aware — PostgreSQL משתמש ב-GIST index לחיפוש KNN יעיל ללא scan מלא.',
      },
      {
        id: 'postgis-q4',
        text: 'מה ST_Transform עושה?',
        options: [
          'מסובב geometry',
          'ממיר geometry ממערכת קואורדינטות אחת לאחרת',
          'מקטין geometry',
          'מאחד geometries',
        ],
        correct: 1,
        explanation: 'ST_Transform(geom, 2039) ממיר ממה שהוא ל-ITM. חובה לפני JOIN בין שכבות בCRS שונה: ST_Intersects(r.geom, ST_Transform(d.geom, 2039)) כשr ב-ITM ו-d ב-WGS84.',
      },
      {
        id: 'postgis-q5',
        text: 'מה ST_DWithin עדיף על ST_Distance + WHERE?',
        options: [
          'ST_DWithin מדויק יותר',
          'ST_DWithin משתמש ב-Spatial Index — מהיר הרבה יותר. ST_Distance מחשב לכל שורה לפני סינון',
          'ST_Distance לא עובד עם geography',
          'אין הבדל',
        ],
        correct: 1,
        explanation: 'ST_DWithin(a, b, dist) = מסנן תחילה ב-bounding box (index), אז מחשב מרחק. WHERE ST_Distance(...) < dist = מחשב מרחק לכל שורה בטבלה. על מיליון שורות: 100x הבדל בביצועים.',
      },
    ],
  },

  // ─── שיעור 3 ───────────────────────────────────────────────────────────────
  {
    id: 'gis-python',
    title: 'Python ו-GIS — GeoPandas ו-Shapely',
    summary: 'עיבוד וניתוח נתונים גיאוגרפיים עם GeoPandas, Shapely ו-Fiona',
    emoji: '🐍',
    content: [
      { type: 'heading', text: 'GeoPandas — Pandas עם superpower גיאוגרפי' },
      {
        type: 'text',
        text: 'GeoPandas מרחיב את Pandas ומוסיף עמודת geometry לכל DataFrame. GeoDataFrame מאחד עולמות: ניתוח טבלאי רגיל (groupby, merge, filter) יחד עם פעולות מרחביות (clip, spatial join, buffer). זה הכלי הנפוץ ביותר ב-GIS עם Python.',
      },
      {
        type: 'code',
        lang: 'python',
        caption: 'GeoPandas — טעינה, CRS ו-Spatial Join',
        code: `import geopandas as gpd
import pandas as pd
from shapely.geometry import Point, LineString, Polygon

# ─── טעינת נתונים ─────────────────────────────────────────
# מ-GeoJSON
cities = gpd.read_file("cities.geojson")

# מ-Shapefile
districts = gpd.read_file("districts.shp")

# מ-PostGIS
from sqlalchemy import create_engine
engine = create_engine("postgresql://user:pass@localhost/gisdb")
cities = gpd.read_postgis(
    "SELECT * FROM cities",
    engine,
    geom_col="location"
)

# ─── עיבוד ────────────────────────────────────────────────
print(cities.crs)          # EPSG:4326
print(cities.geometry.type)  # Series: Point, Point, ...

# המרת CRS לITM לחישובים
cities_itm = cities.to_crs(epsg=2039)

# ─── Spatial Join — ערים בתוך מחוז ──────────────────────
# predicate: intersects, within, contains, crosses
result = gpd.sjoin(
    cities_itm,
    districts.to_crs(2039),
    how="left",
    predicate="within"
)

# ─── Buffer + Clip ────────────────────────────────────────
# אזור 5 ק"מ מסביב לכל עיר
cities_buffer = cities_itm.copy()
cities_buffer["geometry"] = cities_itm.buffer(5000)  # מטרים

# חיתוך נתיב בגבולות ישראל
israel = gpd.read_file("israel_boundary.geojson").to_crs(2039)
roads_clipped = gpd.clip(roads.to_crs(2039), israel)

# ─── שמירה ────────────────────────────────────────────────
result.to_file("output.geojson", driver="GeoJSON")
result.to_file("output.gpkg", driver="GPKG", layer="cities")`,
      },
      { type: 'heading', text: 'Shapely — בניית Geometries' },
      {
        type: 'text',
        text: 'Shapely היא ספריית Python לבניה ועיבוד של geometries בלי חיבור ל-DB. היא מספקת את כל פעולות הגיאומטריה: intersection, union, difference, buffer, simplify ועוד. GeoPandas משתמשת ב-Shapely בפנים.',
      },
      {
        type: 'code',
        lang: 'python',
        caption: 'Shapely — גיאומטריה, overlay ו-predicates',
        code: `from shapely.geometry import Point, LineString, Polygon, MultiPolygon
from shapely.ops import unary_union, split
import shapely

# ─── יצירת Geometries ─────────────────────────────────────
point  = Point(34.78, 32.09)
line   = LineString([(34.78, 32.09), (35.21, 31.77)])
poly   = Polygon([(34.75, 32.05), (34.82, 32.05),
                  (34.82, 32.12), (34.75, 32.05)])

# ─── מדידות ───────────────────────────────────────────────
# אזהרה: ביחידות CRS (דרגות ב-WGS84 — לא מטרים!)
print(line.length)          # 0.71 (דרגות! לא ק"מ)
print(poly.area)            # שטח בדרגות² — חסר משמעות
# לחישוב נכון: השתמש ב-GeoPandas עם CRS מטרי

# ─── Predicates — יחסים מרחביים ──────────────────────────
print(poly.contains(point))    # True
print(poly.intersects(line))   # True
print(point.within(poly))      # True
print(line.crosses(poly))      # True

# ─── Set Operations ───────────────────────────────────────
a = Polygon([(0,0), (2,0), (2,2), (0,2)])
b = Polygon([(1,1), (3,1), (3,3), (1,3)])

print(a.intersection(b))   # Polygon (חפיפה)
print(a.union(b))           # MultiPolygon (איחוד)
print(a.difference(b))      # Polygon (a פחות b)
print(a.symmetric_difference(b))  # חלקים שלא חופפים

# ─── Buffer + Simplify ────────────────────────────────────
buffered   = point.buffer(0.1)    # עיגול, רדיוס 0.1 דרגות
simplified = poly.simplify(0.01, preserve_topology=True)

# ─── Unary Union — איחוד קולקציה ────────────────────────
polygons = [Polygon(...) for ... in data]
merged   = unary_union(polygons)  # MultiPolygon → Polygon`,
      },
      { type: 'heading', text: 'ניתוח Raster עם Rasterio' },
      {
        type: 'text',
        text: 'Rasterio מאפשרת קריאה וכתיבה של קבצי raster — GeoTIFF, DEM (מודלי גובה), תמונות לוויין. Raster הוא גריד של תאים, כל תא מכיל ערך (גובה, טמפרטורה, עוצמת ספקטרלית). משלבים Vector ו-Raster לניתוחים מורכבים.',
      },
      {
        type: 'code',
        lang: 'python',
        caption: 'Rasterio — DEM, Zonal Statistics',
        code: `import rasterio
import rasterio.mask
import numpy as np
from rasterio.transform import from_bounds

# ─── קריאת DEM (Digital Elevation Model) ──────────────────
with rasterio.open("israel_dem.tif") as src:
    print(src.crs)         # EPSG:4326
    print(src.bounds)      # left, bottom, right, top
    print(src.res)         # (0.001, 0.001) — רזולוציה בדרגות
    print(src.width, src.height)

    elevation = src.read(1)      # band 1 — numpy array
    nodata    = src.nodata        # ערך ל"אין נתונים"

# ─── Clip Raster לפי Vector ───────────────────────────────
with rasterio.open("israel_dem.tif") as src:
    # מסכה לפי גבולות ירושלים
    jerusalem_geom = [jerusalem_polygon.__geo_interface__]

    clipped, transform = rasterio.mask.mask(
        src,
        jerusalem_geom,
        crop=True,
        nodata=-9999
    )

# ─── Zonal Statistics — ממוצע גובה לפי מחוז ─────────────
from rasterstats import zonal_stats

stats = zonal_stats(
    "districts.geojson",   # Vector polygons
    "israel_dem.tif",      # Raster
    stats=["min", "max", "mean", "std"],
    nodata=-9999
)

# תוצאה: [{"min": -400, "max": 2814, "mean": 450, ...}, ...]
for district, stat in zip(districts, stats):
    print(f"{district['name']}: avg elevation = {stat['mean']:.0f}m")`,
      },
      {
        type: 'tip',
        text: 'GeoPandas + Shapely = Vector analysis. Rasterio + numpy = Raster analysis. Zonal statistics = שאלות כמו "מה הגובה הממוצע בכל מחוז?" — משלבות Vector (מחוזות) עם Raster (DEM). השילוב הזה הוא ליבת ניתוח GIS מתקדם.',
      },
    ],
    questionBank: [
      {
        id: 'python-gis-q1',
        text: 'מה GeoDataFrame מוסיף על DataFrame רגיל?',
        options: [
          'ביצועים טובים יותר',
          'עמודת geometry + CRS + פעולות מרחביות (sjoin, buffer, clip, to_crs)',
          'תמיכה בJSON',
          'Visualization אוטומטי',
        ],
        correct: 1,
        explanation: 'GeoDataFrame = DataFrame רגיל + עמודת geometry + crs attribute. מוסיף: sjoin (spatial join), clip, buffer, to_crs, plot(). כל פעולת Pandas רגילה עובדת גם עליו.',
      },
      {
        id: 'python-gis-q2',
        text: 'למה חשוב לעשות to_crs(2039) לפני buffer בישראל?',
        options: [
          'כי Shapely לא תומך ב-WGS84',
          'כי buffer בWGS84 (דרגות) יהיה עגלגל ולא נכון — בITM (מטרים) buffer(5000) = בדיוק 5 ק"מ',
          'כי PostGIS דורש ITM',
          'כי GeoJSON לא תומך ב-buffer',
        ],
        correct: 1,
        explanation: 'buffer(0.1) ב-WGS84 = 0.1 דרגות ≈ 11 ק"מ בצפון-דרום, ≈ 9.5 ק"מ במזרח-מערב (לא עגול!). ITM: buffer(5000) = עיגול אמיתי של 5,000 מטר. תמיד המר ל-CRS מטרי לפני buffer.',
      },
      {
        id: 'python-gis-q3',
        text: 'מה Zonal Statistics עושה?',
        options: [
          'מחלק Raster לאזורים',
          'מחשב סטטיסטיקות של ערכי Raster בתוך כל פוליגון Vector',
          'ממיר Vector ל-Raster',
          'מחשב elevation',
        ],
        correct: 1,
        explanation: 'Zonal Stats = "מה הגובה הממוצע/מקסימלי בתוך כל מחוז?" DEM (raster) × מחוזות (vector) → לכל מחוז: min/max/mean/std של ערכי הגובה בתוכו.',
      },
      {
        id: 'python-gis-q4',
        text: 'מה Shapely intersection מחזיר?',
        options: [
          'True/False',
          'Geometry של החפיפה בין שתי geometries',
          'מרחק בין geometries',
          'איחוד שתי geometries',
        ],
        correct: 1,
        explanation: 'a.intersection(b) = ה-geometry שנמצאת בשתי הצורות. אם פוליגון A וב חופפים — מחזיר את שטח החפיפה. union = כל שתיהן. difference = A פחות B.',
      },
      {
        id: 'python-gis-q5',
        text: 'מה unary_union עושה?',
        options: [
          'ממיר Multipolygon ל-Polygon',
          'מאחד רשימה של geometries לגיאומטריה אחת — מבטל גבולות פנימיים',
          'מחשב union בין שתי geometries',
          'מנרמל CRS',
        ],
        correct: 1,
        explanation: 'unary_union([poly1, poly2, poly3]) = polygon אחד מאוחד. שימוש: לאחד כל הנפות ל"ישראל" — unary_union(districts.geometry) → גבול ישראל. dissolve() ב-GeoPandas קורא ל-unary_union פנימית.',
      },
    ],
  },

  // ─── שיעור 4 ───────────────────────────────────────────────────────────────
  {
    id: 'gis-web-maps',
    title: 'מפות ווב — Leaflet.js ו-Mapbox GL',
    summary: 'הצגת נתונים גיאוגרפיים בדפדפן עם Leaflet.js, Mapbox GL JS ו-GeoJSON',
    emoji: '🗺️',
    content: [
      { type: 'heading', text: 'Leaflet.js — מפות ווב פשוטות' },
      {
        type: 'text',
        text: 'Leaflet.js היא ספריית JavaScript קלת-משקל (42KB) ופופולרית מאוד ליצירת מפות אינטראקטיביות בדפדפן. מתאימה למפות עם שכבות Vector ו-Tile. Mapbox GL JS מבוסס WebGL ומתאים לנתונים גדולים, אנימציות ו-3D.',
      },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Leaflet.js — מפה בסיסית עם Markers ו-GeoJSON',
        code: `import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// ─── אתחול מפה ────────────────────────────────────────────
const map = L.map('map-container', {
  center: [31.7683, 35.2137],  // ירושלים [lat, lon]
  zoom: 10,
  minZoom: 5,
  maxZoom: 18,
})

// ─── Basemap (Tile Layer) ─────────────────────────────────
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19,
}).addTo(map)

// ─── Markers ──────────────────────────────────────────────
const marker = L.marker([31.7683, 35.2137])
  .bindPopup('<b>ירושלים</b><br>בירת ישראל')
  .addTo(map)

// Custom Icon
const customIcon = L.icon({
  iconUrl: '/icons/city.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

// ─── GeoJSON Layer ────────────────────────────────────────
const citiesGeoJson = {
  type: 'FeatureCollection',
  features: [/* ... */]
}

const citiesLayer = L.geoJSON(citiesGeoJson, {
  // נקודות → Markers עם icon
  pointToLayer: (feature, latlng) =>
    L.marker(latlng, { icon: customIcon }),

  // Style לפוליגונים/קווים
  style: (feature) => ({
    color:   feature.properties.type === 'major' ? '#ef4444' : '#3b82f6',
    weight:  2,
    opacity: 0.8,
    fillOpacity: 0.3,
  }),

  // Popup לכל feature
  onEachFeature: (feature, layer) => {
    layer.bindPopup(\`
      <h3>\${feature.properties.name}</h3>
      <p>אוכלוסייה: \${feature.properties.population?.toLocaleString()}</p>
    \`)
    layer.on('mouseover', () => layer.setStyle({ fillOpacity: 0.6 }))
    layer.on('mouseout', () => citiesLayer.resetStyle(layer))
  },
}).addTo(map)

// Fit map to layer bounds
map.fitBounds(citiesLayer.getBounds())`,
      },
      { type: 'heading', text: 'Mapbox GL JS — ביצועים ו-3D' },
      {
        type: 'text',
        text: 'Mapbox GL JS משתמש ב-WebGL לרינדור — מסוגל להציג מיליוני נקודות בצורה חלקה. תומך ב-3D buildings, terrain, לחנים, אנימציות ו-Vector Tiles. מתאים לאפליקציות עם נתונים גדולים או צרכי ויזואליזציה מתקדמים.',
      },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Mapbox GL JS — Layers, Filters ו-3D',
        code: `import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.VITE_MAPBOX_TOKEN

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [34.7818, 32.0853],
  zoom: 10,
  pitch: 45,        // טיה ל-3D
  bearing: -15,
})

map.on('load', () => {
  // ─── הוספת GeoJSON Source ───────────────────────────
  map.addSource('cities', {
    type: 'geojson',
    data: '/api/cities.geojson',
    cluster: true,                 // Clustering אוטומטי
    clusterMaxZoom: 14,
    clusterRadius: 50,
  })

  // Layer לאשכולות
  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'cities',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': [
        'step', ['get', 'point_count'],
        '#51bbd6', 10,   // עד 10 — ציאן
        '#f1f075', 50,   // עד 50 — צהוב
        '#f28cb1',       // מעל 50 — ורוד
      ],
      'circle-radius': [
        'step', ['get', 'point_count'],
        15, 10, 25, 50, 35
      ],
    },
  })

  // Layer לנקודות בודדות
  map.addLayer({
    id: 'unclustered-point',
    type: 'circle',
    source: 'cities',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': [
        'match', ['get', 'type'],
        'capital', '#ef4444',
        'major',   '#f59e0b',
        '#6366f1',
      ],
      'circle-radius': [
        'interpolate', ['linear'], ['get', 'population'],
        0,       4,
        100000, 10,
        1000000, 20,
      ],
    },
  })

  // ─── 3D Buildings ─────────────────────────────────
  map.addLayer({
    id: '3d-buildings',
    source: 'composite',
    'source-layer': 'building',
    type: 'fill-extrusion',
    minzoom: 15,
    paint: {
      'fill-extrusion-color': '#adb5bd',
      'fill-extrusion-height': ['get', 'height'],
      'fill-extrusion-opacity': 0.6,
    },
  })

  // ─── Filter דינמי ─────────────────────────────────
  document.getElementById('filter-capital')
    .addEventListener('change', (e) => {
      map.setFilter('unclustered-point',
        e.target.checked
          ? ['==', ['get', 'type'], 'capital']
          : ['!', ['has', 'point_count']]
      )
    })
})`,
      },
      { type: 'heading', text: 'React + Leaflet — react-leaflet' },
      {
        type: 'text',
        text: 'react-leaflet עוטף את Leaflet.js בקומפוננטות React. מאפשר לנהל שכבות מפה בצורה declarative — מוסיפים ומסירים קומפוננטות ב-JSX בלי לגעת ב-DOM ישירות.',
      },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'react-leaflet — מפה בתוך React component',
        code: `import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from 'react-leaflet'
import { useEffect, useState } from 'react'

function FitBoundsOnLoad({ geojson }) {
  const map = useMap()  // גישה ל-Leaflet map instance
  useEffect(() => {
    if (geojson) {
      const layer = L.geoJSON(geojson)
      map.fitBounds(layer.getBounds())
    }
  }, [geojson, map])
  return null
}

export default function IsraelMap() {
  const [cities, setCities] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch('/api/cities.geojson')
      .then(r => r.json())
      .then(setCities)
  }, [])

  return (
    <MapContainer
      center={[31.5, 34.9]}
      zoom={8}
      style={{ height: '600px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap"
      />

      {cities && (
        <>
          <FitBoundsOnLoad geojson={cities} />
          <GeoJSON
            data={cities}
            style={(feature) => ({
              color: feature === selected ? '#ef4444' : '#3b82f6',
              weight: selected === feature ? 3 : 1,
            })}
            onEachFeature={(feature, layer) => {
              layer.on('click', () => setSelected(feature))
              layer.bindPopup(feature.properties.name)
            }}
          />
        </>
      )}

      {selected && (
        <Marker position={[
          selected.geometry.coordinates[1],
          selected.geometry.coordinates[0],
        ]}>
          <Popup>{selected.properties.name}</Popup>
        </Marker>
      )}
    </MapContainer>
  )
}`,
      },
      {
        type: 'tip',
        text: 'Leaflet עדיף לפרויקטים פשוטים (<100K features) — קל ללמוד, open source מלא. Mapbox GL JS עדיף לנתונים גדולים, 3D ו-Vector Tiles. לישראל: OpenStreetMap tiles חינמיים. לייצור: Mapbox, Maptiler, או self-hosted עם TileServer GL.',
      },
    ],
    questionBank: [
      {
        id: 'webmap-q1',
        text: 'למה Mapbox GL JS מהיר יותר מ-Leaflet לנתונים גדולים?',
        options: [
          'כי Mapbox משתמש ב-WebWorkers',
          'כי Mapbox GL JS מבוסס WebGL — מנצל GPU לרינדור, לא DOM SVG/Canvas',
          'כי Leaflet לא תומך ב-GeoJSON',
          'כי Mapbox מצמצם את הנתונים',
        ],
        correct: 1,
        explanation: 'Leaflet מרנדר ב-SVG/Canvas (CPU). Mapbox GL מרנדר ב-WebGL (GPU). מיליון נקודות ב-Leaflet = DOM כבד + CPU עומס. Mapbox GL = shader programs על GPU = חלק וגמיש.',
      },
      {
        id: 'webmap-q2',
        text: 'מה Vector Tiles עדיפות על Raster Tiles?',
        options: [
          'Vector Tiles קטנות יותר',
          'Vector Tiles = נתונים, לא תמונות — ניתן לסטייל, filter, query בדפדפן + חדות בכל zoom',
          'Raster Tiles לא תומכות ב-3D',
          'אין הבדל בביצועים',
        ],
        correct: 1,
        explanation: 'Raster Tiles = PNG/JPEG — תמונה קבועה, לא ניתנת לשינוי. Vector Tiles = Protobuf עם geometries — הדפדפן מרנדר ומסטייל בזמן אמת. חדות מושלמת בכל resolution, filter layer, שינוי סגנון.',
      },
      {
        id: 'webmap-q3',
        text: 'מה Clustering עושה ב-Mapbox GL?',
        options: [
          'מאחד נתונים לפי ערך',
          'מקבץ נקודות קרובות לאשכולות בזמן אמת לפי zoom — מונע עומס ויזואלי',
          'מחלק את המפה לאזורים',
          'מסנן נקודות',
        ],
        correct: 1,
        explanation: 'Clustering: ב-zoom נמוך — עשרות נקודות מאוחדות לעיגול אחד עם מספר. ב-zoom גבוה — נקודות מתפרדות. Mapbox GL עושה זאת אוטומטית עם clusterRadius ו-clusterMaxZoom.',
      },
      {
        id: 'webmap-q4',
        text: 'מה useMap() ב-react-leaflet מאפשר?',
        options: [
          'יצירת מפה חדשה',
          'גישה ל-Leaflet map instance מתוך קומפוננט ילד — לביצוע פעולות imperative כמו fitBounds, flyTo',
          'שינוי style המפה',
          'קריאת נתוני GeoJSON',
        ],
        correct: 1,
        explanation: 'useMap() = hook שמחזיר את ה-Leaflet map object. מאפשר לקרוא map.fitBounds(), map.flyTo(), map.setZoom() מתוך קומפוננטות ילד — בלי prop drilling.',
      },
      {
        id: 'webmap-q5',
        text: 'מה interpolate ב-Mapbox GL עושה ב-paint expression?',
        options: [
          'מחשב ממוצע ערכים',
          'יוצר מעבר חלק בין ערכים — למשל circle-radius גדל לינארית עם population',
          'מסנן features',
          'מגדיר צבע gradient',
        ],
        correct: 1,
        explanation: '["interpolate", ["linear"], ["get", "population"], 0, 4, 100000, 10] = עיגול קטן (4px) לאוכלוסיה 0, גדל לינארית ל-10px ל-100K. מאפשר data-driven styling אוטומטי.',
      },
    ],
  },

  // ─── שיעור 5 ───────────────────────────────────────────────────────────────
  {
    id: 'gis-analysis',
    title: 'ניתוח מרחבי מתקדם',
    summary: 'Network Analysis, Isochrones, Heatmaps, Geocoding ו-OpenStreetMap',
    emoji: '📊',
    content: [
      { type: 'heading', text: 'Geocoding — כתובת ↔ קואורדינטות' },
      {
        type: 'text',
        text: 'Geocoding הוא תהליך המרת כתובת טקסטואלית לקואורדינטות (Forward Geocoding) ולהפך (Reverse Geocoding). Nominatim הוא שירות ה-Geocoding של OpenStreetMap — חינמי לשימוש מתון. לשימוש כבד: Google Geocoding API, Mapbox Geocoding API.',
      },
      {
        type: 'code',
        lang: 'python',
        caption: 'Geocoding עם Nominatim ו-Geopy',
        code: `from geopy.geocoders import Nominatim
from geopy.extra.rate_limiter import RateLimiter
import pandas as pd
import geopandas as gpd
from shapely.geometry import Point
import time

# ─── Forward Geocoding — כתובת → קואורדינטות ─────────────
geolocator = Nominatim(user_agent="my-gis-app-v1")

# Rate limiter — כבוד לשירות OSM (מקסימום 1 req/sec)
geocode = RateLimiter(geolocator.geocode, min_delay_seconds=1)

addresses = [
    "רחוב דיזנגוף 50, תל אביב",
    "כיכר ספרא, ירושלים",
    "שדרות בן גוריון, חיפה",
]

results = []
for addr in addresses:
    loc = geocode(addr, language="he")
    if loc:
        results.append({
            "address": addr,
            "lat": loc.latitude,
            "lon": loc.longitude,
            "display": loc.address,
        })
    else:
        results.append({"address": addr, "lat": None, "lon": None})

df = pd.DataFrame(results)

# המרה ל-GeoDataFrame
gdf = gpd.GeoDataFrame(
    df,
    geometry=gpd.points_from_xy(df.lon, df.lat),
    crs="EPSG:4326"
)

# ─── Reverse Geocoding — קואורדינטות → כתובת ─────────────
location = geolocator.reverse("32.0853, 34.7818", language="he")
print(location.address)
# → "דיזנגוף, גבעתיים, מחוז תל אביב, ישראל"

# ─── Batch Geocoding מ-CSV ───────────────────────────────
df_addresses = pd.read_csv("addresses.csv")
df_addresses["location"] = df_addresses["address"].apply(
    lambda addr: geocode(addr)
)
df_addresses["lat"] = df_addresses["location"].apply(
    lambda loc: loc.latitude if loc else None
)
df_addresses["lon"] = df_addresses["location"].apply(
    lambda loc: loc.longitude if loc else None
)`,
      },
      { type: 'heading', text: 'Network Analysis — ניתוח רשת כבישים' },
      {
        type: 'text',
        text: 'OSMnx היא ספריית Python שמורידה רשת כבישים מ-OpenStreetMap ומבצעת ניתוח רשת: מסלול קצר, Isochrones (אזורים נגישים בזמן נסיעה), ו-betweenness centrality. מתאים לניתוח נגישות, תכנון עירוני ולוגיסטיקה.',
      },
      {
        type: 'code',
        lang: 'python',
        caption: 'OSMnx — Routing ו-Isochrone Analysis',
        code: `import osmnx as ox
import networkx as nx
import geopandas as gpd
from shapely.geometry import Point
import numpy as np

# ─── הורדת רשת כבישים מ-OSM ───────────────────────────────
# רשת הליכה (walk), נהיגה (drive), אופניים (bike)
G = ox.graph_from_place(
    "Tel Aviv, Israel",
    network_type="drive",
    retain_all=False
)

# ─── Shortest Path — מסלול קצר ──────────────────────────
# נקודות ציון
origin_point      = (32.0853, 34.7818)  # lat, lon
destination_point = (32.1183, 34.8140)

# מציאת node הקרוב ביותר לכל נקודה
origin_node = ox.nearest_nodes(G, origin_point[1], origin_point[0])
dest_node   = ox.nearest_nodes(G, destination_point[1], destination_point[0])

# מסלול קצר (מרחק/זמן)
route = nx.shortest_path(G, origin_node, dest_node, weight="length")

# ─── Isochrone — אזור נגיש ב-10 דקות ────────────────────
def get_isochrone(G, center_point, travel_time_min, speed_kmh=50):
    """מחשב פוליגון נגישות בזמן נסיעה."""
    # מרחק נסיעה במטרים
    max_distance = (travel_time_min / 60) * speed_kmh * 1000

    center_node = ox.nearest_nodes(G, center_point[1], center_point[0])

    # כל nodes בטווח
    subgraph = nx.ego_graph(G, center_node, radius=max_distance,
                             distance="length")

    # קואורדינטות כל ה-nodes
    node_points = [
        Point(data["x"], data["y"])
        for _, data in subgraph.nodes(data=True)
    ]

    # Convex Hull של כל הנקודות
    from shapely.ops import unary_union
    isochrone = unary_union(
        [p.buffer(50) for p in node_points]
    ).convex_hull

    return isochrone

# Isochrones ל-5, 10, 15 דקות
iso_5  = get_isochrone(G, (32.0853, 34.7818), 5)
iso_10 = get_isochrone(G, (32.0853, 34.7818), 10)
iso_15 = get_isochrone(G, (32.0853, 34.7818), 15)

# שמירה כ-GeoJSON
gdf = gpd.GeoDataFrame(
    {"minutes": [5, 10, 15]},
    geometry=[iso_5, iso_10, iso_15],
    crs="EPSG:4326"
)
gdf.to_file("isochrones.geojson", driver="GeoJSON")`,
      },
      { type: 'heading', text: 'Heatmap ו-Point Density' },
      {
        type: 'text',
        text: 'Heatmap מציג צפיפות של נקודות — אזורים עם הרבה events מסומנים בחם (אדום/צהוב) ואזורים דלילים בקר (כחול). KDE (Kernel Density Estimation) הוא האלגוריתם הסטנדרטי לחישוב צפיפות.',
      },
      {
        type: 'code',
        lang: 'python',
        caption: 'KDE Heatmap עם scipy ו-Mapbox Heatmap Layer',
        code: `import numpy as np
from scipy.stats import gaussian_kde
import geopandas as gpd
import json

# ─── KDE Heatmap ──────────────────────────────────────────
def compute_kde_heatmap(points_gdf, grid_resolution=100):
    """חישוב KDE על גריד."""
    points_itm = points_gdf.to_crs(2039)

    x = points_itm.geometry.x.values
    y = points_itm.geometry.y.values

    # KDE
    kde = gaussian_kde([x, y], bw_method=0.1)

    # גריד
    xi = np.linspace(x.min(), x.max(), grid_resolution)
    yi = np.linspace(y.min(), y.max(), grid_resolution)
    xx, yy = np.meshgrid(xi, yi)

    # density לכל תא
    density = kde(np.vstack([xx.ravel(), yy.ravel()]))
    density = density.reshape(xx.shape)

    return xi, yi, density

# ─── Mapbox Heatmap Layer ─────────────────────────────────
# JavaScript: הוספת heatmap layer ב-Mapbox GL
heatmap_layer = {
    "id": "incidents-heat",
    "type": "heatmap",
    "source": "incidents",
    "paint": {
        "heatmap-weight": [
            "interpolate", ["linear"],
            ["get", "severity"], 0, 0, 5, 1
        ],
        "heatmap-intensity": [
            "interpolate", ["linear"], ["zoom"], 0, 1, 15, 3
        ],
        "heatmap-color": [
            "interpolate", ["linear"], ["heatmap-density"],
            0, "rgba(33,102,172,0)",
            0.2, "rgb(103,169,207)",
            0.4, "rgb(209,229,240)",
            0.6, "rgb(253,219,199)",
            0.8, "rgb(239,138,98)",
            1,   "rgb(178,24,43)"
        ],
        "heatmap-radius": [
            "interpolate", ["linear"], ["zoom"], 0, 2, 15, 20
        ],
        "heatmap-opacity": 0.8
    }
}`,
      },
      {
        type: 'tip',
        text: 'OSMnx + NetworkX = ניתוח רשת כבישים חינמי ומלא. לניתוח isochrones מהיר יותר: Valhalla או OSRM כ-self-hosted routing engine. לנתונים ישראליים: GovMap.gov.il מספק שכבות רשמיות (מחוזות, רחובות, בניינים) בחינם.',
      },
    ],
    questionBank: [
      {
        id: 'analysis-q1',
        text: 'מה ההבדל בין Forward ל-Reverse Geocoding?',
        options: [
          'Forward מהיר יותר',
          'Forward: כתובת → קואורדינטות. Reverse: קואורדינטות → כתובת',
          'Reverse מדויק יותר',
          'Forward עובד רק עם OSM',
        ],
        correct: 1,
        explanation: 'Forward: "רחוב דיזנגוף 50" → (32.07, 34.78). Reverse: (32.07, 34.78) → "דיזנגוף, תל אביב". שניהם נפוצים: Forward לייבוא כתובות, Reverse לזיהוי מיקום מ-GPS.',
      },
      {
        id: 'analysis-q2',
        text: 'מה Isochrone מייצג?',
        options: [
          'שעה מסוימת ביום',
          'פוליגון של כל הנקודות הנגישות בזמן נסיעה נתון מנקודה מסוימת',
          'מסלול הקצר ביותר',
          'צפיפות תנועה',
        ],
        correct: 1,
        explanation: 'Isochrone 10 דקות מתחנת הרכבת = פוליגון שמציג "לאן ניתן להגיע ב-10 דקות". שימוש: ניתוח נגישות לשירותים, בחירת מיקום עסק, תכנון תחבורה.',
      },
      {
        id: 'analysis-q3',
        text: 'מה KDE (Kernel Density Estimation) מחשב?',
        options: [
          'מרחק בין נקודות',
          'צפיפות רציפה של נקודות על פני מרחב — כמה נקודות "משפיעות" על כל מיקום',
          'Clustering של נקודות',
          'אינטרפולציה של ערכים',
        ],
        correct: 1,
        explanation: 'KDE: לכל תא בגריד, סוכם תרומת כל הנקודות (קרובות תורמות יותר). התוצאה = surface רציפה של צפיפות. Heatmap = ויזואליזציה של KDE surface.',
      },
      {
        id: 'analysis-q4',
        text: 'למה RateLimiter חשוב בGeocodig עם Nominatim?',
        options: [
          'לדיוק גבוה יותר',
          'Nominatim הוא שירות OSM חינמי — יותר מבקשה לשנייה גורם לחסימה של ה-IP',
          'לחיסכון בזיכרון',
          'לדיוק כתובות',
        ],
        correct: 1,
        explanation: 'OSM Nominatim: policy = max 1 req/sec, אסור לשימוש מסחרי כבד. RateLimiter מגביל אוטומטית. לייצור: שרת Nominatim עצמי על Docker, או Mapbox/Google Geocoding API.',
      },
      {
        id: 'analysis-q5',
        text: 'מה OSMnx מאפשר שספריות GIS רגילות לא?',
        options: [
          'קריאת GeoJSON',
          'הורדת רשת כבישים מ-OSM ישירות ל-NetworkX graph — routing, centrality, travel time',
          'חישוב buffers',
          'הצגת מפות',
        ],
        correct: 1,
        explanation: 'OSMnx = OSM + NetworkX. ox.graph_from_place("Tel Aviv") מוריד כל הכבישים. אז NetworkX.shortest_path = מסלול קצר. node centrality = מציאת צמתים קריטיים. isochrones = אזורי נגישות.',
      },
    ],
  },

  // ─── שיעור 6 ───────────────────────────────────────────────────────────────
  {
    id: 'gis-israel-data',
    title: 'נתונים גיאוגרפיים של ישראל',
    summary: 'מקורות נתונים פתוחים לישראל: GovMap, OpenStreetMap, MAPI ו-APIs ממשלתיים',
    emoji: '🇮🇱',
    content: [
      { type: 'heading', text: 'מקורות נתונים גיאוגרפיים לישראל' },
      {
        type: 'table',
        caption: 'מקורות נתונים פתוחים לישראל',
        headers: ['מקור', 'URL', 'נתונים', 'רישיון'],
        rows: [
          ['GovMap', 'govmap.gov.il', 'גבולות, רחובות, בניינים, תכנון', 'ממשלתי, חינם'],
          ['data.gov.il', 'data.gov.il', 'נתונים סטטיסטיים + geo', 'CC-BY'],
          ['OpenStreetMap', 'openstreetmap.org', 'כבישים, POI, מבנים', 'ODbL'],
          ['MAPI', 'mapi.gov.il', 'מפות טופוגרפיות, אורתופוטו', 'ממשלתי'],
          ['CBS', 'cbs.gov.il', 'גבולות סטטיסטיים, אוכלוסייה', 'חינם'],
          ['Natural Earth', 'naturalearthdata.com', 'עולמי: גבולות, ים', 'CC0'],
        ],
      },
      { type: 'heading', text: 'API של data.gov.il' },
      {
        type: 'text',
        text: 'data.gov.il הוא הפורטל הממשלתי הפתוח של ישראל ומכיל מאות Datasets עם נתונים גיאוגרפיים — כתובות, גבולות, מוסדות ציבור ועוד. ממשק ה-API מבוסס CKAN ומאפשר גישה ישירה ל-JSON/GeoJSON.',
      },
      {
        type: 'code',
        lang: 'python',
        caption: 'data.gov.il API — כתובות ו-POI',
        code: `import httpx
import geopandas as gpd
import pandas as pd
from shapely.geometry import Point

BASE = "https://data.gov.il/api/3/action"

# ─── חיפוש Dataset ───────────────────────────────────────
def search_datasets(query: str):
    r = httpx.get(f"{BASE}/package_search", params={"q": query})
    return r.json()["result"]["results"]

datasets = search_datasets("רחובות ישראל")

# ─── הורדת Dataset ────────────────────────────────────────
def get_resource(resource_id: str, limit: int = 1000):
    r = httpx.get(f"{BASE}/datastore_search", params={
        "resource_id": resource_id,
        "limit": limit,
    })
    return r.json()["result"]["records"]

# ─── רחובות + ממוספרים ────────────────────────────────────
# Resource ID של רחובות ישראל (data.gov.il)
streets = get_resource("a7296d1a-f8c9-4b70-96c7-842f23e8c4c3", limit=5000)
streets_df = pd.DataFrame(streets)

# ─── תחנות רכבת ─────────────────────────────────────────
trains = get_resource("0a7e6438-e9c6-40a5-a8fe-bf099c6ca393")
trains_df = pd.DataFrame(trains)

# המרה ל-GeoDataFrame (אם יש עמודות X, Y)
if "X" in trains_df.columns:
    trains_gdf = gpd.GeoDataFrame(
        trains_df,
        geometry=gpd.points_from_xy(
            trains_df["X"].astype(float),
            trains_df["Y"].astype(float)
        ),
        crs="EPSG:2039"   # ITM
    ).to_crs(4326)

# ─── OSM עם Overpass API ─────────────────────────────────
def query_overpass(query: str) -> dict:
    """שאילתת Overpass לOSM."""
    r = httpx.post(
        "https://overpass-api.de/api/interpreter",
        data={"data": query},
        timeout=60,
    )
    return r.json()

# כל בתי חולים בישראל
hospitals_query = """
[out:json][timeout:30];
area["name"="ישראל"]["admin_level"="2"]->.israel;
(
  node["amenity"="hospital"](area.israel);
  way["amenity"="hospital"](area.israel);
);
out center;
"""

hospitals = query_overpass(hospitals_query)
hospitals_df = pd.DataFrame([
    {
        "name": e.get("tags", {}).get("name:he", e.get("tags", {}).get("name", "")),
        "lat": e.get("lat") or e.get("center", {}).get("lat"),
        "lon": e.get("lon") or e.get("center", {}).get("lon"),
    }
    for e in hospitals["elements"]
])`,
      },
      { type: 'heading', text: 'WMS/WFS — שכבות GIS ממשלתיות' },
      {
        type: 'text',
        text: 'WMS (Web Map Service) ו-WFS (Web Feature Service) הם פרוטוקולי OGC לשליפת שכבות GIS משרתים. GovMap מספק WMS לשכבות מפה ו-WFS לנתוני Vector. Leaflet ו-QGIS תומכים ב-WMS ישירות.',
      },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'WMS Layer ב-Leaflet מ-GovMap',
        code: `import L from 'leaflet'

const map = L.map('map').setView([31.7683, 35.2137], 10)

// ─── WMS Layer מ-GovMap ───────────────────────────────────
const govmapWMS = L.tileLayer.wms(
  'https://ags.govmap.gov.il/arcgis/services/Ortho/Ortho2022/MapServer/WMSServer',
  {
    layers: '0',
    format: 'image/png',
    transparent: true,
    attribution: 'GovMap Israel',
    maxZoom: 20,
    opacity: 0.7,
  }
).addTo(map)

// ─── WFS — הורדת Features כ-GeoJSON ─────────────────────
async function fetchWFS(url, typeName, bbox) {
  const params = new URLSearchParams({
    service: 'WFS',
    version: '2.0.0',
    request: 'GetFeature',
    typeName,
    outputFormat: 'application/json',
    bbox: bbox.join(',') + ',EPSG:4326',
    srsName: 'EPSG:4326',
  })

  const res = await fetch(\`\${url}?\${params}\`)
  return res.json()
}

// שכבת בניינים מ-GovMap באזור ירושלים
const buildings = await fetchWFS(
  'https://ags.govmap.gov.il/arcgis/services/Buildings/MapServer/WFSServer',
  'Buildings',
  [35.18, 31.74, 35.25, 31.80]  // [minLon, minLat, maxLon, maxLat]
)

L.geoJSON(buildings, {
  style: { color: '#64748b', weight: 1, fillOpacity: 0.4 }
}).addTo(map)

// ─── Layer Control ────────────────────────────────────────
const basemaps = {
  'OpenStreetMap': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
  'אורתופוטו 2022': govmapWMS,
}

const overlays = {
  'בניינים': L.geoJSON(buildings),
}

L.control.layers(basemaps, overlays).addTo(map)`,
      },
      {
        type: 'code',
        lang: 'python',
        caption: 'עיבוד נתוני CBS — גבולות סטטיסטיים',
        code: `import geopandas as gpd
import pandas as pd

# ─── גבולות ישובים מ-CBS ──────────────────────────────────
# הורדה מ: cbs.gov.il → מפות → גבולות ישובים
settlements = gpd.read_file("settlements_2023.shp")
print(settlements.columns)
# SEMEL_YSH (קוד ישוב), SHEM_YSH (שם), NAFA (מחוז)

# המרה ל-WGS84 (CBS שומר ב-ITM)
settlements = settlements.to_crs(4326)

# ─── Choropleth — אוכלוסייה לפי ישוב ────────────────────
population = pd.read_csv("population_by_settlement.csv")
# עמודות: settlement_code, population_2023

merged = settlements.merge(
    population,
    left_on="SEMEL_YSH",
    right_on="settlement_code",
    how="left"
)

# ─── ויזואליזציה עם matplotlib ───────────────────────────
import matplotlib.pyplot as plt
import matplotlib.colors as mcolors

fig, ax = plt.subplots(1, 1, figsize=(10, 12))

merged.plot(
    ax=ax,
    column="population_2023",
    cmap="YlOrRd",
    scheme="quantiles",
    k=5,
    legend=True,
    legend_kwds={"label": "אוכלוסייה", "orientation": "vertical"},
    missing_kwds={"color": "lightgrey"},
)

ax.set_title("אוכלוסיית ישראל לפי ישוב 2023", fontsize=16)
ax.set_axis_off()
plt.savefig("israel_population.png", dpi=150, bbox_inches="tight")`,
      },
      {
        type: 'tip',
        text: 'לפרויקט GIS בישראל: התחל מ-data.gov.il לנתונים סטטיסטיים, OSM דרך Overpass API ל-POI ושכבות עירוניות, CBS לגבולות סטטיסטיים. ל-Basemap: OpenStreetMap tile חינמי, GovMap ל-אורתופוטו. CRS סטנדרטי לישראל: ITM (EPSG:2039) לחישובים, WGS84 (EPSG:4326) לשמירה ולווב.',
      },
    ],
    questionBank: [
      {
        id: 'israel-q1',
        text: 'מה WMS שונה מ-WFS?',
        options: [
          'WMS מהיר יותר',
          'WMS = תמונות (tiles), WFS = נתוני Vector להורדה כ-GeoJSON/XML',
          'WFS לא תומך ב-Polygon',
          'WMS של GovMap בלבד',
        ],
        correct: 1,
        explanation: 'WMS מחזיר PNG/JPEG — תמונת מפה לפי bbox. WFS מחזיר Feature data — geometry + attributes בGeoJSON. WMS = ויזואליזציה, WFS = נתונים לניתוח.',
      },
      {
        id: 'israel-q2',
        text: 'מה Overpass API מאפשר?',
        options: [
          'הורדת OSM tiles',
          'שאילתת OpenStreetMap לפי תגים (amenity=hospital) ואזור גיאוגרפי',
          'עריכת OSM',
          'Geocoding',
        ],
        correct: 1,
        explanation: 'Overpass: שפת query ל-OSM. node["amenity"="hospital"](area.israel) = כל בתי חולים בישראל. ניתן לשאול לפי תגים (tag), bbox, area, relation. תוצאה: JSON/GeoJSON.',
      },
      {
        id: 'israel-q3',
        text: 'מה קוד SEMEL_YSH ב-CBS?',
        options: [
          'קוד מחוז',
          'מזהה ייחודי לכל ישוב בישראל — מאפשר JOIN בין שכבות CBS שונות',
          'קוד רחוב',
          'קוד מיקוד',
        ],
        correct: 1,
        explanation: 'CBS (הלמ"ס) מגדיר קוד ישוב (SEMEL_YSH) לכל ישוב. JOIN: גבולות ישובים (Shapefile) + נתוני אוכלוסייה (CSV) לפי קוד זה → Choropleth map.',
      },
      {
        id: 'israel-q4',
        text: 'מה Choropleth Map?',
        options: [
          'מפה עם תוויות',
          'מפה שצובעת פוליגונים לפי ערך נומרי — לדוגמה, כל ישוב בצבע לפי אוכלוסייה',
          'מפה עם clusters',
          'מפה עם heatmap',
        ],
        correct: 1,
        explanation: 'Choropleth = פוליגונים מצוינים לפי ערך (אוכלוסייה, הכנסה, צפיפות). גוון כהה = ערך גבוה. scheme="quantiles" מחלק ל-5 אחוזוני שוות — מונע שפוליגונים ענקיים שולטים בסקאלה.',
      },
      {
        id: 'israel-q5',
        text: 'מה L.control.layers() עושה ב-Leaflet?',
        options: [
          'מוסיף zoom control',
          'מוסיף UI לבחירת Basemap ו-Overlay layers — המשתמש בוחר מה לראות על המפה',
          'שולט על opacity',
          'מוסיף legend',
        ],
        correct: 1,
        explanation: 'L.control.layers(basemaps, overlays) יוצר לחצן ⊕ בפינת המפה. basemaps = radio buttons (אחד בכל פעם), overlays = checkboxes (כמה ביחד). ממשק סטנדרטי לבחירת שכבות.',
      },
    ],
  },
]
