<?php

namespace App\Http\Controllers;

use App\Models\Clients;
use App\Models\Projects;
use App\Models\Services;
use Illuminate\Http\Request;

class HomeController extends Controller{
    


public function Home(Request $request){
$services = Services::all();
$clients = Clients::all();
$projects = Projects::orderBy("created_at","asc")->limit(2)->get();
return response()->json([
"data"=>[
"services"=>$services,
"projects"=>$projects,
"clients"=>$clients
]
]);
}
}
