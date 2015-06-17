# Open Trails Editor
Web map application for creating and editing data for the [Open Trails Map]
(http://www.codeforamerica.org/specifications/trails/spec.html).  

### Requirements
* [https://nodejs.org/](NodeJS > v0.12.2)
* [https://www.npmjs.com/](NPM > v2.7.5)
* [http://www.postgresql.org/](PostgreSQL v 9.3)
* [http://postgis.net/](PostGIS v 2.1.7)

### Installation
1. [Install PostGIS](https://wiki.openstreetmap.org/wiki/PostGIS/Installation)
2. Install Open Trails database
```
$ createdb -O [your-db-user] open-trails -E utf8 -T [postgis-template-db]
$ psql -d open-trails -f open-trails.sql
```
3. Update `config.json` with your database settings
4. Install **trails-editor** dependencies
```
$ npm install
```
5. Run tests with [http://mochajs.org/](MochaJS)
```
$ mocha test
```
6. Run server!
```
$ node index.js
```
