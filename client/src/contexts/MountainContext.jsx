import React, { createContext, useState, useEffect } from 'react';
import { api } from '../api/MountainAPI';

export const MountainContext = createContext();

export const MountainProvider = ({ children }) => {
    const [mountains, setMountains] = useState([]);
    const [selectedMountain, setSelectedMountain] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedHut, setSelectedHut] = useState(null);
    const [selectedLodge, setSelectedLodge] = useState(null);
    const [selectedLift, setSelectedLift] = useState(null);
    const [selectedTrail, setSelectedTrail] = useState(null);
    const [patrollers, setPatrollers] = useState([]);

    const fetchMountains = async () => {
        const data = await api.getAllMountains();
        setMountains(data);
    };

    const fetchPatrollers = async () => { // New function to fetch patrollers
        if (selectedMountain) {
            const data = await api.getPatrollers(selectedMountain.id);
            setPatrollers(data);
        } else {
            setPatrollers([]);
        }
    };

    const selectMountain = (mountain) => {
        setSelectedMountain(mountain);
        fetchPatrollers(); // Fetch patrollers when a mountain is selected
    };

    const selectTrail = (trail) => {
        setSelectedTrail(trail);
    };

    const selectLift = (lift) => {
        setSelectedLift(lift);
    };

    const selectArea = (area) => {
        setSelectedArea(area);
    };

    const selectHut = (hut) => { // New function to select a hut
        setSelectedHut(hut);
    };

    const selectLodge = (lodge) => { // New function to select a lodge
        setSelectedLodge(lodge);
    };

    // Call fetchMountains when the component is mounted
    useEffect(() => {
        fetchMountains();
    }, []);

    return (
        <MountainContext.Provider value={{ mountains, fetchMountains, selectedMountain, selectMountain, selectedArea, selectArea, selectedHut, selectHut, selectedLodge, selectLodge, selectedLift, selectLift, selectedTrail, selectTrail, patrollers, fetchPatrollers }}>
            {children}
        </MountainContext.Provider>
    );
};