<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PopstoreProductSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('popstore')->insert([
            [
                'name' => 'น้ำเปล่า',
                'price' => 10,
                'stock' => 100,
                'category' => 'เครื่องดื่ม',
                'status' => 'พร้อมขาย',
            ],
            [
                'name' => 'ขนมปัง',
                'price' => 20,
                'stock' => 50,
                'category' => 'อาหารว่าง',
                'status' => 'พร้อมขาย',
            ],
            // เพิ่มรายการได้เรื่อย ๆ
        ]);
    }
}
