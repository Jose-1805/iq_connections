import React, { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Button,
    TextField,
    FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Loading, useHttpRequest } from "../../../helpers/Helpers";
import routes from "../../../../config/routes";
import Connections from "./Connections";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
}));

const IqOptionManager = () => {
    const { httpRequest } = useHttpRequest();
    const [emailConnectionManager, setEmailConnectionManager] = useState(
        "joseluiscapotemosquera@gmail.com"
    );
    const [connectionManager, setConnectionManager] = useState(null);
    const [traderSender, setTraderSender] = useState(null);
    const [traderRecipient, setTraderRecipient] = useState(null);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const loadConnectionManager = (e) => {
        if (e) {
            e.preventDefault();
        }
        setLoading(true);

        httpRequest(
            routes.user.get_iq_option_connection_manager.getServerPath(
                emailConnectionManager
            ),
            {},
            (user) => {
                setConnectionManager(user);
                setLoading(false);
            }
        );
    };

    const loadTrader = (type) => {
        setLoading(true);

        httpRequest(
            routes.user.get_iq_option_traders.getServerPath(
                type,
                connectionManager.id
            ),
            {},
            (users) => {
                if (type == "sender") {
                    setTraderSender(users);
                } else {
                    setTraderRecipient(users);
                }
                setLoading(false);
            }
        );
    };

    useEffect(() => {
        if (connectionManager) {
            loadTrader("sender");
            loadTrader("recipient");
        }
    }, [connectionManager]);

    return (
        <React.Fragment>
            <Loading open={loading} />
            <Typography align="center" variant="h5">
                ADMINISTRADOR DE CONEXIONES IQOPTION
            </Typography>
            <Box align="center" pt={4}>
                {!connectionManager ? (
                    <form
                        onSubmit={loadConnectionManager}
                        className={classes.root}
                    >
                        <FormControl>
                            <TextField
                                label="Conectar con"
                                variant="outlined"
                                size="small"
                                value={emailConnectionManager}
                                onChange={(e) =>
                                    setEmailConnectionManager(e.target.value)
                                }
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            size="large"
                            disabled={emailConnectionManager ? false : true}
                        >
                            Conectar
                        </Button>
                    </form>
                ) : (
                    <Connections
                        connectionManager={connectionManager}
                        traderSender={traderSender}
                        traderRecipient={traderRecipient}
                    />
                )}
            </Box>
        </React.Fragment>
    );
};

export default IqOptionManager;
