<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commentary extends Model
{
    use HasFactory;
    protected $table = "commentary";
    protected $fillable = [
        'user_id',
        'post_id',
        'content',
    ];
}
