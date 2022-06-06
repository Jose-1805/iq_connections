<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix("user")->group(function(){
	Route::get("iq-option-traders/{type}/{user}", [UserController::Class, "iqOptionTraders"]);
	Route::get("iq-option-connection-manager/{email}", [UserController::Class, "iqOptionConnectionManager"]);
});

Route::get('/', function () {
    return view('app');
});
