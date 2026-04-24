<?php

namespace App\Http\Controllers;

use App\Models\Clients;
use App\Models\Services;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;


interface ServicesInterface{
public function validator(Request $request);
}
class ServicesController extends Controller implements ServicesInterface{

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

public function CreateService(Request $request){
try{
$validatedRequest = $request->validate([
"name"=>"required|unique:services,name",
"description"=>"required",
"image"=>"required|file|image"
]);
$slug = Str::slug($validatedRequest["name"]);
$user_id = $this->validator($request);
$image_path =  null;
if($request->hasFile("image")){
$image_path = $request->file('image')->store("services","public");
}
$validatedRequest["image"] = $image_path;
$validatedRequest["users_id"] = $user_id;
$validatedRequest["slug"] = $slug;
Services::create($validatedRequest);
return response()->json([
"message"=>"Service Added"
]);
}catch(ValidationException $err){

return response()->json([
"message"=>collect($err->errors())->flatten()->first(),
"error"=>$err->errors()
],200);
}catch(\Exception $err){
Log::error($err->getMessage());
return response()->json([
"message"=>"Something went wrong"
],500);
}

}



public function UpdateService(Request $request)
{
    try {
        $id = $request->query("id");

        $service = Services::findOrFail($id);

    
        $validatedRequest = $request->validate([
            "name" => "sometimes|required|unique:services,name," . $service->id,
            "description" => "sometimes|required",
            "image" => "sometimes|file|image",
        ]);

        // ---------------- USER ----------------
        $user_id = $this->validator($request);

        // ---------------- NAME + SLUG ----------------
        if ($request->filled("name")) {
            $validatedRequest["slug"] = Str::slug($request->name);
        }

        // ---------------- IMAGE UPDATE ----------------
        if ($request->hasFile("image")) {

            // delete old image
            if ($service->image && Storage::disk("public")->exists($service->image)) {
                Storage::disk("public")->delete($service->image);
            }

            // store new image
            $image_path = $request->file("image")
                ->store("services", "public");

            $validatedRequest["image"] = $image_path;
        }

        // ---------------- USER UPDATE ----------------
        $validatedRequest["users_id"] = $user_id;

        // ---------------- UPDATE ----------------
        $service->update($validatedRequest);

        return response()->json([
            "message" => "Service updated successfully"
        ]);

    } catch (ValidationException $err) {

        return response()->json([
            "message" => collect($err->errors())->flatten()->first(),
            "error" => $err->errors()
        ], 200);

    } catch (\Exception $err) {

        Log::error($err->getMessage());

        return response()->json([
            "message" => "Something went wrong"
        ], 500);
    }
}



public function GetDisplayService(Request $request){
$slug = $request->route('slug');
$service = Services::where("slug",$slug)->select(["id","name","image","description"])->firstOrFail();
$clients = Clients::select(["name","image","id"])->get();
return response()->json([
"message"=>"Service found",
"data"=>$service,
"clients"=>$clients
]);
}


public function GetServices(Request $request){
$services = Services::all();
return response()->json([
"status"=>true,
"data"=>$services ?? []
]);
}

}
