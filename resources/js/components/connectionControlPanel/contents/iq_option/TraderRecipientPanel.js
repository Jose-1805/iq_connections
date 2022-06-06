import React, { useState, useEffect } from 'react';
import params from '../../../../config/params';
import { Box, Typography, Button } from '@material-ui/core';
import TraderConnection from './TraderConnection';

const TraderRecipientPanel = ({ traderRecipient, stateConnectionManager }) => {
	const [ connectTraders, setConnectTraders ] = useState(false);
	const [ counterConnections, setCounterConnections ] = useState(0);
	const [ counterOperations, setCounterOperations ] = useState(0);

	useEffect(() => {
		if(stateConnectionManager == params.connectionStates.disconnected){
			setConnectTraders(false);
		}
	}, [stateConnectionManager])

    return (
        <Box align="left">
        	<Typography variant="h6">Traders disponibles para copiar operaciones</Typography>
	        <Box pt={2}>
	        	<Typography variant="body2">{traderRecipient?traderRecipient.length:0} disponible(s) / {counterConnections} conectado(s)</Typography>
        	</Box>

	        <Box pt={2}>
	        	{
	        		
	        		!connectTraders?
		        	<Button 
			        	variant="contained" 
			        	color="secondary" 
			        	size="large"
			        	fullWidth
			        	disabled={stateConnectionManager != params.connectionStates.connected}
			        	onClick={() => setConnectTraders(true)}
			        >
			        	Conectar
			        </Button>
			        :<Button 
			        	variant="contained" 
			        	color="secondary" 
			        	size="large"
			        	fullWidth
			        	onClick={() => setConnectTraders(false)}
			        >
			        	Desconectar
			        </Button>
			    }
	        </Box>

	        <Box pt={2}>
	        	{
	        		traderRecipient && traderRecipient.length?
	        		myMapObject(traderRecipient, (trader, i) => {
	        			return <TraderConnection
	        				key={i}
	        				showTraderData={true}
	        				trader={trader}
	        				stateConnectionManager={stateConnectionManager}
	        				connect={connectTraders}
	        				onConnect={() => setCounterConnections(counterConnections+1)}
	        				onDisconnect={() => setCounterConnections(counterConnections?counterConnections-1:0)}
	        			/>
	        		}):null
	        	}
	        </Box>
        </Box>
    );
};

export default TraderRecipientPanel;
