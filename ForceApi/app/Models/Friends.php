<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friends extends Model
{
    use HasFactory;
    protected $table = "friends";

    protected $fillable = [
        'id_user',
        'id_friend',
    ];

}
