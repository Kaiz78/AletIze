<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\Logs;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

class RegisterController extends Controller
{
    public function Register(Request $request){
        $details = $request->only(['name', 'email', 'password', 'password_confirmation']);
        // si les mots de passe ne correspondent pas
        if($details['password'] != $details['password_confirmation']){
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'Passwords do not match'
            ], 401);
        }
        // si l'email existe deja
        if(User::where('email', $details['email'])->first()){
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'Email already exists'
            ], 401);
        }
        // validation des details
        $validator = validator($details, [
            'name' => 'required|string',
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        // creer un nouveau user
        else{
            DB::statement('SET autocommit=0;');
            DB::beginTransaction();
            $user = new User();
            $user->name = $details['name'];
            $user->email = $details['email'];
            $user->password = bcrypt($details['password']);
            // role_id = 1 =>  clients
            $user->role_id = 1;
            $user->save();
            $token = Str::random(60);
            // add log 
            $log = new Logs();
            $log->user_id = $user->id;
            $log->result_code = '200';
            $log->result_message = 'User registered successfully';
            $log->save();

            // Save the token to the users table
            DB::table('users')->where('email', $request->email)->update(['validate_token' => $token]);

            // Send the verification email to the user
            Mail::send([],[], function ($message) use ($request,$token) {
                $message->CharSet = 'UTF-8';
                $message->from('no-reply@bigben-connected.com', 'Bigben-connected');
                $message->to($request->email);	
                $message->subject('Email Verification');
                $message->setBody('
                Hi '.$request->name.',\r\n
                Thank you for registering with us. Please click on the link below to verify your email address.\r\n
                http://localhost:8000/api/verify-account/'.$token.' Verify Email.\r\n'); //
            });
            $failedEmails = Mail::failures();
            if(empty($failedEmails)){
                DB::commit();
                // Return a success response
                return response()->json([
                    'message' => 'User registered successfully',
                ], 201);
            }
            else{
                DB::rollback();
                return response()->json([
                    'status'=>500,
                    'message'=>'Une erreur est survenue lors de l\'envoi de la requête par mail : ' . print_r($failedEmails, true)
                ]);
            }    
        }
    }

    public function verifyAccount($token)
    {
       
        $user = User::where('validate_token', $token)->first();
        // dd($user);
        
        if (!$user) {
           return 'Invalid token';
        }
        
        else if ($user->email_verified_at !== null) {
           return 'Email already verified';
        }
        else{
            // add log 
            $log = new Logs();
            $log->user_id = $user->id;
            $log->result_code = '200';
            $log->result_message = 'Email verified successfully';
            $log->save();

            $user->email_verified_at = now();
            $user->is_Available = 'Y';
            $user->save();
            return 'Email verified successfully';
        }
    }

    public function passwordForgot(Request $request){
        // envoi un email avec un lien pour changer le mot de passe
        $mail = $request->email;
        $user = User::where('email', $mail)->first();
        if($user){
            $token = Str::random(60);
            // Save the token to the users table
            DB::table('users')->where('email', $mail)->update(['validate_token' => $token]);
            // add log 
            $log = new Logs();
            $log->user_id = $user->id;
            $log->result_code = '200';
            $log->result_message = 'Password reset link sent successfully';
            $log->save();
            // Send the verification email to the user
            Mail::send([],[], function ($message) use ($mail,$token) {
                $message->CharSet = 'UTF-8';
                $message->from('no-reply@bigben-connected.com', 'Bigben-connected');
                $message->to($mail);	
                $message->subject('New Password');
                $message->setBody('
                Hi ,
                Please click on the link below to change your password.
                http://localhost:8000/api/new_password/'.$token.' .

                '); //
            });    
        }
        else{
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'Email does not exist'
            ], 401);
        }
    }
    public function newpassword(Request $request,$token){
        // change le mot de passe
        $user = User::where('validate_token', $token)->first();
        if($user){
            // validate the password string with 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character

            if($request->password != $request->password_confirmation){
                return response()->json([
                    'error' => 'Unauthorized',
                    'message' => 'Passwords do not match'
                ], 401);
            }
            $user->password = bcrypt($request->password);
            $user->validate_token = null;
            $user->save();

            // add log
            $log = new Logs();
            $log->user_id = $user->id;
            $log->result_code = '200';
            $log->result_message = 'Password changed successfully';
            $log->save();

            return response()->json([
                'message' => 'Password changed successfully',
            ], 201);
        }
        else{
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'error '
            ], 401);
        }
    }    
}


?>
