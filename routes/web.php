<?php

use App\Http\Controllers\ShowController;
use App\Models\show;
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

/** =================== Genre Routes ==================== */

Route::group(['prefix' => 'genre'],function(){
    Route::get('/',[ShowController::class,'genre_ids']);
    Route::get('/{type}',[ShowController::class,'genre']);
});

/** ======================= Shows Routes ================== */

Route::group(['prefix' => 'show'],function(){
    Route::get('/find/{type}/{id}',[ShowController::class,'find']);
    Route::get('/category/{id}/{type}/{page?}',[ShowController::class,'getByCategory']);
    Route::get('/search/{type}/{search}/{limit?}',[ShowController::class,'search']);
    Route::get('/{type}/{page?}/{sort?}',[ShowController::class,'get']);
});


/** ======================= Vue =========================== */

Route::get('/{any}',function(){
    return view('welcome');
})->where('any','.*');
