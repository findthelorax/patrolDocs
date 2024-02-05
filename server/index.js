const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mountainRoutes = require('./mountains/mountainRoutes');
const hutRoutes = require('./huts/hutRoutes');
const lodgeRoutes = require('./lodges/lodgeRoutes');
const liftRoutes = require('./lifts/liftRoutes');
const trailRoutes = require('./trails/trailRoutes');
const aidRoomRoutes = require('./aidRooms/aidRoomRoutes');
const patrollerRoutes = require('./patrollers/patrollerRoutes');

const incidentLogRoutes = require('./incidents/incidentLogRoutes');
const equipmentRoutes = require('./equipment/equipmentRoutes');
const paperworkRoutes = require('./equipment/paperworkRoutes');

const app = express();
const IP = process.env.IP;
const BPORT = process.env.BACKEND_PORT;
const FPORT = process.env.FRONTEND_PORT;
const { MONGODB_URL, MONGODB_DB_NAME } = process.env;

const db = require('./helpers/db');

db()
    .then(() => {
        console.log(`Database connected to: ${MONGODB_URL}/${MONGODB_DB_NAME}`);
    })
    .catch((err) => console.error(err));

app.use(
	cors({
		origin: `${IP}:${FPORT}`,
		credentials: true,
	})
);
app.use(express.json());

app.use(mountainRoutes);
app.use(hutRoutes);
app.use(lodgeRoutes);
app.use(liftRoutes);
app.use(trailRoutes);
app.use(aidRoomRoutes);
app.use(equipmentRoutes);
app.use(incidentLogRoutes);
app.use(paperworkRoutes);

app.use(patrollerRoutes);

app.listen(BPORT, () => {
	console.log(`Server is running on ${IP}:${BPORT}`);
});