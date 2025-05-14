<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InventoryController  extends Controller
{
    //
}
// app/Http/Controllers/Api/InventoryController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\InventoryItem;

class InventoryController extends Controller
{
    public function index()
    {
        return response()->json(InventoryItem::all());
    }
}
