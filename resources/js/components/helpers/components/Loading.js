import React from 'react';

import { Backdrop, CircularProgress } from '@material-ui/core';

const Loading = ({ open }) => {
    return (
        <Backdrop open={open} style={{zIndex:100}}>
          <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default Loading;
