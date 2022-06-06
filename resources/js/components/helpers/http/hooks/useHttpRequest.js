import React from 'react';
import axios from 'axios';

const useHttpRequest = () => {
	const httpRequest = (url, params = {}, callback) => {
		axios["get"](url, params)
		.then((response) => {
			callback(response.data);
		},
		(error) => {
			console.warn(error)
		})
	}

    return {
    	httpRequest
    };
};

export default useHttpRequest;
