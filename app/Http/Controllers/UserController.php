<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function iqOptionTraders(Request $request, $type, User $user)
    {
    	$users = User::getBrokerTraders(config("params.iq_option_broker_id"));

    	if($type == "sender"){
    		$users = $users->where("sender", 1);
    	}else{
    		$users = $users->where("recipient", 1)
    		->where("user_connection_manager_id", $user->id);
    	}

    	return $users->get();
    }

    public function iqOptionConnectionManager(Request $request, $email)
    {
    	return User::getBrokerTraders(config("params.iq_option_broker_id"))
    	->where("email", $email)
    	->where("connection_manager", 1)->first();
    }
}
