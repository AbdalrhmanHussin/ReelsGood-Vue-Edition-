<?php

namespace App\Http\Controllers;

use App\Respatory\showRepo;
use Illuminate\Http\Request;

class ShowController extends Controller
{
    /** ================= Get Repo ================ */
    public $show;
    public function __construct(showRepo $show)
    {
        $this->show = $show;
    }

    /**
     * Get all genres
     * @return array => genres
    */

    public function genre_ids()
    {
        $genre = $this->show->genre_ids();
        return $genre;
    }

    /**
     * Get genre for tv | movie
     * @param show 
     * @return array => genres
    */

    public function genre(string $show)
    {
        $genre = $this->show->genre_id($show);
        return $genre;
    }

    /**
     * Get show collection
     * @param type
     * @param page
     * @param provider
     * @return array => shows
    */

    public function get(string $type,int $page = 1,$sort = 'popular')
    {
        $shows = $this->show
                      ->type($type)
                      ->sortBy($sort)
                      ->page($page)
                      ->get();
        dd($shows);
        return $shows;
    }

    /**
     * Get show collection by category
     * @param cat
     * @param page
     * @param provider
     * @return array => shows
    */

    public function getByCategory(int $cat,int $page = 1,array $provider = [])
    {
        $shows = $this->show
                      ->provider($provider)
                      ->type('tv')
                      ->page($page)
                      ->getByCategory($cat);
        return $shows;
    }

    /**
     * Get a movie 
     * @param type
     * @param id
     * @return array => movie
    */

    public function find(Request $request,string $type,int $id = 1)
    {
        $shows = $this->show
                      ->type($type)
                      ->provider($request->provider)
                      ->find($id);
        return $shows;
    }

    /**
     * Get shows by keyword or query
     * @param search
     * @param type
    */

    public function search(string $type,string $search,int $limit = null)
    {
        $shows = $this->show
                      ->searchFor($type)
                      ->fetch($search);

        if($limit !== null)
        {
            return $this->show->collected('limit',$shows['results'],$limit);
        }

        return $shows;

    }

}
