import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import IqOptionManager from './contents/iq_option/IqOptionManager';

const ConnectionControlPanel = ({ }) => {
    return (
        <Box p={4}>
        	<Typography align="center" variant="h3">PANEL DE CONTROL</Typography>
        	<IqOptionManager/>
        </Box>
    );
};

export default ConnectionControlPanel;
