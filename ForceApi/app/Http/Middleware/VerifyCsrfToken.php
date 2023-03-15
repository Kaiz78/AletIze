<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{

    protected $addHttpCookie = true;

   protected $except = [
         
        'http://localhost:8000/*',
        'http://localhost:8000/api/*',
        'http://192.168.1.68/*',
];
}