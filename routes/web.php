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
    Route::post('/',[ShowController::class,'genre_ids']);
    Route::post('/{type}',[ShowController::class,'genre_id']);
});

/** ======================= Shows Routes ================== */

Route::group(['prefix' => 'show'],function(){
    Route::post('/find/{type}/{id}',[ShowController::class,'find']);
    Route::post('/category/{type}/{page?}/{id?}',[ShowController::class,'getByCategory']);
    Route::get('/search/{type}/{search}/{limit?}',[ShowController::class,'search']);
    Route::post('/person/{id}',[ShowController::class,'person']);
    Route::post('/{type}/{page?}/{sort?}',[ShowController::class,'get']);
});



/** ======================= Vue =========================== */

Route::get('/{any}',function(){
    return view('welcome');
})->where('any','.*');
