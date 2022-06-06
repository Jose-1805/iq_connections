export default {
	user:{
		get_iq_option_traders:{
			getServerPath:(type, user) => ("user/iq-option-traders/"+type+"/"+user)
		},
		get_iq_option_connection_manager:{
			getServerPath:(email) => ("user/iq-option-connection-manager/"+email)
		}
	}
}