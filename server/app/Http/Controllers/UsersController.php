<?php

namespace App\Http\Controllers;

use App\Mail\EnquiryMailer;
use App\Models\Enquiry;
use App\Models\Settings;
use App\Models\User;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;


interface UserInterface {
public function validator(Request $request);
}
class UsersController extends Controller implements UserInterface{

 public function validator(Request $request)
    {
        try {
            $tokenHeader = $request->header("Authorization");
            $actualToken = substr($tokenHeader, 7);
            if (!$tokenHeader || !$actualToken) {
                throw new \Exception("Unauthorized", 401);
            }
            $payload = JWTAuth::setToken($actualToken)->getPayload();
            return $payload["sub"];
        } catch (\Exception $err) {
            throw new \Exception($err->getMessage(), 500);
        }
    }
public function CreateUser(Request $request){
try{
$validatedRequest = $request->validate([
"password"=>"required|min:8",
"email"=>"required|unique:users,email",
"name"=>"required|unique:users,name",
"phoneNumber"=>"required"
]);
$user = new Users();
$user->email = $validatedRequest["email"];
$user->name = $validatedRequest["name"];
$user->password = Hash::make($validatedRequest["password"]);
$user->phoneNumber = $validatedRequest["phoneNumber"];

$user->save();
return response()->json([
"message"=>"User Saved"
]);
}catch(ValidationException $err){
$errors = $err->errors();
return response()->json([
"message"=>collect($errors)->flatten()->first()
],200);
}catch(\Exception $err){
Log::error($err->getMessage());
return response()->json([
"message"=>"Something Went Wrong"
],500);
}}





public function handleLogin(Request $request){
try{
$validatedRequest = $request->validate([
"credential"=>"required",
"password"=>"required|min:6"
]);
$User = new Users();
$User->name = $validatedRequest["credential"];
$User -> email = $validatedRequest["credential"];
if($User->where("name",$User["name"])->exists() || $User->where("email",$User["email"])->exists()){
$matchingUser =  $User->where("email", $User["email"])->first();

$matchingPassword = Hash::check($validatedRequest["password"],$matchingUser["password"]);
if(!$matchingPassword){
return response()->json([
"message"=> "Credentials mismatch"
]);
}else{
$token = JWTAuth::fromUser($matchingUser);
$status = $matchingUser["superAdmin"];
return response()->json([
"message"=>"Successful Login",
"status"=>$status

])->header("Authorization",$token)->header("Access-Control-Expose-Headers","Authorization");
}
}else{
return response()->json([
"message"=>"User does not have an account"
]);
}
}catch(\Exception $err){
Log::error($err->getMessage());
return response()->json([
"message"=>"Something has gone wrong"
],200);
}}




public function ManageUsers(Request $request){
$users = Users::all();
return response()->json([
"message"=>"User found",
"data"=>$users
]);
}


public function DeleteAdmin(Request $request){
$user_id = $request->query("user_id");
try{
Users::where("id",$user_id)->delete();
return response()->json([
"message"=>"User Deleted Successfully"
]);
}catch(\Exception $err){
Log::error($err->getMessage());
return response()->json([
"message"=>"Something has gone very wrong"
],500);
}}





public function UpdateUser(Request $request)
{
    try {
        $id = $request->query("id");
        $user = Users::findOrFail($id);

        $validatedRequest = $request->validate([
            "email" => "sometimes|email|unique:users,email," . $user->id,
            "name" => "sometimes|unique:users,name," . $user->id,
            "password" => "sometimes|min:8",
            "phoneNumber" => "sometimes"
        ]);

    
        if (isset($validatedRequest["email"])) {
            $user->email = $validatedRequest["email"];
        }

        if (isset($validatedRequest["name"])) {
            $user->name = $validatedRequest["name"];
        }

        if (isset($validatedRequest["phoneNumber"])) {
            $user->phoneNumber = $validatedRequest["phoneNumber"];
        }

        if (isset($validatedRequest["password"])) {
            $user->password = Hash::make($validatedRequest["password"]);
        }

        $user->save();

        return response()->json([
            "message" => "User Updated"
        ]);

    } catch (ValidationException $err) {

        $errors = $err->errors();

        return response()->json([
            "message" => collect($errors)->flatten()->first()
        ], 200);

    } catch (\Exception $err) {

        Log::error($err->getMessage());

        return response()->json([
            "message" => "Something Went Wrong"
        ], 500);
    }
}




public function MakeEnquiry(Request $request){
try {
$validatedRequest = $request ->validate([
"name"=>"required",
"email"=>"required",
"phone"=>"required",
"type"=>"required",
"message"=>"required",
"isResponded"=>"nullable"
]);
$mailer = new EnquiryMailer($validatedRequest);
Mail::to($validatedRequest['email'])->cc('info@litstructure.com')->send($mailer);
Enquiry::create($validatedRequest);

return response()->json([
"message"=>"Enquiry Added"
]);
}catch(ValidationException $err){
$errors = $err->errors();
return response()->json([
"message"=>collect($errors)->flatten()->first()
]);
} catch (\Throwable $th) {
Log::error($th->getMessage());
return response()->json([
"message"=>"Something Went Wrong",
"error"=>$th->getMessage()
]);
}

}



// create settings
//only one setting at a time if exiists just do an update 
public function DoSetting(Request $request)
{
    try {
        $validated = $request->validate([
            'email'       => 'nullable|email',
            'phoneNumber' => 'nullable|string|max:20',
            'instagram'   => 'nullable|string',
            'facebook'    => 'nullable|string',
            'linkedin'    => 'nullable|string',
            'logo'        => 'nullable|image|max:2048',
        ]);

    
        $settings = Settings::first();

        $path = null;
        if ($request->hasFile('logo')) {

            // delete old logo
            if ($settings && $settings->logo) {
                Storage::disk('public')->delete($settings->logo);
            }

            $validated['logo'] = $request
                ->file('logo')
                ->store('settings', 'public');
        }

        /*
        |--------------------------------------------------------------------------
        | Create OR Update
        |--------------------------------------------------------------------------
        */
        if ($settings) {

            $settings->update($validated);

        } else {

            $validated['users_id'] =$this->validator($request) ;

            $settings = Settings::create($validated);
        }

        return response()->json([
            'success' => true,
            'message' => 'Settings saved successfully',
          
        ]);

    } catch (\Throwable $e) {

        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}





public function GetSettings (Request $request){
try {
$existingSetting = Settings::first();
if($existingSetting){
return response()->json([
"settings"=>true,
"data"=>$existingSetting
]);
}else{
return response()->json([
"settings"=>false,

]); 
}
} catch (\Throwable $th) {
Log::error($th->getMessage());
return response()->json([
"message"=>"Something went wrong"
],500);
}}




public function GetEnquiries(Request $request){
$enquiries = Enquiry::all();
return response()->json([
"status"=>true,
"data"=>$enquiries
]);
}


public function GetUserProfile(Request $request){
$user_id = $this->validator($request);
$user = User::select(["id","name","email","phoneNumber"])->where("id",$user_id)->firstOrFail();
if(!$user){return response()->json(["status"=>false]);}
return response()->json([
"status"=>'true',
"data"=>$user
]);
}
}
 





