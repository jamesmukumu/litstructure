<?php

namespace App\Http\Middleware;

use App\Models\Users;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class SuperAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
{
    try {

        $tokenHeader = $request->header("Authorization");

        // Check header exists
        if (!$tokenHeader || !str_starts_with($tokenHeader, 'Bearer ')) {
            return response()->json([
                "status" => false,
                "message" => "Permission not granted"
            ],200);
        }

        // Extract token
        $token = substr($tokenHeader, 7);

        // Decode token payload
        $payload = JWTAuth::setToken($token)->getPayload();
        $userId = $payload->get('sub');

        // Find user
        $user = Users::find($userId);

        // Permission check
        if (!$user || !$user->superAdmin) {
            return response()->json([
                "status" => false,
                "message" => "Permission not granted"
            ], 200);
        }

        return $next($request);

    } catch (\Exception $e) {

        return response()->json([
            "status" => false,
            "message" => "Permission not granted"
        ], 200);
    }
}
}
