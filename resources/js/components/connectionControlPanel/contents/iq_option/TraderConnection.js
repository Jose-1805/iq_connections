import React, { useState, useEffect } from 'react';
import { useWebsocketIqOption } from '../../../helpers/Helpers';
import { Box, Typography } from '@material-ui/core';
import params from '../../../../config/params';

const TraderConnection = ({ showTraderData, trader, stateConnectionManager, connect, onConnect, onDisconnect, subscriptions }) => {
	const { connectIqOption, disconnectIqOption, connectionState } = useWebsocketIqOption(trader, subscriptions);
	
	const startIqOptionConnection = () => {
		if(
			connectionState == params.connectionStates.disconnected
			&& stateConnectionManager == params.connectionStates.connected
		){
			connectIqOption();
		}
	}

	const stopIqOptionConnection = () => {
		if(connectionState == params.connectionStates.connected){
			disconnectIqOption();
		}
	}

	useEffect(() => {
		if(stateConnectionManager == params.connectionStates.disconnected || !connect){
			stopIqOptionConnection();
		}else if(connect){
			startIqOptionConnection();
		}
	}, [connect, stateConnectionManager])

	useEffect(() => {
		if(connectionState == params.connectionStates.connected && onConnect && typeof onConnect == "function"){
			onConnect();
		}else if(connectionState == params.connectionStates.disconnected && onDisconnect && typeof onDisconnect == "function"){
			onDisconnect();
		}
	}, [connectionState])

    return (
        showTraderData?<Box pt={1}>
        	<Typography>{trader.email}</Typography>
        	<Typography variant="caption">{params.connectionStateNames[connectionState]}</Typography>
        </Box>:<React.Fragment/>
    );
};

export default TraderConnection;