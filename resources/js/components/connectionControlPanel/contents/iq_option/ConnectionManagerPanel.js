import React, { useState, useEffect } from "react";
import { useWebsocketIqOption, Loading } from "../../../helpers/Helpers";
import { Box, Typography, Button } from "@material-ui/core";
import params from "../../../../config/params";

const ConnectionManagerPanel = ({
    connectionManager,
    onStateConnectionChange,
}) => {
    const {
        connectIqOption,
        disconnectIqOption,
        connectionState,
        turboActives,
        binaryActives,
        subscribeCandles,
    } = useWebsocketIqOption(connectionManager);

    const [loading, setLoading] = useState(false);

    const startIqOptionConnection = () => {
        if (connectionState == params.connectionStates.disconnected) {
            setLoading(true);
            connectIqOption();
        }
    };

    const stopIqOptionConnection = () => {
        if (connectionState == params.connectionStates.connected) {
            setLoading(true);
            disconnectIqOption();
        }
    };

    useEffect(() => {
        if (
            connectionState == params.connectionStates.disconnected ||
            connectionState == params.connectionStates.connected
        ) {
            setLoading(false);
        }

        if (typeof onStateConnectionChange == "function") {
            onStateConnectionChange(connectionState);
        }
    }, [connectionState]);

    useEffect(() => {
        if (
            Object.keys(turboActives).length &&
            Object.keys(binaryActives).length
        )
            subscribeCandles();
    }, [turboActives, binaryActives]);

    return (
        <Box align="left">
            <Loading open={loading} />
            <Typography variant="h6">
                Administrador de conexión ({connectionManager.email})
            </Typography>
            <Typography variant="body2">
                {params.connectionStateNames[connectionState]}
            </Typography>
            <Box pt={2}>
                <Typography>OPCIONES BINARIAS</Typography>
                <Typography variant="body2">
                    {Object.keys(turboActives).length} activo(s) disponibles
                    para TURBO
                </Typography>
                <Typography variant="body2">
                    {Object.keys(binaryActives).length} activo(s) disponibles
                    para BINARIAS
                </Typography>
            </Box>
            <Box pt={2}>
                {connectionState == params.connectionStates.disconnected ? (
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        fullWidth
                        onClick={startIqOptionConnection}
                    >
                        Iniciar
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        fullWidth
                        onClick={stopIqOptionConnection}
                    >
                        Detener
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default ConnectionManagerPanel;
