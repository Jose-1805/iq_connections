import React, { useState, useEffect, useRef } from "react";

import useBinaryOptions from "./iqOption/useBinaryOptions";
import params from "../../../../config/params";

const useWebsocketIqOption = (user, subscriptions = false) => {
    const [ws, setWs] = useState(null);
    const [connectionState, setConnectionState] = useState(
        params.connectionStates.disconnected
    );
    const [profile, setProfile] = useState(null);
    const [demoBalanceid, setDemoBalanceId] = useState(null);
    const [realBalanceid, setRealBalanceId] = useState(null);
    const [connectWs, setConnectWs] = useState(false);
    const operationsId = useRef({});

    const {
        initData,
        restartData,
        setActives,
        startTraderMood,
        setTradeMood,
        traderMoodTurbo,
        traderMoodBinary,
        turboActives,
        binaryActives,
        subscribeCandles,
    } = useBinaryOptions(ws);

    const connectWebsocket = () => {
        if (!ws && user) {
            setConnectionState(params.connectionStates.connecting);
            setWs(new WebSocket("wss://iqoption.com/echo/websocket"));
        }
    };

    const disconnectWebsocket = () => {
        if (ws) {
            setConnectionState(params.connectionStates.disconnecting);
            ws.close();
        }
    };

    const subscribePortfolio = (
        instrument_type_1,
        instrument_type_2,
        balance_id
    ) => {
        let dataSend = {
            name: "subscribeMessage",
            msg: {
                name: "portfolio.order-changed",
                version: "2.0",
                params: {
                    routingFilters: {
                        user_id: profile.id,
                        instrument_type: instrument_type_1, //forex, cfd, crypto, digital-option, turbo, binary
                    },
                },
            },
        };

        send(JSON.stringify(dataSend));

        dataSend = {
            name: "subscribeMessage",
            msg: {
                name: "portfolio.position-changed",
                version: "3.0",
                params: {
                    routingFilters: {
                        user_id: profile.id,
                        user_balance_id: balance_id,
                        instrument_type: instrument_type_2, //forex, cfd, crypto, digital-option, turbo-option, binary-option
                    },
                },
            },
        };

        send(JSON.stringify(dataSend));
    };

    const getCandles = () => {
        const dataSend = {
            name: "sendMessage",
            local_time: 16936,
            msg: {
                name: "get-candles",
                version: "2.0",
                body: {
                    active_id: 79,
                    size: 60,
                    from_id: 2392495,
                    to_id: 2392509,
                    split_normalization: true,
                    only_closed: true,
                },
            },
        };

        send(JSON.stringify(dataSend));
    };

    /*const sendForex = (instrument_id) => {
		let data = {
		    "name": "sendMessage",
		    "msg": {
		        "name": "place-order-temp",
		        "version": "4.0",
		        "body": {
		            "user_balance_id": demoBalanceid,
		            "client_platform_id": 9,
		            "instrument_type": "forex",
		            "instrument_id": instrument_id,//"USDJPY"
		            "side": "buy",
		            "type": "market",
		            "amount": "1",
		            "leverage": 500,
		            "limit_price": 0,
		            "stop_price": 0,
		            "auto_margin_call": false,
		            "use_trail_stop": false,
		            "stop_lose_value": 40,
		            "stop_lose_kind": "percent"
		        }
		    }
		}

		send(JSON.stringify(data));
	}*/

    const send = (textSend) => {
        if (textSend && ws) {
            //console.log(user.name, "SEND");
            ws.send(textSend);
        }
    };

    useEffect(() => {
        if (connectWs) {
            connectWebsocket();
        } else {
            disconnectWebsocket();
        }
    }, [connectWs]);

    useEffect(() => {
        if (ws) {
            ws.onopen = () => {
                /*const sendData = {
				    "name": "authenticate",
				    "msg": {
				        "ssid": user.brokers[0].pivot.token,
				        "protocol": 3,
				        "session_id": ""
				    }
				}*/

                const sendData = {
                    name: "ssid",
                    msg: user.token,
                };

                ws.send(JSON.stringify(sendData));
                setTimeout(() => {
                    getCandles();
                }, 3000);
            };

            ws.onclose = (e) => {
                setConnectionState(params.connectionStates.disconnected);
                if (connectWs) {
                    restartData();
                    connectWebsocket();
                } else {
                    restartData();
                    setWs(null);
                }
            };

            ws.onmessage = function (e) {
                if (e.data) {
                    let data = JSON.parse(e.data);

                    if (data.name != "timeSync" && data.name != "heartbeat") {
                        switch (data.name) {
                            case "profile":
                                setProfile(data.msg);
                                //console.log(user.name, data.msg);
                                setConnectionState(
                                    params.connectionStates.connected
                                );
                                //Carga los datos de divisas de opciones binarias
                                initData();
                                break;
                            //Operaciones abiertas desde el actual websocket
                            case "order-placed-temp":
                                operationsId.current = Object.assign(
                                    {},
                                    operationsId.current,
                                    { [data.msg.id]: true }
                                );
                                console.log(data.name, data);
                                break;
                            case "order-changed":
                                if (operationsId.current[data.msg.id]) {
                                    console.log(user.name, data.msg.avg_price);
                                }
                                break;
                            case "initialization-data":
                                //console.log(data.name, data);
                                setActives(
                                    data.msg.turbo.actives,
                                    "turbo-option"
                                );
                                setActives(
                                    data.msg.binary.actives,
                                    "binary-option"
                                );
                                break;
                            case "candle-generated":
                                /*if(data.msg.active_id == 1)
				    				console.log(data.msg.active_id, data.msg.close);*/
                                break;
                            case "traders-mood-changed":
                            case "traders-mood":
                                setTradeMood(data.msg);
                                break;
                            default:
                                console.log(user.email);
                                console.log(data.name, data);
                                break;
                        }
                    }
                }
            };

            ws.onerror = (e) => {
                setWs(null);
                //console.log('onerror', e);
            };
        }
    }, [ws]);

    useEffect(() => {
        if (profile) {
            myMapObject(profile.balances, (el, id) => {
                if (el.type == 4) {
                    setDemoBalanceId(el.id);
                } else if (el.type == 1) {
                    setRealBalanceId(el.id);
                }
            });
        }
    }, [profile]);

    useEffect(() => {
        if (demoBalanceid && subscriptions) {
            subscribePortfolio("forex", "forex", demoBalanceid);
            subscribePortfolio(
                "digital-option",
                "digital-option",
                demoBalanceid
            );
            subscribePortfolio("turbo", "turbo-option", demoBalanceid);
            subscribePortfolio("binary", "binary-option", demoBalanceid);
        }
    }, [demoBalanceid]);

    useEffect(() => {
        if (realBalanceid && subscriptions) {
            subscribePortfolio("forex", "forex", realBalanceid);
            subscribePortfolio(
                "digital-option",
                "digital-option",
                realBalanceid
            );
            subscribePortfolio("turbo", "turbo-option", realBalanceid);
            subscribePortfolio("binary", "binary-option", realBalanceid);
        }
    }, [realBalanceid]);

    return {
        sendWsMessage: (text) => send(text),
        connectIqOption: () => connectWebsocket(),
        disconnectIqOption: () => disconnectWebsocket(),
        connectionState,

        //OPCIONES BINARIAS
        initData,
        startTraderMood,
        traderMoodTurbo,
        traderMoodBinary,
        turboActives,
        binaryActives,
        subscribeCandles,
    };
};

export default useWebsocketIqOption;
