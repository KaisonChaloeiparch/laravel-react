<?php

// app/Models/Product01.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product01 extends Model
{
    protected $table = 'product01';
    protected $fillable = ['name', 'category', 'price', 'stock', 'status'];
}
