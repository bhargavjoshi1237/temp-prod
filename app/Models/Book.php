<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'price',
        'cover_image',
        'description',
        'isbn',
        // add other fields as needed
    ];

    /**
     * Relationship: Users who liked this book
     */
    public function likedByUsers()
    {
        return $this->belongsToMany(User::class, 'book_user_likes')->withTimestamps();
    }
}
