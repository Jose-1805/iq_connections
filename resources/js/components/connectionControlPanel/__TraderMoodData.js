import React, { useEffect, useState } from 'react';

import { Box, Divider, Typography } from '@material-ui/core';
import { useWebsocketIqOption } from '../helpers/Helpers';

const UserConnection = ({user, connectToIqOption, testForex, jsonText, sendJsonText}) => {
	const { connectIqOption, disconnectIqOption, connectionState, connectionStateNames, sendForex, sendWsMessage, traderMoodTurbo, traderMoodBinary } = useWebsocketIqOption(user);

	useEffect(() => {
		if(connectToIqOption){
			connectIqOption();
		}else{
			disconnectIqOption();
		}
	}, [connectToIqOption])

	useEffect(() => {
		if(testForex){
			sendForex("USDJPY");
		}
	}, [testForex])

	useEffect(() => {
		if(sendJsonText && jsonText){
			sendWsMessage(jsonText);
		}
	}, [sendJsonText])

	const getInfoTradeMood = (instrumentType = "turbo-option") => {
		const dataTraderMood = instrumentType == "turbo-option"?traderMoodTurbo:traderMoodBinary;
		const keys = Object.keys(dataTraderMood);

		if(keys.length){
			let data = [];

			for(let i = 0; i < keys.length; i++){
				const dataActive = dataTraderMood[keys[i]];
				//console.log(dataActive)
				if(dataActive.name && dataActive.name.length >= 2 && dataActive.name[0].toUpperCase() == "USD"){
					data.push(<Typography color={parseFloat(dataActive.trademood) > 0.7?"primary":(parseFloat(dataActive.trademood) < 0.3?"secondary":"initial")} key={dataActive.id}>{dataActive.name[0]+"/"+dataActive.name[1]+" -> "+dataActive.trademood}</Typography>)
				}
			}

			data.push(<Box py={2} key="divider"><Divider/></Box>);

			for(let i = 0; i < keys.length; i++){
				const dataActive = dataTraderMood[keys[i]];
				//console.log(dataActive)
				if(dataActive.name && dataActive.name.length >= 2 && dataActive.name[1].toUpperCase() == "USD"){
					data.push(<Typography color={parseFloat(dataActive.trademood) > 0.7?"primary":(parseFloat(dataActive.trademood) < 0.3?"secondary":"initial")} key={dataActive.id}>{dataActive.name[0]+"/"+dataActive.name[1]+" -> "+dataActive.trademood}</Typography>)
				}
			}

			return data;
		}else{
			return <Typography>No hay activos suscritos para trademood</Typography>
		}
	}

    return (
        <React.Fragment>
	        <Box py={1}>
	        	<Typography variant="h6">{user.name + " ("+connectionStateNames[connectionState]+")"}</Typography>
		    </Box>
	        <Typography variant="h6">TURBO</Typography>
		    {
		    	getInfoTradeMood("turbo-option")
		    }
	        <Typography variant="h6">BINARY</Typography>
		    {
		    	getInfoTradeMood("binary-option")
		    }
        </React.Fragment>
    );
};

export default UserConnection;
