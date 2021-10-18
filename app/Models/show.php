<?php

namespace App\Models;

use App\Respatory\showRepo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class show extends Model
{
    use HasFactory;

    

    /**==================== Get Show ================= */

    public  function get_show()
    {
        $show = $this->show->key();
        dd($show);
        return $show;
    }

}
