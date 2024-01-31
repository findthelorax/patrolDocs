import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { api } from '../api/MountainAPI';
import { api as equipmentApi } from '../api/EquipmentAPI';
import { api as hutApi } from '../api/HutAPI';
import { api as liftApi } from '../api/LiftAPI';
import { api as lodgeApi } from '../api/LodgeAPI';
import { api as aidRoomApi } from '../api/AidRoomAPI';
// import { api as paperworkApi } from '../api/PaperworkAPI';
import { api as patrollerApi } from '../api/PatrollerAPI';
import { api as trailApi } from '../api/TrailAPI';
import { DateContext } from './DateContext';

export const MountainContext = createContext();

const useFetch = (apiFunc, id) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		const response = await apiFunc(id);
		setData(response || []);
		setIsLoading(false);
	}, [apiFunc, id]);

	return [data, isLoading, fetchData];
};

export const MountainProvider = ({ children }) => {
	const [selectedMountain, setSelectedMountain] = useState(null);

	const [mountains, isMountainsLoading, fetchMountains] = useFetch(api.getAllMountains);
	const [areas, isAreasLoading, fetchAreas] = useFetch(api.getAllAreas, selectedMountain?._id);
	const [huts, isHutsLoading, fetchHuts] = useFetch(hutApi.getAllHuts, selectedMountain?._id);
	const [lodges, isLodgesLoading, fetchLodges] = useFetch(lodgeApi.getAllLodges, selectedMountain?._id);
	const [aidRooms, isAidRoomsLoading, fetchAidRooms] = useFetch(aidRoomApi.getAllAidRooms, selectedMountain?._id);
	const [lifts, isLiftsLoading, fetchLifts] = useFetch(liftApi.getAllLifts, selectedMountain?._id);
	const [trails, isTrailsLoading, fetchTrails] = useFetch(trailApi.getAllTrails, selectedMountain?._id);
	const [equipment, isEquipmentLoading, fetchEquipment] = useFetch(
		equipmentApi.getAllEquipment,
		selectedMountain?._id
	);
	// const [paperwork, isPaperworkLoading, fetchPaperwork] = useFetch(paperworkApi.getAllPaperwork, selectedMountain?._id);
	const [patrollers, isPatrollersLoading, fetchPatrollers] = useFetch(
		patrollerApi.getAllPatrollers,
		selectedMountain?._id
	);
	const [currentDayPatrolDispatcher, setCurrentDayPatrolDispatcher] = useState(null);
	const [patrolDispatcher, setPatrolDispatcher] = useState([]);
	const { selectedDate } = useContext(DateContext);

	const locationTypes = ['Trails', 'Huts', 'First Aid Rooms', 'Other'];

	const locations = {
		Trails: trails,
		Huts: huts,
		'First Aid Rooms': aidRooms,
		Other: [],
	};

	const isLoading =
		isMountainsLoading ||
		isAreasLoading ||
		isHutsLoading ||
		isAidRoomsLoading ||
		isLodgesLoading ||
		isLiftsLoading ||
		isTrailsLoading ||
		isPatrollersLoading ||
		isEquipmentLoading;

	const selectMountain = (mountain) => {
		setSelectedMountain(mountain);
		localStorage.setItem('selectedMountainId', mountain._id);
	};

	async function handleServiceToggle(item) {
		const updatedEquipment = { ...item, inService: !item.inService };
		try {
			await equipmentApi.updateEquipment(selectedMountain._id, item._id, updatedEquipment);
			fetchEquipment();
		} catch (error) {
			console.error(`Error toggling service status for equipment with id ${item._id}`, error);
		}
	}

	const fetchPatrolDispatcherForDate = useCallback(async (date) => {
		const formattedDate = date.toISOString().split('T')[0];

		try {
			const response = await patrollerApi.getPatrolDispatcherForDate(selectedMountain._id, formattedDate);
			setCurrentDayPatrolDispatcher(response);
		} catch (error) {
			console.error(
				`Error fetching patrol dispatcher for date ${formattedDate} for mountain with id ${selectedMountain._id}`,
				error
			);
		}
	}, [selectedMountain, setCurrentDayPatrolDispatcher]);

	useEffect(() => {
		if (selectedDate && selectedMountain) {
			fetchPatrolDispatcherForDate(selectedDate)
				.then((data) => setPatrolDispatcher(data))
				.catch((error) => console.error(error));
		}
	}, [selectedDate, selectedMountain, fetchPatrolDispatcherForDate]);

	useEffect(() => {
		fetchMountains();
	}, [fetchMountains]);

	useEffect(() => {
		if (selectedMountain) {
			fetchAreas();
			fetchHuts();
			fetchAidRooms();
			fetchLodges();
			fetchLifts();
			fetchTrails();
			fetchPatrollers();
			fetchEquipment();
			fetchPatrolDispatcherForDate(new Date());
			// fetchPaperwork();
		}
	}, [
		selectedMountain,
		fetchAreas,
		fetchHuts,
		fetchAidRooms,
		fetchLodges,
		fetchLifts,
		fetchTrails,
		fetchPatrollers,
		fetchEquipment,
		fetchPatrolDispatcherForDate,
	]);

	return (
		<MountainContext.Provider
			value={{
				isLoading,
				mountains,
				fetchMountains,
				selectedMountain,
				selectMountain,
				setSelectedMountain,
				areas,
				fetchAreas,
				huts,
				fetchHuts,
				aidRooms,
				fetchAidRooms,
				lodges,
				fetchLodges,
				lifts,
				fetchLifts,
				trails,
				fetchTrails,
				patrollers,
				fetchPatrollers,
				currentDayPatrolDispatcher,
				fetchPatrolDispatcherForDate,
				patrolDispatcher,
				setPatrolDispatcher,
				equipment,
				fetchEquipment,
				handleServiceToggle,
				locationTypes,
				locations,
				// paperwork,
				// fetchPaperwork,
				api,
			}}
		>
			{children}
		</MountainContext.Provider>
	);
};
