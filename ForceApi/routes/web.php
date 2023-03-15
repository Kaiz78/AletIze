<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudController;
use App\Http\Controllers\Api\Auth\RegisterController;

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

Route::get('/', function () {
    return view('welcome');
});


// Route::post('login', 'AuthController@login');
// Route::group(['middleware' => 'auth:sanctum'], function () {
//     Route::get('/student', [StudController::class, 'student']);
//     Route::put('student/{id}',[StudController::class, 'studentUpdate']);
//     Route::delete('student/{id}',[StudController::class, 'studentDelete']);
//     Route::get('/student/{id}', [StudController::class, 'studentByID']);
//     Route::post('/student', [StudController::class, 'studentSave']);
//     Route::post('/upload', [StudController::class, 'uploadFile']);
// });
