<?php

// app/Http/Controllers/Product01Controller.php
namespace App\Http\Controllers;

use App\Models\Product01;
use Illuminate\Http\Request;

class Product01Controller extends Controller
{
    public function index()
    {
        return response()->json(Product01::all());
    }
}
