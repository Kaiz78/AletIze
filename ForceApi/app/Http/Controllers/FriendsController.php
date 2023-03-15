<?php

namespace App\Http\Controllers;

use App\Models\Logs;
use App\Models\User;
use App\Models\Friends;
use Illuminate\Http\Request;

class FriendsController extends Controller
{
    public function index(){
        $user = $this->authUser();
        if($user){
            // add log
            $log = new Logs();
            $log->user_id = $user->id;
            $log->result_code = '200';
            $log->result_message = 'View all friends';
            $log->save();
            
            $friends = Friends::where('user_id', $user->id)->get();
            return $friends;
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    // ajouter un ami
    public function store(Request $request){
        $user = $this->authUser();
        if($user){
            // si l'ami est soi-même
            if($user->id == $request->id_friend){
                return response()->json(['error' => 'You can\'t add yourself'], 401);
            }
            // si l'ami existe déjà
            if(Friends::where('user_id', $user->id)->where('friend_id', $request->id_friend)->first()){
                return response()->json(['error' => 'Friend already added'], 401);
            }
            // si l'ami n'existe pas 
            if(!User::where('id', $request->id_friend)->first()){
                return response()->json(['error' => 'User not found'], 401);
            }
             // add log
             $log = new Logs();
             $log->user_id = $user->id;
             $log->result_code = '200';
             $log->result_message = 'Add friend '.$request->id_friend;
             $log->save();

            $friend = new Friends();
            $friend->user_id = $user->id;
            $friend->friend_id = $request->id_friend;
            $friend->save();

            return response()->json($friend, 201);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    // supprimer un ami
    public function destroy($id){
        $user = $this->authUser();
        if($user){
            $friend = Friends::where('user_id', $user->id)->where('friend_id', $id)->first();
            if($friend){
                // add log
                $log = new Logs();
                $log->user_id = $user->id;
                $log->result_code = '200';
                $log->result_message = 'Delete friend '.$id;
                $log->save();
                
                $friend->delete();
                return response()->json(['message' => 'Friend deleted'], 200);
            }
            return response()->json(['error' => 'Friend not found'], 401);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}


?>