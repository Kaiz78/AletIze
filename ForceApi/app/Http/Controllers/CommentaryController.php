<?php

namespace App\Http\Controllers;

use App\Models\Logs;
use App\Models\Post;
use App\Models\User;
use App\Models\Commentary;
use Illuminate\Http\Request;

class CommentaryController extends Controller
{
    // Afficher tous les commentaires
    public function index()
    {
        $user = $this->authUser();
        if($user){
            // add log
            $log = new Logs();
            $log->user_id = $user->id;
            $log->result_code = '200';
            $log->result_message = 'View all commentaries';
            $log->save();
            
            $commentary = Commentary::all();
            return response()->json($commentary);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    // Afficher les commentaires d'un post
    public function showPost($id)
    {
        $user = $this->authUser();
        if($user){
            // add log
            $log = new Logs();
            $log->user_id = $user->id;
            $log->result_code = '200';
            $log->result_message = 'View all commentaries of post '.$id;
            $log->save();

            $commentary = Commentary::where('post_id', $id)->get();
            return response()->json($commentary);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    // Afficher les commentaires d'un utilisateur
    public function showUser($id)
    {
        $user = $this->authUser();
        if($user){
            // add log
            $log = new Logs();
            $log->user_id = $user->id;
            $log->result_code = '200';
            $log->result_message = 'View all commentaries of user '.$id;
            $log->save();

            $commentary = Commentary::where('user_id', $id)->get();
            return response()->json($commentary);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    // Ajouter un commentaire
    public function store(Request $request)
    {
        $user = $this->authUser();
        if($user){
            // si l'utilisateur n'existe pas 
            if(!User::where('id', $user->id)->first()){
                return response()->json(['error' => 'User not found'], 401);
            }
            // si le post n'existe pas
            if(!Post::where('id', $request->post_id)->first()){
                return response()->json(['error' => 'Post not found'], 401);
            }
            // add log
            $log = new Logs();
            $log->user_id = $user->id;
            $log->result_code = '200';
            $log->result_message = 'Add new commentary';
            $log->save();

            // ajout du commentaire
            $commentary = new Commentary();
            $commentary->user_id = $user->id;
            $commentary->post_id = $request->post_id;
            $commentary->content = $request->content;
            $commentary->save();
            
            // ajout le nombre de commentaire au post
            $post = Post::where('id', $request->post_id)->first();
            $post->view = $post->view + 1;
            $post->save();
            return response()->json($commentary);
        }
        return response()->json(['error' => 'Unauthorized'], 401);

    }
    // Supprimer un commentaire
    public function destroy($id)
    {
        $user = $this->authUser();
        if($user){
            $commentary = Commentary::where('user_id', $user->id)->where('id', $id)->first();
            if($commentary){
                // add log
                $log = new Logs();
                $log->user_id = $user->id;
                $log->result_code = '200';
                $log->result_message = 'Delete commentary '.$id;
                $log->save();

                $commentary->delete();
                return response()->json(['message' => 'Commentary deleted'], 200);
            }
            return response()->json(['error' => 'Commentary not found'], 401);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    // Ajouter un like à un commentaire
    public function like($id)
    {
        $user = $this->authUser();
        if($user){
            $commentary = Commentary::where('id', $id)->first();
            if($commentary){
                // add log
                $log = new Logs();
                $log->user_id = $user->id;
                $log->result_code = '200';
                $log->result_message = 'Like commentary '.$id;
                $log->save();

                $commentary->like = $commentary->like + 1;
                $commentary->save();
                return response()->json($commentary);
            }
            return response()->json(['error' => 'Commentary not found'], 401);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    // Ajouter un dislike à un commentaire
    public function dislike($id)
    {
        $user = $this->authUser();
        if($user){
            $commentary = Commentary::where('id', $id)->first();
            if($commentary){
                // add log
                $log = new Logs();
                $log->user_id = $user->id;
                $log->result_code = '200';
                $log->result_message = 'Dislike commentary '.$id;
                $log->save();
                
                $commentary->dislike = $commentary->dislike + 1;
                $commentary->save();
                return response()->json($commentary);
            }
            return response()->json(['error' => 'Commentary not found'], 401);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }

}

?>
