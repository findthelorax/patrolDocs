const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mountainRoutes = require('./mountains/mountainRoutes');
const hutRoutes = require('./huts/hutRoutes');
const lodgeRoutes = require('./lodges/lodgeRoutes');
const liftRoutes = require('./lifts/liftRoutes');
const trailRoutes = require('./trails/trailRoutes');

const patrollerRoutes = require('./patrollers/patrollerRoutes');

const incidentRoutes = require('./incidents/incidentRoutes');
const equipmentRoutes = require('./equipment/equipmentRoutes');
const paperworkRoutes = require('./equipment/paperworkRoutes');

const app = express();
const IP = process.env.RENDER_EXTERNAL_HOSTNAME || process.env.IP;
const URI = process.env.URI;
const PORT = process.env.PORT;
const { MONGODB_URL, MONGODB_DB_NAME } = process.env;

const db = require('./helpers/db');

db()
    .then(() => {
        console.log(`Database connected to: ${URI}`);
    })
    .catch((err) => console.error(err));

app.use(
	cors({
		origin: `${IP}`,
		credentials: true,
	})
);
app.use(express.json());

app.use(mountainRoutes);
app.use(hutRoutes);
app.use(lodgeRoutes);
app.use(liftRoutes);
app.use(trailRoutes);

app.use(equipmentRoutes);
app.use(incidentRoutes);
app.use(paperworkRoutes);

app.use(patrollerRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on ${IP}:${PORT}`);
});