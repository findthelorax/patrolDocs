import React, { createContext, useState, useEffect } from 'react';
import { api } from '../api/MountainAPI';

export const MountainContext = createContext();

export const MountainProvider = ({ children }) => {
	const [mountains, setMountains] = useState([]);
	const [areas, setAreas] = useState(null);
	const [huts, setHuts] = useState(null);
	const [lodges, setLodges] = useState(null);
	const [lifts, setLifts] = useState(null);
	const [trails, setTrails] = useState(null);
	const [patrollers, setPatrollers] = useState([]);

	const [selectedMountain, setSelectedMountain] = useState(null);
	const [selectedArea, setSelectedArea] = useState(null);
	const [selectedHut, setSelectedHut] = useState(null);
	const [selectedLodge, setSelectedLodge] = useState(null);
	const [selectedLift, setSelectedLift] = useState(null);
	const [selectedTrail, setSelectedTrail] = useState(null);
	const [selectedPatroller, setSelectedPatroller] = useState(null);

	const fetchMountains = async () => {
		const data = await api.getAllMountains();
		setMountains(data);
	};

	const fetchAreas = async () => {
		if (selectedMountain) {
			const data = await api.getAreas(selectedMountain.id);
			setAreas(data || []); // set areas to an empty array when there are no areas
		} else {
			setAreas([]); // set areas to an empty array when there is no selected mountain
		}
	};

	const fetchHuts = async () => {
		if (selectedMountain) {
			const data = await api.getHuts(selectedMountain.id);
			setHuts(data || []);
		} else {
			setHuts([]);
		}
	};

	const fetchLodges = async () => {
		if (selectedMountain) {
			const data = await api.getLodges(selectedMountain.id);
			setLodges(data || []);
		} else {
			setLodges([]);
		}
	};

	const fetchLifts = async () => {
		if (selectedMountain) {
			const data = await api.getLifts(selectedMountain.id);
			setLifts(data || []);
		} else {
			setLifts([]);
		}
	};

	const fetchTrails = async () => {
		if (selectedMountain) {
			const data = await api.getTrails(selectedMountain.id);
			setTrails(data || []);
		} else {
			setTrails([]);
		}
	};

	const fetchPatrollers = async () => {
		// New function to fetch patrollers
		if (selectedMountain) {
			const data = await api.getPatrollers(selectedMountain.id);
			setPatrollers(data);
		} else {
			setPatrollers([]);
		}
	};

	const selectMountain = (mountain) => {
		setSelectedMountain(mountain);
	};

	const selectArea = (area) => {
		setSelectedArea(area);
	};

	const selectHut = (hut) => {
		setSelectedHut(hut);
	};

	const selectLodge = (lodge) => {
		setSelectedLodge(lodge);
	};

    
	const selectLift = (lift) => {
		setSelectedLift(lift);
	};

	const selectTrail = (trail) => {
		setSelectedTrail(trail);
	};

    const selectPatroller = (patroller) => {
        setSelectedPatroller(patroller);
    };

	useEffect(() => {
		fetchMountains();
	}, []);

	useEffect(() => {
        fetchAreas();
        fetchHuts();
        fetchLodges();
        fetchLifts();
        fetchTrails();
		fetchPatrollers();
	}, [selectedMountain]);

	return (
		<MountainContext.Provider
			value={{
				mountains,
				fetchMountains,
				selectedMountain,
				selectMountain,
                areas,
                fetchAreas,
				selectedArea,
				selectArea,
                huts,
                fetchHuts,
				selectedHut,
				selectHut,
                lodges,
                fetchLodges,
				selectedLodge,
				selectLodge,
                lifts,
                fetchLifts,
				selectedLift,
				selectLift,
                trails,
                fetchTrails,
				selectedTrail,
				selectTrail,
				patrollers,
				fetchPatrollers,
			}}
		>
			{children}
		</MountainContext.Provider>
	);
};
