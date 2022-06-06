//SUSCRIPCIÓN A LIVE DEAL
{"name": "subscribeMessage","msg": {"name": "live-deal-binary-option-placed","version": "2.0","params": {"routingFilters": {"active_id": 1,"option_type": "binary"}}}}

//SUSCRIPCIÓN A CAMBIOS EN PORTAFOLIOS	
{
    "name": "subscribeMessage",
    "msg": {
        "name": "portfolio.order-changed",
        "version": "2.0",
        "params": {
            "routingFilters": {
                "user_id": 47421726,
                "instrument_type": "forex"//cfd, crypto, digital-option, turbo, binary
            }
        }
    }
}

{
    "name": "subscribeMessage",
    "msg": {
        "name": "portfolio.position-changed",
        "version": "3.0",
        "params": {
            "routingFilters": {
                "user_id": 47421726,
                "user_balance_id": 226446523,
                "instrument_type": "forex"//cfd, crypto, digital-option, turbo-option, binary-option
            }
        }
    }
}


//SUSCRIBCIÓN A CAMBIOS DE COMISIÓN
{
    "name": "subscribeMessage",
    "msg": {
        "name": "commission-changed",
        "version": "1.0",
        "params": {
            "routingFilters": {
                "instrument_type": "binary-option",
                "user_group_id": 193
            }
        }
    }
}	

//SUSCRIPCIÓN A CAMBIOS EN SENTIMIENDO DE TRADING
{
    "name": "subscribeMessage",
    "msg": {
        "name": "traders-mood-changed",
        "params": {
            "routingFilters": {
                "instrument": "turbo-option",
                "asset_id": "1"
            }
        }
    }
}

//SUSCRIPCIÓN A CAMBIOS EN LA LISTA DE ACTIVOS PARA OPCIONES DIGITALES
{
    "name": "subscribeMessage",
    "msg": {
        "name": "digital-option-instruments.underlying-list-changed",
        "version": "1.0",
        "params": {
            "routingFilters": {
                "user_group_id": 193,
                "is_regulated": false
            }
        }
    }
}

//SUSCRIPCION A CAMBIOS EN LA LISTA DE ACTIVOS PARA CFD
{
    "name": "subscribeMessage",
    "msg": {
        "name": "instruments-changed",
        "version": "5.0",
        "params": {
            "routingFilters": {
                "user_group_id": 193,
                "type": "cfd",
                "is_regulated": false
            }
        }
    }
}

//SUSCTIPCIÓN A CAMBIOS EN LA LISTA DE ACTIVOS PARA FOREX
{
    "name": "subscribeMessage",
    "msg": {
        "name": "instruments-changed",
        "version": "5.0",
        "params": {
            "routingFilters": {
                "user_group_id": 193,
                "type": "forex",
                "is_regulated": false
            }
        }
    }
}

//SUSCRIPCION A CAMBIOS EN LA LISTA DE ACTIVOS PARA CRYPTO	
{
    "name": "subscribeMessage",
    "msg": {
        "name": "instruments-changed",
        "version": "5.0",
        "params": {
            "routingFilters": {
                "user_group_id": 193,
                "type": "crypto",
                "is_regulated": false
            }
        }
    }
}

//SUSCRIPCIÓN A GENERACIÓN DE VELAS DE UN ACTIVO
{
    "name": "subscribeMessage",
    "msg": {
        "name": "candle-generated",
        "params": {
            "routingFilters": {
                "active_id": 1,
                "size": 60
            }
        }
    }
}

//SUSCRIPCIÓN PARA SEGUIR EL ESTADO DE UNA POSICIÓN Y PODER VENDER CON GANANCIAS
{
    "name": "subscribeMessage",
    "msg": {
        "name": "positions-state"
    }
}

{
    "name": "sendMessage",
    "msg": {
        "name": "subscribe-positions",
        "version": "1.0",
        "body": {
            "frequency": "frequent",
            "ids": [
                "3e7f315a1b97898c023191692c36ce67"
            ]
        }
    }
}