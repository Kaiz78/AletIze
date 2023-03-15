<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\plat;

class StudController extends Controller
{

    public function student(){
        return response()->json(plat::get(),200);
    }
    public function studentByID($id){
        return response()->json(plat::find($id),200);
    }
    public function studentSave(Request $request,plat $student){
// creer une methode pour ajouter des utilisateurs
        $student->name = $request->name;
        $student->description = $request->description;
        $student->image = $request->file('image')->storeAs('dooc',$request->file('image')->getClientOriginalName());
        $image = $request->file('image');
        $destinationPath = 'image/';
        $profileImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
        $image->move($destinationPath, $profileImage);
        $student['image'] = $profileImage;

        $student->price = $request->price;
        $student->categorie = $request->categorie;
        $student->save();
        return response()->json($student,201);    
    }
    public function studentUpdate(Request $request, plat $student){
        $student->name = $request->name;
        $student->description = $request->description;
        // mettre à jour l'image si elle existe
        if($request->hasFile('image')){
            $student->image = $request->file('image')->storeAs('dooc',$request->file('image')->getClientOriginalName());
            $image = $request->file('image');
            $destinationPath = 'image/';
            $profileImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
            $image->move($destinationPath, $profileImage);
            $student['image'] = $profileImage;
        }
        $student->price = $request->price;
        $student->categorie = $request->categorie;
        $student->update();
        echo $student->image;
       return response()->json($student,200);
   }
   
   public function studentDelete(Request $request, plat $student){
        $student->name = $request->name;
        $student->email = $request->email;
        $student->delete();
        return response()->json($student,200);
   }
 
    public function uploadFile(Request $request){  
        $result= $request->file('file')->storeAs('dooc',$request->file('file')->getClientOriginalName());
        return ["result"=>$result];
    }

      
}

?>