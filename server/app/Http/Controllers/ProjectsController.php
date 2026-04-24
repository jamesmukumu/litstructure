<?php

namespace App\Http\Controllers;

use App\Models\Projects;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;

interface ProjectInterface {
public function validator(Request $request);
}
class ProjectsController extends Controller implements ProjectInterface{
    
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

public function CreateProject(Request $request)
{
    try {

        $validatedRequest = $request->validate([
            "name"  => "required|unique:clients,name",
            "image" => "required|file|image|max:2048",
            "description"=>"required",
            "documentation"=>"required|file|mimes:pdf,doc,docx|max:2048",
            "clients_id"=>"required",
            "inceptionDate"=>"required",
            "completionDate"=>"required",
            "isCompleted"=>"nullable",
            "isFinalized"=>"nullable",
            
        ]);

        $user_id = $this->validator($request);

        $slug = Str::slug($validatedRequest["name"]);

        $path = null;
        $documentation_path = null;

        if ($request->hasFile("image")) {
            $path = $request->file("image")->store("projects", "public");

        }
if($request->hasFile("documentation")){
                $documentation_path = $request->file('documentation')->store('documentation','public');
}
        $validatedRequest["slug"] = $slug;
        $validatedRequest["documentation"] = $documentation_path;
        $validatedRequest["image"] = $path;
        $validatedRequest["users_id"] = $user_id;

        Projects::create($validatedRequest);
        return response()->json([
            "message" => "Project added successfully",
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
            "message" => "Something Went wrong"
        ], 200);
    }
}





public function UpdateProject(Request $request)
{
    try {
     $id = $request->query("id");
        $project = Projects::findOrFail($id);

        $validatedRequest = $request->validate([
            "name"  => "required|unique:projects,name," . $id,
            "image" => "nullable|file|image|max:2048",
            "description" => "required",
            "documentation" => "nullable|file|mimes:pdf,doc,docx|max:2048",
            "clients_id" => "required",
            "inceptionDate" => "required",
            "completionDate" => "required",
            "isCompleted" => "nullable",
            "isFinalized" => "nullable",
        ]);

        $user_id = $this->validator($request);

        /* ================= SLUG ================= */
        $validatedRequest["slug"] = Str::slug($validatedRequest["name"]);

        /* ================= IMAGE UPDATE ================= */
        if ($request->hasFile("image")) {

            // delete old image
            if ($project->image) {
                Storage::disk("public")->delete($project->image);
            }

            $validatedRequest["image"] =
                $request->file("image")->store("projects", "public");
        } else {
            $validatedRequest["image"] = $project->image;
        }

        if ($request->hasFile("documentation")) {


            if ($project->documentation) {
                Storage::disk("public")->delete($project->documentation);
            }

            $validatedRequest["documentation"] =
                $request->file("documentation")->store("documentation", "public");

        } else {
            $validatedRequest["documentation"] = $project->documentation;
        }

        $validatedRequest["users_id"] = $user_id;

     
        $project->update($validatedRequest);

        return response()->json([
            "message" => "Project updated successfully",
            "data" => $project
        ], 200);

    } catch (\Illuminate\Validation\ValidationException $e) {

        return response()->json([
            "message" => collect($e->errors())->flatten()->first(),
            "errors" => $e->errors()
        ], 422);

    } catch (\Exception $err) {

        Log::error($err);

        return response()->json([
            "message" => "Something went wrong"
        ], 500);
    }
}




public function GetProjects(Request $request){
$projects = Projects::with(['client'])->get();
return response()->json([
"status"=>true,
"data"=>$projects
]);
}



public function GetProject(Request $request){
$slug = $request ->route("slug");
$project = Projects::where("slug",$slug)->firstOrFail();
if (!$project){
return response()->json([
"status"=>false
]);

}else{
return response()->json([
"status"=>true,
"data"=>$project
]);
}


}
}
