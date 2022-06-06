import React, { useState, useEffect } from 'react';
import params from '../../../../config/params';
import { Box, Typography, Button } from '@material-ui/core';
import TraderConnection from './TraderConnection';

const TraderSenderPanel = ({ traderSender, stateConnectionManager }) => {
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
        	<Typography variant="h6">Traders disponibles para enviar operaciones</Typography>
	        <Box pt={2}>
	        	<Typography variant="body2">{traderSender?traderSender.length:0} disponible(s) / {counterConnections} conectado(s)</Typography>
	        	<Typography variant="body2">{counterOperations} operaciones recibidas</Typography>
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
	        		traderSender && traderSender.length?
	        		myMapObject(traderSender, (trader, i) => {
	        			return <TraderConnection
	        				key={i}
	        				showTraderData={true}
	        				trader={trader}
	        				stateConnectionManager={stateConnectionManager}
	        				subscriptions={true}
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

export default TraderSenderPanel;
