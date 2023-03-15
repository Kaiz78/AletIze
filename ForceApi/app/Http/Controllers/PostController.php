<?php

namespace App\Http\Controllers;

use App\Models\Logs;
use App\Models\Post;
use App\Models\Archive;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\UserNotDefinedException;

class PostController extends Controller
{
    public function index(){
        $user = $this->authUser(); 
        if($user != null){
            // add log 
            $log = new Logs();
            $log->user_id = $user->id;
            $log->result_code = '200';
            $log->result_message = 'View all posts';
            $log->save();
            
            return Post::all();
        }
        else{
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'You are not logged in'
            ], 401);
        } 
    }

    public function self(){
        // $posts = auth()->user()->posts;
        $user = $this->authUser(); 
        // afficher les posts de l'utilisateur connecté
        if($user != null){
            // add log
            $log = new Logs();
            $log->user_id = $user->id;
            $log->result_code = '200';
            $log->result_message = 'View all posts of user '.$user->id;
            $log->save();

            $posts = Post::where('user_id', $user->id)->get();
            return $posts;
        }
        else{
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'You are not logged in'
            ], 401);
        } 
        
    }

    public function store(Request $request){
        $details = $request->only(['title', 'content']);
        $user = $this->authUser();
        // creer un nouveau post
        if($user != null){
            // add log
            $log = new Logs();
            $log->user_id = $user->id;
            $log->result_code = '200';
            $log->result_message = 'Create a new post';
            $log->save();

            $post = new Post();
            $post->user_id = $user->id;
            $post->title = $details['title'];
            $post->content = $details['content'];
            // si category_id n'est pas renseigné, on met 1 par défaut
            if($request->category_id == null){
                // categorie_id = 1 = "Autre"
                $post->categorie_id = 1;
            }
            else{
                $post->categorie_id = $request->category_id;
            }
            // langue_id = 73 = "Français"
            $post->language_id = 73;
            // ajoute une image
            if($request->hasFile('image')){
                $image = $request->file('image');
                $name = $details['title'].'_'.time().'.'.$image->getClientOriginalExtension();
                $destinationPath = public_path('/images');
                $image->move($destinationPath, $name);
                $post->image = $name;
            }
            $post->save();
            return $post;
        }
        else{
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'You are not logged in'
            ], 401);
        }
    }
    public function update(Request $request, $id){      
        $details = $request->only(['title', 'content']);
        $user = $this->authUser();

        if($user != null){
            // add log
            $log = new Logs();
            $log->user_id = $user->id;
            $log->result_code = '200';
            $log->result_message = 'Update post '.$id;
            $log->save();

            $post = Post::findOrFail($id);
            // add Archive
            $postArchive = new Archive();
            $postArchive->user_id = $post->user_id;
            $postArchive->title = $post->title;
            $postArchive->content = $post->content;
            $postArchive->categorie_id = $post->categorie_id;
            $postArchive->language_id = $post->language_id;
            // récupère l'image dans le dossier et deploie dans le dossier archive
            // créer le dossier archive
            if(!file_exists(public_path('/archive'))){
                mkdir(public_path('/archive'));
            }
            if($post->image != null){
                $image_path = public_path('/images/'.$post->image);
                $image = $post->image;
                $name = $details['title'].'_'.time().'.'.$image;
                $destinationPath = public_path('/archive');
                copy($image_path, $destinationPath.'/'.$name);
                $postArchive->image = $name;
            }  
            $postArchive->save();

            // update post
            $post->title = $details['title'];
            $post->content = $details['content'];
            // si category_id n'est pas renseigné, on met 1 par défaut
            if($request->category_id == null){
                // categorie_id = 1 = "Autre"
                $post->categorie_id = 1;
            }
            else{
                $post->categorie_id = $request->category_id;
            }
            // language_id = 73 pour le francais
            if($request->language_id == null){
                $post->language_id = 73;
            }
            else{
                $post->language_id = $request->language_id;
            }
            // ajoute une image si elle existe
            if($request->hasFile('image')){
                // supprimer l'ancienne image
                // verifier si l'image existe
                if($post->image != null){
                    $image_path = public_path('/images/'.$post->image);
                    unlink($image_path);
                }
                $image = $request->file('image');
                $name = $details['title'].'_'.time().'.'.$image->getClientOriginalExtension();
                $destinationPath = public_path('/images');
                $image->move($destinationPath, $name);
                $post->image = $name;
            }
         $post->update();
         return  $post;
        }
        else{
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'You are not logged in'
            ], 401);
        }
       
    }


    public function destroy($id){
        // supprimer un post par id
        $user = $this->authUser();

        if($user){
            $post = Post::findOrFail($id);
            // add post archive
            $postArchive = new Archive();
            $postArchive->user_id = $post->user_id;
            $postArchive->title = $post->title;
            $postArchive->content = $post->content;
            $postArchive->categorie_id = $post->categorie_id;
            $postArchive->language_id = $post->language_id;
            // si l'image existe
            if($post->image != null){
                $image_path = public_path('/images/'.$post->image);
                $image = $post->image;
                $name = $post->title.'_'.time().'.'.$image;
                $destinationPath = public_path('/archive');
                copy($image_path, $destinationPath.'/'.$name);
                $postArchive->image = $name;
            } 
            $postArchive->save();
            // si l'image existe
            if($post->image != null){
                $image_path = public_path('/images/'.$post->image);
                unlink($image_path);
            }
            // add log
            $log = new Logs();
            $log->user_id = $user->id;
            $log->result_code = '200';
            $log->result_message = 'Delete post '.$id;
            $log->save();
            // delete post
            $post->delete();
            return $post;
        }
        else{
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'You are not logged in'
            ], 401);
        }
    }
    // Ajouter un like
    public function like($id){
        $user = $this->authUser();
        if($user != null){
            // add log
            $log = new Logs();
            $log->user_id = $user->id;
            $log->result_code = '200';
            $log->result_message = 'Like post '.$id;
            $log->save();

            $post = Post::findOrFail($id);
            $post->likes = $post->likes + 1;
            $post->update();
            return $post;
        }
        else{
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'You are not logged in'
            ], 401);
        }
    }
    // Ajouter un dislike
    public function dislike($id){
        $user = $this->authUser();
        if($user != null){
            // add log
            $log = new Logs();
            $log->user_id = $user->id;
            $log->result_code = '200';
            $log->result_message = 'Dislike post '.$id;
            $log->save();

            $post = Post::findOrFail($id);
            $post->dislikes = $post->dislikes + 1;
            $post->update();
            return $post;
        }
        else{
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'You are not logged in'
            ], 401);
        }
    }
}

?>
