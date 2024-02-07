import React, { createContext, useState, useEffect, useContext } from 'react';
import { apis } from '../api';
import { useApiData } from '../hooks/useApiData';
import { SnackbarContext } from './SnackbarContext';

export const MountainContext = createContext();

export const MountainProvider = ({ children }) => {
	const { setSnackbarMessage, setSnackbarSeverity, setOpenSnackbar } = useContext(SnackbarContext);

	const [selectedMountain, setSelectedMountain] = useState(null);

	const [mountainData, mountainIsLoading, fetchMountainData, mountainError, setMountainData] = useApiData(
		apis.mountainApi.getAllMountains
	);
	const [areaData, areaIsLoading, fetchAreaData, areaError, setAreaData] = useApiData(
		apis.mountainApi.getAllAreas,
		selectedMountain?._id
	);
	const [lodgeData, lodgeIsLoading, fetchLodgeData, lodgeError, setLodgeData] = useApiData(
		apis.lodgeApi.getAllLodges,
		selectedMountain?._id
	);
	const [hutData, hutIsLoading, fetchHutData, hutError, setHutData] = useApiData(
		apis.hutApi.getAllHuts,
		selectedMountain?._id
	);
	const [liftData, liftIsLoading, fetchLiftData, liftError, setLiftData] = useApiData(
		apis.liftApi.getAllLifts,
		selectedMountain?._id
	);
	const [firstAidRoomData, firstAidRoomIsLoading, fetchFirstAidRoomData, firstAidRoomError, setFirstAidRoomData] =
		useApiData(apis.aidRoomApi.getAllAidRooms, selectedMountain?._id);
	const [trailData, trailIsLoading, fetchTrailData, trailError, setTrailData] = useApiData(
		apis.trailApi.getAllTrails,
		selectedMountain?._id
	);
	const [patrollerData, patrollerIsLoading, fetchPatrollerData, patrollerError, setPatrollerData] = useApiData(
		apis.patrollerApi.getAllPatrollers,
		selectedMountain?._id
	);
	const [equipmentData, equipmentIsLoading, fetchEquipmentData, equipmentError, setEquipmentData] = useApiData(
		apis.equipmentApi.getAllEquipment,
		selectedMountain?._id
	);

	const isLoading =
		mountainIsLoading ||
		areaIsLoading ||
		lodgeIsLoading ||
		hutIsLoading ||
		liftIsLoading ||
		firstAidRoomIsLoading ||
		trailIsLoading ||
		patrollerIsLoading ||
		equipmentIsLoading;

	async function handleUpdate(api, updateMethod, fetchMethod, id, updatedData) {
		try {
			await api[updateMethod](selectedMountain._id, id, updatedData);
			fetchMethod();
		} catch (error) {
			console.error(`Error updating entity with id ${id}`, error);
		}
	}

	async function handleCreateEntity(createFunction, fetchMethod, newEntity, ...args) {
		try {
			await createFunction(...args, newEntity);
			fetchMethod();
		} catch (error) {
			console.error(`Error creating new entity`, error);
		}
	}

	async function handleToggleEntity(api, fetchMethod, entity, toggleField) {
		const updatedEntity = { ...entity, [toggleField]: !entity[toggleField] };
		handleUpdate(api, 'update', fetchMethod, entity._id, updatedEntity);
	}

	async function handleCreateLodge(newLodge) {
		handleCreateEntity(apis.lodgeApi.createLodge, fetchLodgeData, newLodge, selectedMountain._id);
	}

	useEffect(() => {
		const storedMountainId = localStorage.getItem('selectedMountainId');
		if (storedMountainId && mountainData) {
			const storedMountain = mountainData.find((mountain) => mountain._id === storedMountainId);
			setSelectedMountain(storedMountain);
		}
	}, [mountainData]);

	useEffect(() => {
		fetchMountainData();
	}, [fetchMountainData]);

	useEffect(() => {
		if (
			mountainError ||
			areaError ||
			lodgeError ||
			hutError ||
			liftError ||
			firstAidRoomError ||
			trailError ||
			patrollerError ||
			equipmentError
		) {
			setSnackbarMessage(
				mountainError?.message ||
					areaError?.message ||
					lodgeError?.message ||
					hutError?.message ||
					liftError?.message ||
					firstAidRoomError?.message ||
					trailError?.message ||
					patrollerError?.message ||
					equipmentError?.message ||
					'An error occurred'
			);
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}
	}, [
		mountainError,
		areaError,
		lodgeError,
		hutError,
		liftError,
		firstAidRoomError,
		trailError,
		patrollerError,
		equipmentError,
		setSnackbarMessage,
		setSnackbarSeverity,
		setOpenSnackbar,
	]);

	const value = {
		selectedMountain,
		setSelectedMountain,
		apis,
		isLoading,
		mountains: mountainData,
		fetchMountains: fetchMountainData,
		areas: areaData,
		lodges: lodgeData,
		huts: hutData,
		lifts: liftData,
		firstAidRooms: firstAidRoomData,
		trails: trailData,
		patrollers: patrollerData,
		equipment: equipmentData,
	};

	return <MountainContext.Provider value={value}>{children}</MountainContext.Provider>;
};
