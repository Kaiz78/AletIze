<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StudController;
use App\Http\Controllers\FriendsController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BlacklistsController;
use App\Http\Controllers\CommentaryController;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
    // route test
    Route::get('student', [StudController::class, 'student']);
    
    // Authentification
    // se connecter
    Route::post('login', [LoginController::class, 'login']);
    // se déconnecter
    Route::get('refresh',[LoginController::class, 'refresh']);
    // créer un compte
    Route::post('register', [RegisterController::class, 'register']);
    // vérification du compte par mail
    Route::get('verify-account/{token}', [RegisterController::class, 'verifyaccount']);
    // mot de passe oublié
    Route::post('forgot-password', [RegisterController::class, 'passwordForgot']);
    // créer un nouveau mot de passe
    Route::put('new_password/{token}', [RegisterController::class, 'newpassword']);

    
    // POST 
    // liste des posts
    Route::get('posts', [PostController::class, 'index']);
    // liste de mes posts
    Route::get('posts/self', [PostController::class, 'self']);
    // créer un post
    Route::post('posts/create', [PostController::class, 'store']);
    // modifier un post
    Route::put('posts/{update}', [PostController::class, 'update']);
    // supprimer un post
    Route::delete('posts/{delete}', [PostController::class, 'destroy']);
    // afficher les post d'une catégorie
    Route::get('posts/category/{id}', [PostController::class, 'showCategory']);

    // Amis
    // Ajouter un ami
    Route::post('friends/add', [FriendsController::class, 'store']);
    // Liste des amis
    Route::get('friends', [FriendsController::class, 'index']);
    // Supprimer un ami
    Route::delete('friends/{id}', [FriendsController::class, 'destroy']);

    // Blacklist
    // Blacklists un compte
    Route::post('blacklists/add', [BlacklistsController::class, 'store']);
    // Liste des blacklists
    Route::get('blacklists', [BlacklistsController::class, 'index']);
    // Supprimer un blacklist
    Route::delete('blacklists/{id}', [BlacklistsController::class, 'destroy']);

    //Commentaire
    // ajouter un commentaire
    Route::post('comments/add', [CommentaryController::class, 'store']);
    // Liste des commentaires
    Route::get('comments', [CommentaryController::class, 'index']);
    // Supprimer un commentaire
    Route::delete('comments/{id}', [CommentaryController::class, 'destroy']);
    // Liste des commentaires d'un user
    Route::get('comments/{id}', [CommentaryController::class, 'showUser']);
    // Liste des commentaires d'un post
    Route::get('comments/post/{id}', [CommentaryController::class, 'showPost']);


    // Categories

    // Ajouter une categorie
    Route::post('categories/add', [CategoryController::class, 'store']);
    // Liste des categories actives
    Route::get('categories', [CategoryController::class, 'showActives']);
    // Liste des categories desactives
    Route::get('categories/desactives', [CategoryController::class, 'showDesactives']);
    // Supprimer une categorie
    Route::delete('categories/{id}', [CategoryController::class, 'destroy']);
    // activer une categorie
    Route::put('categories/activate/{id}', [CategoryController::class, 'active']);
    // desactiver une categorie
    Route::put('categories/desactivate/{id}', [CategoryController::class, 'desactive']);

    // Roles

    // ajouter un role
    Route::post('roles/add', [RoleController::class, 'store']);
    // Liste des roles
    Route::get('roles', [RoleController::class, 'index']);
    // Supprimer un role
    Route::delete('roles/{id}', [RoleController::class, 'destroy']);

    
?>