<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "state",
        "name",
        "email",
        "password",
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        "password",
        "remember_token",
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        "email_verified_at" => "datetime",
    ];

    public function brokers()
    {
        return $this->belongsToMany(Broker::class, "users_brokers")->withPivot(["broker_user_id", "token", "currency_id"]);
    }

    /**
     * Registra y/o inicia sesión para un usuario con los datos de IqOption
     * @param  String $username     Nombre de usuario
     * @param  String $password     Contraseña de ingreso
     */
    public static function loginWithIqOption($username, $password, $remember = false)
    {
        $result = Broker::loginIqOption($username, $password);

        if($result["success"]){
            $iq_option_broker = Broker::iqOption();
            $profile = $result["data_user"]["result"]["profile"];
            if($iq_option_broker){
                $user = $iq_option_broker->users()->where("users_brokers.broker_user_id", $profile["id"])->first();
                $exists = false;

                //Si no existe con el ID del broker
                //se busca con el correo electrónico
                if(!$user && $profile["email"]){
                    $user = User::where("email", $profile["email"])->first();
                }else{
                    $exists = true;
                }

                //Si no se encuentra un usuario con los datos recibidos por el broker
                //se crea uno nuevo
                if(!$user){
                    $user = User::create([
                        "name" => $profile["name"],
                        "email" => $profile["email"]
                    ]);
                }

                $currency = Currency::where("abbreviation", $profile["currency"])->first();

                if($exists){
                    $iq_option_broker->users()->updateExistingPivot($user->id, [
                        "token" => $result["data"]["ssid"],
                        "currency_id" => $currency?$currency->id:null
                    ]);
                }else{
                    $iq_option_broker->users()->attach($user->id, [
                        "broker_user_id" => $profile["id"],
                        "token" => $result["data"]["ssid"],
                        "currency_id" => $currency?$currency->id:null
                    ]);
                }

                $result["user"] = $user;

                Auth::login($user, $remember);

                return $result;
            }
        }else{
            return $result;
        }
    }

    /**
     * Consulta y retorna los usuario que tienen una cuenta de broker asociada
     * @param  Integer $broker_id Identificador del broker 
     */
    public static function getBrokerTraders($broker_id)
    {
        return User::select(
            "users.*",
            "users_brokers.broker_user_id",
            "users_brokers.token",
            "users_brokers.currency_id"
        )->join("users_brokers", "users.id", "=", "users_brokers.user_id")
        ->join("brokers", "users_brokers.broker_id", "=", "brokers.id");
    }
}
