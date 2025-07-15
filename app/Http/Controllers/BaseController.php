<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

abstract class BaseController extends Controller
{
    public function sendRedirectResponse(string $redirect, string $message = ''): RedirectResponse
    {
        return Redirect::to($redirect)
            ->with('message', [
                'status' => 'success',
                'description' => $message,
            ]);
    }

    /**
     * @return RedirectResponse
     */
    public function sendRedirectBackResponse(string $message = '')
    {
        return Redirect::back()
            ->with('message', [
                'status' => 'success',
                'description' => $message,
            ]);
    }

    public function sendRedirectError(string $redirect, string $message): RedirectResponse
    {
        return Redirect::to($redirect)
            ->with('message', [
                'status' => 'error',
                'description' => $message,
            ]);
    }

    /**
     * @return RedirectResponse
     */
    public function sendRedirectBackError(string $message = '')
    {
        return Redirect::back()
            ->with('message', [
                'status' => 'error',
                'description' => $message,
            ]);
    }

    public function sendRedirectBackWitInputError(string $message = '')
    {
        return Redirect::back()
            ->withInput()
            ->with('message', [
                'status' => 'error',
                'description' => $message,
            ]);
    }
}
