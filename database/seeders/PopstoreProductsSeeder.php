<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PopstoreProductsSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('popstore_products')->insert([
            [
                'name' => 'Pop T-shirt',
                'description' => 'เสื้อยืดลาย POP',
                'price' => 250.00,
                'stock' => 50,
                'category' => 'Clothing',
            ],
            [
                'name' => 'Sticker Set',
                'description' => 'สติ๊กเกอร์ลาย Pop Store',
                'price' => 50.00,
                'stock' => 100,
                'category' => 'Accessories',
            ],
            [
                'name' => 'Canvas Bag',
                'description' => 'กระเป๋าผ้า POPSTORE',
                'price' => 180.00,
                'stock' => 20,
                'category' => 'Bags',
            ],
        ]);
    }
}

