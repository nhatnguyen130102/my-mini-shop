'use client'
import MiniShopCard from '@/shared/components/MiniShopCard'
import { Box, Tab } from '@mui/material';
import React from 'react'
import TabContext from '@mui/lab/TabContext';
import { TabList, TabPanel } from '@mui/lab';
import UserTab from './components/UserTab';
import RoleTab from './components/RoleTab';

const PermissionPage = () => {
    const [value, setValue] = React.useState('user');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <MiniShopCard title='Permission Page'>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="User" value="user" />
                            <Tab label="Role" value="role" />
                            <Tab label="User Role" value="user-role" />
                        </TabList>
                    </Box>
                    <TabPanel value="user">
                        <UserTab />
                    </TabPanel>
                    <TabPanel value="role">
                        <RoleTab />
                    </TabPanel>
                    <TabPanel value="user-role">Item Three</TabPanel>
                </TabContext>
            </Box>
        </MiniShopCard>
    )
}

export default PermissionPage