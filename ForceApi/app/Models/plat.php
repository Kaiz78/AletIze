<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\plat
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $image
 * @property string $price
 * @property string $categorie
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Commande|null $commandes
 * @method static \Illuminate\Database\Eloquent\Builder|plat newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|plat newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|plat query()
 * @method static \Illuminate\Database\Eloquent\Builder|plat whereCategorie($value)
 * @method static \Illuminate\Database\Eloquent\Builder|plat whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|plat whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|plat whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|plat whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|plat whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|plat wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|plat whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class plat extends Model
{
    use HasFactory;
    protected $table = "plats";

    protected $fillable = [
        'name',
        'description',
        'image',
        'price',
        'categorie',
    ];

    public function commandes()
    {
        return $this->belongsTo(Commande::class);
    }
}

// PLAT MODEL RELATIONSHIP WITH COMMANDE MODEL
// USER MODEL RELATIONSHIP WITH COMMANDE MODEL
// COMMANDE MODEL COLUMN NAME PRODUCTS USER_ID CREATED_AT UPDATED_AT
// COMMANDE PLUSIEURS PLATS MAIS UNE COMMANDE A UN SEUL USER

// one to one relationship between user and commande
// one to many relationship between commande and plats