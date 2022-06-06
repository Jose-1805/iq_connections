//CONSULTAR TODAS LAS DIVISAS
{
    "name": "sendMessage",
    "msg": {
        "name": "get-currencies-list",
        "version": "5.0",
        "body": {}
    }
}

//CONSULTAR SALDO DE USUARIO (CUENTA DEMO Y CUENTA REAL)
{
    "name": "sendMessage",
    "msg": {
        "name": "get-balances",
        "version": "1.0",
        "body": {
            "types_ids": [
                1,
                4
            ]
        }
    }
}

//CONSULTA DATOS DE ACTIVOS DISPONIBLES PARA OPCIONES BINARIAS Y TURBO
{
    "name": "sendMessage",
    "msg": {
        "name": "get-initialization-data",
        "version": "3.0",
        "body": {}
    }
}

//CONSULTA DE COMISIONES PARA ACTIVOS
{
    "name": "sendMessage",
    "msg": {
        "name": "get-commissions",
        "version": "1.0",
        "body": {
            "instrument_type": "binary-option",
            "user_group_id": 193
        }
    }
}

//CONSULTAR SENTIMIENTO DE TRADING
{
    "name": "sendMessage",
    "msg": {
        "name": "get-traders-mood",
        "version": "1.0",
        "body": {
            "instrument": "turbo-option",
            "asset_id": 1
        }
    }
}

//CONSULTAR LISTA DE ACTIVOS PARA OPCIONES DIGITALES
{
    "name": "sendMessage",
    "msg": {
        "name": "digital-option-instruments.get-underlying-list",
        "version": "1.0",
        "body": {
            "filter_suspended": true
        }
    }
}

//CONSULTAR LISTA DE ACTIVOS PARA CFD
{
    "name": "sendMessage",
    "msg": {
        "name": "get-instruments",
        "version": "4.0",
        "body": {
            "type": "cfd"
        }
    }
}

//CONSULTAR LISTA DE ACTIVOS PARA FOREX
{
    "name": "sendMessage",
    "msg": {
        "name": "get-instruments",
        "version": "4.0",
        "body": {
            "type": "forex"
        }
    }
}

//LISTA DE ACTIVOS PARA CRYPTO
{
    "name": "sendMessage",
    "msg": {
        "name": "get-instruments",
        "version": "4.0",
        "body": {
            "type": "crypto"
        }
    }
}

//HORARIOS DISPONIBLES PARA CIERRE DE OPERACIONES
{
    "name": "sendMessage",
    "msg": {
        "name": "get-active-schedule",
        "version": "1.0",
        "body": {
            "instrument_type": "digital-option",
            "period": 7
        }
    }
}

//CONSULTA HISTORIAL DE OPERACIONES ENTRE DOS FECHAS O POR LIMITE
{
    "name": "sendMessage",
    "msg": {
        "name": "portfolio.get-history-positions",
        "version": "2.0",
        "body": {
            "user_id": 42421649,
            "user_balance_id": 200797948,
            "instrument_types": [
                "turbo-option",
                "binary-option"
            ],
            "start": 1617673073,
            "end": 1617673087
        }
    }
}

//CONSULTA LA INFORMACIÓN DE UN ACTIVO
{
    "name": "sendMessage",
    "msg": {
        "name": "get-active",
        "version": "5.0",
        "body": {
            "id": 4
        }
    }
}