<?php

namespace App\Http\Controllers;

use App\Models\Logs;
use App\Models\User;
use App\Models\Friends;
use App\Models\Blacklist;
use Illuminate\Http\Request;

class BlacklistsController extends Controller
{
    // list all blacklists
    public function index()
    {
        $user = $this->authUser();
        if($user){
            // je récupère la liste des blacklistés
            $blacklists = Blacklist::where('user_id', $user->id)->get();
            return $blacklists;
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    // add a blacklist
    public function store(Request $request)
    {
        $user = $this->authUser();
        if($user){
            // si le blacklisté est soi-même
            if($user->id == $request->blacklist_id){
                return response()->json(['error' => 'You can\'t block yourself'], 401);
            }
            // si le user est déjà blacklisté on affiche un message d'erreur
            if(Blacklist::where('user_id', $user->id)->where('blacklist_id', $request->blacklist_id)->first()){
                return response()->json(['error' => 'User already blocked'], 401);
            }
            // si un ami et blacklisté on le supprime de la liste d'amis
            if(Friends::where('user_id', $user->id)->where('friend_id', $request->blacklist_id)->first()){
                $friend = Friends::where('user_id', $user->id)->where('friend_id', $request->blacklist_id)->first();
                $friend->delete();
            }
            // si le user n'est pas trouvé dans la table users
            if(!User::where('id', $request->blacklist_id)->first()){
                return response()->json(['error' => 'User not found'], 401);
            }
            // add log 
            $log = new Logs();
            $log->user_id =  auth()->user()->id;
            $log->result_code = '200';
            $log->result_message = 'Add new blacklist';
            $log->save();

            $blacklist = new Blacklist();
            $blacklist->user_id = $user->id;
            $blacklist->blacklist_id = $request->blacklist_id;
            $blacklist->save();
            return response()->json($blacklist, 201);
        }
        return response()->json(['error' => 'Unauthorized'], 401);    
    }
    // remove a blacklist
    public function destroy($id)
    {
        $user = $this->authUser();
        if($user){
        $blacklist = Blacklist::where('blacklist_id', $id)->first();
        $blacklist->delete();
        // add log 
        $log = new Logs();
        $log->user_id = $user->id;
        $log->result_code = '200';
        $log->result_message = 'Remove blacklist';
        $log->save();

        return response()->json(null, 204);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}

?>