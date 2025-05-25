<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PopstoreProduct extends Model {
    protected $fillable = ['name', 'description', 'price', 'stock', 'category'];
}
