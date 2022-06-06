import React, { useState, useEffect, useRef } from 'react';

const useBinaryOptions = (ws) => {
	const [ currentTurboActives, setCurentTurboActives ] = useState({});
	const [ traderMoodActivesTurbo, setTraderMoodActivesTurbo ] = useState({});
	const traderMoodActivesTurboRef = useRef({});

	const [ currentBinaryActives, setCurentBinaryActives ] = useState({});
	const [ traderMoodActivesBinary, setTraderMoodActivesBinary ] = useState({});
	const traderMoodActivesBinaryRef = useRef({});

	const restartData = () => {
		setCurentTurboActives({});
		setTraderMoodActivesTurbo({});
		traderMoodActivesTurboRef.current = {};
		setCurentBinaryActives({});
		setTraderMoodActivesBinary({});
		traderMoodActivesBinaryRef.current = {};
	}

	const initData = () => {
		const dataSend = {
		    "name": "sendMessage",
		    "msg": {
		        "name": "get-initialization-data",
		        "version": "3.0",
		        "body": {}
		    }
		}

		ws.send(JSON.stringify(dataSend));
	}

	const setActives = (data, instrumentType = "binary-option") => {
		const keys = Object.keys(data);

		if(keys.length){
			let newActives = {};

			for(let i = 0; i < keys.length; i++){
				const active = data[keys[i]];
				if(active.enabled){
					newActives[active.id] = active;
				}
			}

			if(instrumentType == "binary-option")
				setCurentBinaryActives(newActives);
			else if(instrumentType == "turbo-option")
				setCurentTurboActives(newActives);
		}
	}

	//Solicita la información de trader mood para los activos actuales
	//y solicita la suscripción a las actualizaciones de trader mood
	const startTraderMood = (instrumentType = "binary-option") => {
		const actives = instrumentType == "binary-option"?currentBinaryActives:(instrumentType == "turbo-option"?currentTurboActives:{});

		const keys = Object.keys(actives);

		if(keys.length){
			let newTraderMoodActives = {};

			for(let i = 0; i < keys.length; i++){
				const active = actives[keys[i]];

				let name = active.description.split(".");
				name = name.length == 2?name[1].split("/"):null;

				newTraderMoodActives[active.id] = {
					name:name,
					description:active.description,
					id:active.id,
					tradermood:0
				}

				const dataSendTradermood = {
				    "name": "sendMessage",
				    "msg": {
				        "name": "get-traders-mood",
				        "version": "1.0",
				        "body": {
				            "instrument": instrumentType,
				            "asset_id": active.id
				        }
				    }
				}

				ws.send(JSON.stringify(dataSendTradermood));

				const dataSendSubsTradermood = {
				    "name": "subscribeMessage",
				    "msg": {
				        "name": "traders-mood-changed",
				        "params": {
				            "routingFilters": {
				                "instrument": instrumentType,
				                "asset_id": active.id
				            }
				        }
				    }
				}

				ws.send(JSON.stringify(dataSendSubsTradermood));
			}

			if(instrumentType == "turbo-option"){
				traderMoodActivesTurboRef.current = newTraderMoodActives;
				setTraderMoodActivesTurbo(traderMoodActivesTurboRef.current);
			}else if(instrumentType == "binary-option"){
				traderMoodActivesBinaryRef.current = newTraderMoodActives;
				setTraderMoodActivesBinary(traderMoodActivesBinaryRef.current);
			}
		}
	}

	const setTradeMood = (data) => {
		if(data.instrument == "binary-option"){
			const new_data = Object.assign({}, traderMoodActivesBinaryRef.current[data.asset_id], {trademood:parseFloat(data.value).toFixed(2)})
			traderMoodActivesBinaryRef.current = Object.assign(
				{},
				traderMoodActivesBinaryRef.current,
				{[data.asset_id]:new_data}
			)
			setTraderMoodActivesBinary(traderMoodActivesBinaryRef.current);
		}else if(data.instrument == "turbo-option"){
			const new_data = Object.assign({}, traderMoodActivesTurboRef.current[data.asset_id], {trademood:parseFloat(data.value).toFixed(2)})
			traderMoodActivesTurboRef.current = Object.assign(
				{},
				traderMoodActivesTurboRef.current,
				{[data.asset_id]:new_data}
			)
			setTraderMoodActivesTurbo(traderMoodActivesTurboRef.current);
		}
	}

	const subscribeCandles = (exceptions = []) => {
		
		const keysTurbo = Object.keys(currentTurboActives);
		const keysBinary = Object.keys(currentBinaryActives);

		let dataIds = keysTurbo.concat(keysBinary);
		dataIds = dataIds.filter((el, i) => {
			return dataIds.indexOf(el) == i && exceptions.indexOf(el) == -1;
		});

		for(let i = 0; i < dataIds.length; i++){
			const dataSend = {
			    "name": "subscribeMessage",
			    "msg": {
			        "name": "candle-generated",
			        "params": {
			            "routingFilters": {
			                "active_id": dataIds[i],
			                "size": 60
			            }
			        }
			    }
			}

			ws.send(JSON.stringify(dataSend));
		}
	}

	/*useEffect(() => {
		if(Object.keys(currentBinaryActives).length){
			subscribeCandles();
		}
	}, [currentBinaryActives])*/

	/*useEffect(() => {
		if(Object.keys(currentTurboActives).length){
			startTraderMood("turbo-option");
		}
	}, [currentTurboActives])

	useEffect(() => {
		if(Object.keys(currentBinaryActives).length){
			startTraderMood("binary-option");
		}
	}, [currentBinaryActives])*/

	return {
		setActives,

		startTraderMood,
		setTradeMood,
		traderMoodTurbo:traderMoodActivesTurbo,
		traderMoodBinary:traderMoodActivesBinary,

		turboActives:currentTurboActives,
		binaryActives:currentBinaryActives,

		subscribeCandles,
		initData,
		restartData
	}
}

export default useBinaryOptions;