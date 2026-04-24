<?php

use App\Http\Controllers\ClientsController;
use App\Http\Controllers\EmailsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\UsersController;
use App\Http\Middleware\NormalAdminMiddleware;
use App\Http\Middleware\SuperAdminMiddleware;
use Illuminate\Support\Facades\Route;
use Symfony\Component\Mime\Email;

// protected super admin route only
Route::middleware(SuperAdminMiddleware::class)->group(function(){
Route::post("/create/new/user",[UsersController::class,"CreateUser"]);
Route::get("/manage/users",[UsersController::class,"ManageUsers"]);
Route::put("/update/user",[UsersController::class,"UpdateUser"]);
Route::delete("/delete/admin",[UsersController::class,"DeleteAdmin"]);
Route::get("/get/settings",[UsersController::class,"GetSettings"]);
Route::post("/make/settings",[UsersController::class,"DoSetting"]);
});



// protected normal admin route
Route::middleware(NormalAdminMiddleware::class)->group(function(){

Route::get('/get/profile',[UsersController::class,'GetUserProfile']);
Route::post("/create/new/client",[ClientsController::class,"CreateClient"]);
// Clients 

Route::get("/get/clients",[ClientsController::class,"FindClients"]);
Route::get("/manage/clients",[ClientsController::class,"ClientManagement"]);
Route::get('/get/client/{slug}',[ClientsController::class,'FindClient']);
Route::put("/update/client",[ClientsController::class,"UpdateClient"]);



Route::get("/get/services",[ServicesController::class,"GetServices"]);
Route::put("/update/service",[ServicesController::class,"UpdateService"]);
// Services
Route::post("/create/new/service",[ServicesController::class,"CreateService"]);
// projects
Route::post("/create/new/project",[ProjectsController::class,"CreateProject"]);
Route::put("/update/project",[ProjectsController::class,"UpdateProject"]);
Route::get("/get/projects",[ProjectsController::class,"GetProjects"]);
Route::get('/get/project/{slug}',[ProjectsController::class,"GetProject"]);

// Send email
Route::post("/send/email",[EmailsController::class,"sendMail"]);
Route::post("/save/bulk",[EmailsController::class,"SaveBulkEmails"]);
});




Route::post("/login/user",[UsersController::class,"handleLogin"]);


Route::post("/make/enquiry",[UsersController::class,"MakeEnquiry"]);
Route::get("/get/enquiries",[UsersController::class,"GetEnquiries"]);







Route::get("/get/service/{slug}",[ServicesController::class,"GetDisplayService"]);










Route::get("/get/home",[HomeController::class,"Home"]);




