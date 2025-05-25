<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PopstoreProduct;

class PopstoreProductController extends Controller
{
    public function index()
    {
        return response()->json(PopstoreProduct::all());
    }
}

