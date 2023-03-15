<?php

namespace App\Http\Controllers;

use App\Models\Logs;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    // List all roles
    public function index()
    {
        $user = auth()->user();
        if($user){
            if($user->role_id == 2){
                // add logs
                $logs = new Logs();
                $logs->user_id = $user->id;
                $logs->result_code = '200';
                $logs->result_message = 'View all roles';
                $logs->save();
                $roles = Role::all();
                return response()->json($roles);
            }
            else{
               return response()->json([
                'error' => 'Unauthorized',
                'message' => 'You are not right role '
            ], 401);
            }
        }
        return response()->json([
            'error' => 'Unauthorized',
            'message' => 'You are not logged in'
        ], 401);
    }

    // Add new role
    public function store(Request $request)
    {
        $user = auth()->user();
        if($user){
            if($user->role_id == 2){
                $request->validate([
                    'name' => 'required',
                ]);
                // add logs
                $logs = new Logs();
                $logs->user_id = $user->id;
                $logs->result_code = '200';
                $logs->result_message = 'Add new role';
                $logs->save();
                // add new roles
                $role = new Role();
                $role->name = $request->name;
                $role->save();
                return response()->json($role);
            }
            else{
               return response()->json(['error' => 'Unauthorized'], 401);
            }
        }
        return response()->json([
            'error' => 'Unauthorized',
            'message' => 'You are not logged in'
        ], 401);
    }

    // delete Role
    public function destroy($id)
    {
        $user = auth()->user();
        if($user){
            if($user->role_id == 2){
                // add logs
                $logs = new Logs();
                $logs->user_id = $user->id;
                $logs->result_code = '200';
                $logs->result_message = 'Delete role';
                $logs->save();
                $role = Role::find($id);
                $role->delete();
                return response()->json([
                    'message' => 'Role deleted successfully'
                ]);
            }
            else{
               return response()->json([
                'error' => 'Unauthorized',
                'message' => 'You are not right role '
            ], 401);
            }
        }
        return response()->json([
            'error' => 'Unauthorized',
            'message' => 'You are not logged in'
        ], 401);
    }
}


?>