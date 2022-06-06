import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import ConnectionManagerPanel from './ConnectionManagerPanel';
import TraderSenderPanel from './TraderSenderPanel';
import TraderRecipientPanel from './TraderRecipientPanel';

const Connections = ({ connectionManager, traderSender, traderRecipient }) => {

	const [ stateConnectionManager, setStateConnectionManager ] = useState(null);

    return (
        <Grid
			container
			direction="row"
			justify="center"
			alignItems="flex-start"
			spacing={2}
        >
        	<Grid item xs={12} md={4}>
        		<ConnectionManagerPanel 
        			connectionManager={connectionManager}
        			onStateConnectionChange={(new_state) => setStateConnectionManager(new_state)}
        		/>
        	</Grid>
        	<Grid item xs={12} md={4}>
        		<TraderSenderPanel 
        			traderSender={traderSender}
        			stateConnectionManager={stateConnectionManager}
        		/>
        	</Grid>
        	<Grid item xs={12} md={4}>
        		<TraderRecipientPanel 
        			traderRecipient={traderRecipient}
        			stateConnectionManager={stateConnectionManager}
        		/>
        	</Grid>
        </Grid>
    );
};

export default Connections;