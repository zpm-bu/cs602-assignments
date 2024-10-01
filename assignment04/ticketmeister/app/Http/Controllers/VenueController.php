<?php

namespace App\Http\Controllers;

use App\Models\Venue;
use Illuminate\Contracts\View\View;

class VenueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): View
    {
        /*return Venue::all();*/
        return view('venues.index', ['venues' => Venue::all()]);
    }
}
