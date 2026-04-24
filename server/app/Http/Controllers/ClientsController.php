<?php

namespace App\Http\Controllers;

use App\Models\Clients;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;

interface ClientsInterface
{
public function verifyingToken(Request $request);

}
class ClientsController extends Controller implements ClientsInterface{


 public function verifyingToken(Request $request)
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


public function CreateClient(Request $request)
{
    try {

        $validatedRequest = $request->validate([
            "name"  => "required|unique:clients,name",
            "image" => "required|file|image|max:2048",
            "email"=>"required|unique:clients,email",
            "phonenumber"=>"required|unique:clients,phonenumber",
            "contactIndividual"=>"required",
            "hasHosting"=>"required",
            "domainName"=>"nullable|unique:clients,domainName",
            "domainExpiry"=>"nullable",
            "domainActive"=>"nullable",
            "domainExpied"=>"nullable",
            "hasSystem"=>"required",
            "systemMode"=>"nullable",
            "systemActive"=>"nullable",
            "systemDoneByUs"=>"nullable",
            "systemYearMade"=>"nullable",
            "systemRuntime"=>"nullable",
            "description"=>"nullable"
        ]);

        $user_id = $this->verifyingToken($request);

        $slug = Str::slug($validatedRequest["name"]);

        $path = null;

        if ($request->hasFile("image")) {
            $path = $request->file("image")->store("clients", "public");
        }

        $validatedRequest["slug"] = $slug;
        $validatedRequest["image"] = $path;
        $validatedRequest['users_id'] = $user_id;
        Clients::create($validatedRequest);   

        return response()->json([
            "message" => "Client added successfully",
        ], 201);

    } catch (\Illuminate\Validation\ValidationException $e) {
          $errors = $e->errors();
        return response()->json([
            "message" => collect($errors)->flatten()->first(),
            "errors" => $e->errors()
        ]);

    } catch (\Exception $err) {

        Log::error($err);

        return response()->json([
            "message" => $err->getMessage() 
        ], 500);
    }
}


public function FindClients(Request $request){
$clients = Clients::select(["id","name"])->get();
return response()->json([
"data"=>$clients,
]);
}


public function ClientManagement(Request $request){
$clients = Clients::all();
return response()->json([
"message"=>"Client Fetched Successfully",
"data"=>$clients
]);
}





public function FindClient(Request $request){
$slug = $request->route("slug");
$client = Clients::where("slug",$slug)->firstOrFail();
if(!$client){
return response()->json([
"message"=>"Client Not Found",

]);    
}
return response()->json([
"message"=>"Client Found",
"data"=>$client
]);
}






public function UpdateClient(Request $request){

    try {
           $id = $request->query('id');
        $client = Clients::findOrFail($id);

        $validatedRequest = $request->validate([
            "name"  => "required|unique:clients,name,".$id,
            "image" => "nullable|file|image|max:2048",
            "email" => "required|unique:clients,email,".$id,
            "phonenumber" => "required|unique:clients,phonenumber,".$id,
            "contactIndividual" => "required",
            "hasHosting" => "required",
            "domainName" => "nullable|unique:clients,domainName,".$id,
            "domainExpiry" => "nullable",
            "domainActive" => "nullable",
            "domainExpied" => "nullable",
            "hasSystem" => "required",
            "systemMode" => "nullable",
            "systemActive" => "nullable",
            "systemDoneByUs" => "nullable",
            "systemYearMade" => "nullable",
            "systemRuntime" => "nullable",
            "description" => "nullable"
        ]);

        $user_id = $this->verifyingToken($request);

        // Update slug if name changes
        if (isset($validatedRequest["name"])) {
            $validatedRequest["slug"] = Str::slug($validatedRequest["name"]);
        }

        // Handle image replacement
        if ($request->hasFile("image")) {

            // delete old image if exists
            if ($client->image && Storage::disk("public")->exists($client->image)) {
                Storage::disk("public")->delete($client->image);
            }

            // upload new image
            $path = $request->file("image")->store("clients", "public");
            $validatedRequest["image"] = $path;
        }

        $validatedRequest["users_id"] = $user_id;

        $client->update($validatedRequest);

        return response()->json([
            "message" => "Client updated successfully",
          
        ], 200);

    } catch (\Illuminate\Validation\ValidationException $e) {

        return response()->json([
            "message" => collect($e->errors())->flatten()->first(),
            "errors" => $e->errors()
        ]);

    } catch (\Exception $err) {

        Log::error($err);

        return response()->json([
            "message" => $err->getMessage()
        ], 500);
    }

}
}