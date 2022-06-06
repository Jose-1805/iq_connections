<?php

namespace App\Models;

use GuzzleHttp\Client;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Broker extends Model
{
    use HasFactory;

    protected $table = "brokers";

    protected $fillable = [
        "name",
    ];

    public function users()
    {
    	return $this->belongsToMany(User::class, "users_brokers");
    }

    /**
     * Inicia sesión en IqOption y retorna los datos del usuario
     * @param  String $username     Nombre de usuario
     * @param  String $password     Contraseña de ingreso
     * @return  Array          		Datos del resultado de la autenticación
     */
    public static function loginIqOption($username, $password)
    {
    	$client = new Client(["cookies" => true]);

    	//Se hace el login con los datos del cliente
    	try {            
    	    $res = $client->request("POST", config("params.iq_option_url_auth"), [
    	        "headers" => [
    	            "Content-Type" => "application/x-www-form-urlencoded"
    	        ],
    	        "form_params" => [
    	            "identifier"=> $username, 
    	            "password"=> $password,
    	        ]
    	    ]);
    	} catch (\GuzzleHttp\Exception\RequestException $e) {
    	    $data = json_decode($e->getResponse()->getBody()->getContents(), true);
    	    return ["success" => false, "data" => $data];
    	}


    	if($res->getStatusCode() == 200){
    	    //Se obtienen los datos retornados en el login 
    	    $data = json_decode($res->getBody()->getContents(), true);

    	    //Se solicitan los datos del usuario
    	    try {            
    	        $res_data = $client->request("GET", config("params.iq_option_url_user_data"));
    	    } catch (\GuzzleHttp\Exception\RequestException $e) {
    	        $data = json_decode($e->getResponse()->getBody()->getContents(), true);
    	        return ["success" => false, "data" => $data];
    	    }

    	    //Se tuvo acceso a los datos
    	    if($res_data->getStatusCode() == 200){
    	        $data_user = json_decode($res_data->getBody()->getContents(), true);

    	        if($data_user["isSuccessful"]){
    	        	
    	            if(array_key_exists("country", $data_user["result"])){
    	                $data_user["result"]["country"] = $data_user["result"]["country"][0];
    	            }
    	            if(array_key_exists("phone_codes", $data_user["result"])){
    	                unset($data_user["result"]["phone_codes"]);
    	            }
    	            if(array_key_exists("tz", $data_user["result"])){
    	                unset($data_user["result"]["tz"]);
    	            }
    	            if(array_key_exists("profile", $data_user["result"])){
    	                unset($data_user["result"]["profile"]["popup"]);
    	                unset($data_user["result"]["profile"]["welcome_splash"]);
    	                unset($data_user["result"]["profile"]["functions"]);
    	                unset($data_user["result"]["profile"]["phone"]);
    	                unset($data_user["result"]["profile"]["last_visit"]);
    	                unset($data_user["result"]["profile"]["infeed"]);
    	                unset($data_user["result"]["profile"]["confirmed_phones"]);
    	                unset($data_user["result"]["profile"]["need_phone_confirmation"]);
    	                unset($data_user["result"]["profile"]["rate_in_one_click"]);
    	                unset($data_user["result"]["profile"]["deposit_in_one_click"]);
    	                unset($data_user["result"]["profile"]["kyc_confirmed"]);
    	                unset($data_user["result"]["profile"]["kyc"]);
    	                unset($data_user["result"]["profile"]["tc"]);
    	                unset($data_user["result"]["profile"]["trial"]);
    	                unset($data_user["result"]["profile"]["is_islamic"]);
    	                unset($data_user["result"]["profile"]["tin"]);
    	                unset($data_user["result"]["profile"]["personal_data_policy"]);
    	            }

    	            //Usuario que tiene el mismo ID
    	            //$user_with_id = User::where("broker_id", $data_user["result"]["profile"]["user_id"])->where("id", "<>", $this->id)->first();
    	            //Hay un usuario con el mismo ID
    	            /*if($user_with_id){
    	                return response(["errors" => [[__("messages.broker_id_exists")]]], 422);     
    	            }

    	            if($data_user["result"]["profile"]["currency"] != "USD"){
    	                return response(["errors" => [[__("messages.invalid_currency")]]], 422);                             
    	            }
    	            */

    	            //if(array_key_exists("ssid", $data)){
    	                /*$this->broker_id = $data_user["result"]["profile"]["user_id"];
    	                $this->ssid = $data["ssid"];
    	                $this->save();*/
    	                return ["success" => true, "data" => $data, "data_user" => $data_user];
    	            //}
    	        }
    	    }
    	}

    	return ["success" => false, "data" => null];
    }

    public static function iqOption()
    {
        return Broker::find(config("params.iq_option_broker_id"));
    }
}
