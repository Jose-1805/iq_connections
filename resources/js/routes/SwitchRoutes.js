import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ConnectionControlPanel from '../components/connectionControlPanel/ConnectionControlPanel';

const SwitchRoutes = () => {

    return (
        <React.Fragment>
        	<Switch>
                <Route exact path="/" render={() => <ConnectionControlPanel/>}/>
            </Switch>
        </React.Fragment>
    );
};

export default SwitchRoutes;
