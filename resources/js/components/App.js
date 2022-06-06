import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import store from '../redux/store';
import SwitchRoutes from '../routes/SwitchRoutes';

function App() {
    return (
        <Provider store={store}>
            <SnackbarProvider maxSnack={5}>
                <BrowserRouter>
                    <SwitchRoutes store={store}/>
                </BrowserRouter>
            </SnackbarProvider>
         </Provider>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
