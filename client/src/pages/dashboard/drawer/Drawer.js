import React from 'react';
import { MainListItems, SecondaryListItems, SettingsListItems } from './NavItemsList';
import { Box, ListItem, Drawer } from '@mui/material';
// import restaurantPNG from '../../../assets/restaurant.png';
// import { StyledDrawer, drawerWidth, StyledDrawerAvatar } from '../../../styles/mainLayoutStyles';
import { Link } from 'react-router-dom';

export function PermanentDrawerLeft() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                sx={{
                    width: 240,
                    flexShrink: 0,
                }}
                variant="permanent"
                anchor="left"
            >
                <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
                    {/* <StyledDrawerAvatar
                        src={restaurantPNG}
                        alt="Restaurant"
                        variant="square"
                    /> */}
                </ListItem>
                <Box>
                    <MainListItems component={Link} />
                </Box>
                <Box>
                    <SecondaryListItems component={Link} />
                </Box>
                <Box>
                    <SettingsListItems component={Link} />
                </Box>
            </Drawer>
        </Box>
    );
}