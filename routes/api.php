<?php

use App\Http\Controllers\Api\ProductController;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//Route::get('/product', function () {
//    $products = Product::all(); // Fetch all products
//    return response()->json($products); // Return as JSON
//});

Route::apiResource('/product', ProductController::class);

use App\Http\Controllers\Api\PopstoreProductController;

Route::get('/popstore-products', [PopstoreProductController::class, 'index']);

