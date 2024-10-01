<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Venue extends Model
{
    use HasFactory;

    public function all_images(): HasMany
    {
        return $this->hasMany(Image::class);
    }

    public function primary_image(): HasOne
    {
        return $this->hasOne(Image::class);
    }
}
