import React, { useContext, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, SvgIcon } from '@mui/material';
import { FaSnowplow, FaTree } from "react-icons/fa";
import { MountainContext } from '../../contexts/MountainContext';

const GreenCircle = (props) => (
	<SvgIcon {...props}>
		<circle cx="12" cy="12" r="8" fill="green" />
	</SvgIcon>
);

const BlueSquare = (props) => (
	<SvgIcon {...props}>
		<rect width="16" height="16" fill="blue" />
	</SvgIcon>
);

const BlackDiamond = (props) => (
	<SvgIcon {...props}>
		<polygon points="12,2 22,22 2,22" fill="black" />
	</SvgIcon>
);

const DoubleBlackDiamond = (props) => (
	<SvgIcon {...props}>
		<polygon points="7,2 17,22 2,22" fill="black" />
		<polygon points="17,2 27,22 12,22" fill="black" />
	</SvgIcon>
);

function TrailsTable() {
	const { trails, fetchTrails, selectedMountain } = useContext(MountainContext);

	useEffect(() => {
		if (selectedMountain) {
			fetchTrails();
		}
	}, [selectedMountain, fetchTrails]);

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Trail Name</TableCell>
						<TableCell align="right">Difficulty</TableCell>
						<TableCell align="right">Status</TableCell>
						<TableCell align="right">Condition</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{trails.map((trail) => (
                        <TableRow key={trail.name} className={trail.status === 'Open' ? 'open' : 'closed'}>
							<TableCell component="th" scope="row">
								{trail.name}
							</TableCell>
							<TableCell align="right">
								{trail.difficulty}
								{trail.difficulty === 'Green' && <GreenCircle />}
								{trail.difficulty === 'Difficult' && <BlueSquare />}
								{trail.difficulty === 'Hard' && <BlackDiamond />}
								{trail.difficulty === 'Very Hard' && <DoubleBlackDiamond />}
							</TableCell>
							<TableCell align="right">
								{trail.condition}
								{trail.condition === 'Glades' && <FaTree />}
								{trail.condition === 'Moguls' && <BlueSquare />}
								{trail.condition === 'Groomed' && <FaSnowplow />}
								{trail.condition === 'Natural' && <DoubleBlackDiamond />}
							</TableCell>
							<TableCell align="right">{trail.status}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default TrailsTable;
