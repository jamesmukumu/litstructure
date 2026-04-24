<?php

namespace App\Http\Controllers;


use App\Mail\MailSender;
use App\Models\BulkMails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;

interface EmailsInterface {
public function validator(Request $request);
}
class EmailsController extends Controller implements EmailsInterface{


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



    public function sendMail(Request $request)
    {
        try {
           
            $validated = $request->validate([
                "title"     => "required|min:6",
                "body"     => "required",
                "recepient" => "required|email",
                "attachments"  => "nullable",
                "cc"         => "nullable|string"
            ]);
         
            $ccEmails = [];
            if (!empty($validated["cc"])) {
                $ccEmails = array_filter(array_map("trim", explode(",", $validated["cc"])));
            }
    
        
            $filePaths = [];
            if ($request->hasFile("attachments")) {
                $attachments = $request->file("attachments");
                $attachments = is_array($attachments) ? $attachments : [$attachments];
    
                foreach ($attachments as $file) {
                    $filePaths[] = $file->store("private");
                }
            }
          try {
            
            
            $mail =  new MailSender($validated["title"],$validated['body'],$filePaths);
    
            
                  
                    $mailObject = Mail::to($validated["recepient"]);
                    if (!empty($ccEmails)) {
                        $mailObject->cc($ccEmails);
                    }
    
                    $mailObject->send($mail);
                
    
                return response()->json([
                    "message" => "Email sent"
                ], 200);
          }  catch (\Exception $sendError) {
                Log::error("Error sending email: " . $sendError->getMessage());
    
                return response()->json([
                    "message" => "Failed to send email: " . $sendError->getMessage()
                ], 200);
            }
    
        } catch (ValidationException $errValidate) {
            Log::error("Validation error: " . $errValidate->getMessage());
    
            return response()->json([
                "message" => "Validation error: " . $errValidate->getMessage()
            ], 500);
    
        } catch (\Exception $err) {
            Log::error("Error processing request: " . $err->getMessage());
    
            return response()->json([
                "message" => "Error processing request: " . $err->getMessage()
            ], 500);
        }
    }
    





public function SaveBulkEmails(Request $request){
try {
$validatedRequest = $request->validate([
"name"=>"required|unique:bulk_mails,name",
"email"=>"required|unique:bulk_mails,email",
"phoneNumber"=>"required|unique:bulk_mails,phoneNumber",
"type"=>"nullable",
]);
$validatedRequest['users_id'] = $this->validator($request);
BulkMails::create($validatedRequest);
return response()->json([
"message"=>"Bulk mails added"
]);
}catch(ValidationException $err){
Log::error($err->getMessage());
$errors = $err->errors();
return response()->json([
"message"=>collect($errors)->flatten()->first()
]);
} catch (\Exception $th) {
Log::error($th->getMessage());
return response()->json([
"message"=>"Something went wrong",
"error"=>$th->getMessage()
],500);
}



}


    }
