<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['message', 'room_id'];
    protected $with = ['user'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function messageRecipients()
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('d-M');
    }

}
