const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mountainRoutes = require('./mountains/mountainRoutes');
const hutRoutes = require('./huts/hutRoutes');

const liftRoutes = require('./lifts/liftRoutes');

const trailRoutes = require('./trails/trailRoutes');

const patrollerRoutes = require('./patrollers/patrollerRoutes');

const incidentRoutes = require('./incidents/incidentRoutes');

const equipmentRoutes = require('./equipment/equipmentRoutes');
const paperworkRoutes = require('./equipment/paperworkRoutes');

const app = express();
const IP = process.env.IP;
const BPORT = process.env.BACKEND_PORT;
const FPORT = process.env.FRONTEND_PORT;
const { MONGODB, DB_NAME } = process.env;

const db = require('./helpers/db');

db()
    .then(() => {
        console.log(`Database connected to: ${MONGODB}/${DB_NAME}`);
    })
    .catch((err) => console.error(err));

app.use(
	cors({
		origin: `${IP}:${FPORT}`,
		credentials: true,
	})
);
app.use(express.json());


app.use('/api/mountain', mountainRoutes);
app.use('/api/mountain', hutRoutes);

app.use('/api/mountain', liftRoutes);

app.use('/api/mountain', trailRoutes);

app.use('/api/mountain', equipmentRoutes);

app.use('/api/paperwork', paperworkRoutes);

app.use('/api/patroller', patrollerRoutes);

app.use('/api/incident', incidentRoutes);

app.listen(BPORT, () => {
	console.log(`Server is running on ${IP}:${BPORT}`);
});