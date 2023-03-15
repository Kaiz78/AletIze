<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\Logs;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $credentials = $request->only('email', 'password');

        if (!$token = auth()->attempt($credentials)) {
            return response()->json([
                'error' => 'Unauthorized',
                 'message' => 'Email or password is incorrect'
            ], 401);
        }
        // si le compte n'est pas verifié
        if(auth()->user()->email_verified_at == null){
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'Account not verified'
            ], 401);
        }
        $user = Auth::user();
        // $token = $user->createToken('My Token')->plainTextToken;
        $log = new Logs();
       // add login logs
        $log->user_id = $user->id;
        $log->result_code = '200';
        $log->result_message = 'Login Connection';
        $log->save();
        PersonalAccessToken::create([
            'tokenable_id' => $user->id,
            'tokenable_type' => get_class($user),
            'name' => $user->name,
            'token' => hash('sha256', $token),
            'abilities' => ['*'],
        ]);
        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 30,
        ]);
    }

    public function refresh()
    {
        try {
            // add refresh logs
            $log = new Logs();
            $log->user_id = auth()->user()->id;
            $log->result_code = '200';
            $log->result_message = 'Refresh Token';
            $log->save();
            $newToken = auth()->refresh();
            return response()->json([
                'access_token' => $newToken,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 30
            ]);
        } 
        catch (TokenInvalidException $e) {
                return response()->json(['error' => $e->getMessage()], 401);
        }
    }
}

?>