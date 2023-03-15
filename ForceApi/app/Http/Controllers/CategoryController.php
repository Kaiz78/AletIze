<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Logs;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function showActives()
    {
        $user = auth()->user();
        if($user){
            if($user->role_id == 2){
                // add view logs 
                $log = new Logs();
                $log->user_id = $user->id;
                $log->result_code = '200';
                $log->result_message = 'View all categories';
                $log->save();

                // get all categories qui sont activé
                $categories = Categorie::where('is_available', 'Y')->get();
                return response()->json($categories);
            }
            else{
               return response()->json(['error' => 'Unauthorized'], 401);
            }
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    public function showDesactives()
    {
        $user = auth()->user();
        if($user){
            if($user->role_id == 2){
                // add view logs 
                $log = new Logs();
                $log->user_id = $user->id;
                $log->result_code = '200';
                $log->result_message = 'View all categories';
                $log->save();

                // get all categories qui sont activé
                $categories = Categorie::where('is_available', 'N')->get();
                return response()->json($categories);
            }
            else{
               return response()->json(['error' => 'Unauthorized'], 401);
            }
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    // add new category
    public function store(Request $request)
    {
        $user = auth()->user();
        if($user){
            if($user->role_id == 2){
                $request->validate([
                    'name' => 'required',
                ]);
                // add view logs
                $log = new Logs();
                $log->user_id = $user->id;
                $log->result_code = '200';  
                $log->result_message = 'Add new category';
                $log->save();
                $category = new Categorie();
                $category->name = $request->name;
                $category->save();

                return response()->json($category);
            }
            else{
               return response()->json(['error' => 'Unauthorized'], 401);
            }
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    // delete category
    public function destroy($id)
    {
        $user = auth()->user();
        if($user){
            if($user->role_id == 2){
                // add view logs
                $log = new Logs();
                $log->user_id = $user->id;
                $log->result_code = '200';
                $log->result_message = 'Delete category';
                $log->save();
                $category = Categorie::find($id);
                $category->delete();
                return response()->json($category);
            }
            else{
               return response()->json(['error' => 'Unauthorized'], 401);
            }
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    // active category
    public function active($id)
    {
        $user = auth()->user();
        if($user){
            if($user->role_id == 2){
                // add view logs
                $log = new Logs();
                $log->user_id = $user->id;
                $log->result_code = '200';
                $log->result_message = 'Active category';
                $log->save();

                $category = Categorie::find($id);
                $category->is_available = 'Y';
                $category->save();
                return response()->json($category);
            }
            else{
               return response()->json(['error' => 'Unauthorized'], 401);
            }
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    // deactive category
    public function desactive($id)
    {
        $user = auth()->user() ;
        if($user){
            if($user->role_id == 'admin'){
                // add view logs
                $log = new Logs();
                $log->user_id = $user->id;
                $log->result_code = '200';
                $log->result_message = 'Deactive category';
                $log->save();
                $category = Categorie::find($id);
                $category->is_available = 'N';
                $category->save();
                return response()->json($category);
            }
            else{
               return response()->json(['error' => 'Unauthorized'], 401);
            }
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}

?>