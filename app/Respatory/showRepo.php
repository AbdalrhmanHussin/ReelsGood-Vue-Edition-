<?php 

namespace App\Respatory;

use App\Models\show;
use Closure;
use Exception;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Facades\Http;

class showRepo implements showRepoInterface {

    /** Variabels */

    protected $key;
    protected $base_url = 'https://api.themoviedb.org/3/';
    protected $sortBy   = 'popular';
    protected $type     = 'movie';
    protected $typeArr  = ['movie','tv','person'];
    protected $provider;
    protected $page = 1;
    protected $get;

    public function key()
    {
        return '?api_key='.$this->key = env('TMDB');
    }

    /**
     * Resort the output show depend on the value
     * 
     * @param sort 
     * @return instance 
    */

    public function sortBy(string $sort)
    {
        $this->sortBy  = $sort; 
        
        return $this;
    }

    /**
     *  Set provider to shows
     *  @param provider 
     *  @return instacne 
    */

    public function provider($provider = [])
    {
        if(gettype($provider) == 'array')
        {
            $this->provider = implode(',',$provider);
        } else $this->provider = $provider;

        return  $this;
    }

    /**
     * Detect the type of show
     * @param type => tv | movie
     * @return instance
    */

    public function type(string $type)
    {
        $this->type = $type;
        
        return $this;
    }

    public function page(int $page)
    {
        $this->page = $page;

        return $this;
    }


    /**
     * get a show by id
     * @param args => return request with decalre value
     * @return array 
    */

    public function find(int $id,$provider = [])
    {
        if(in_array($this->type,$this->typeArr))
        {

            $request = $this->base_url.$this->type.'/'.$id . $this->key().'&append_to_response='.$this->provider;

            $request = Http::get($request)->json();

            if(str_contains($this->provider,'credits'))
            {
                $cast = (isset($request['credits']['cast'])) ? $request['credits']['cast'] : [];
                $crew =  (isset($request['credits']['crew'])) ? $request['credits']['crew'] : [];
                $collection = static::collected('merge',[$cast,$crew])->chunk(2)->toArray();
                $request['credits']['cast'] = $collection;
                $request['credits']['crew'] = [];
            }

            return $request;

        } else throw new Exception('The type of request must be set to tv | movie, the given type is either set to null or undefined');
    }

    /**
     * Detect the type of show
     * @param args => return request with decalre value
     * @return array 
    */
    
    public function get()
    {
        if(in_array($this->type,$this->typeArr))
        {  
            $get = ($this->sortBy == 'discover') ? $this->sortBy .'/'. $this->type : $this->type .'/'. $this->sortBy;

            $request = $this->base_url.  $get . $this->key().'&page='.$this->page;

            $request = Http::get($request)->json();

            return $request;

        } else throw new Exception('The type of request must be set to tv | movie, the given type is either set to null or undefined');
    }

    /**
     * Get shows depend on there category
     * @param $data
     * @return array
     */

    public function getByCategory($id) {
        $key = $this->key();

        $type = $this->type;

        $genreShow = [];

        $provider = $this->provider;

        $request = $this->base_url.'discover/'.$type.$key.'&append_to_response='.$provider ."&with_genres=$id".'&page='.$this->page;
            
        $collection = Http::get($request)->json();

        return $collection;
    }

    /**
     *  Get show genre
     * @param type => tv|movie
     * @return collection
     */
    public function genre_id($type) {

        $key = $this->key();
        
        return $this->collected('map',Http::get("https://api.themoviedb.org/3/genre/$type/list$key&language=en-US")->json()['genres']);
    }


    /**
     * Get all genre of tv|movie togther
     * @return collection
     */

    public function genre_ids()
    {
        return [
            'movie' => $this->genre_id('movie')->toArray(),
            'tv'     => $this->genre_id('tv')->toArray()
        ];
    }

    /**
     * @param type => chunk,map,merge
     * @param arr -> array need to apply collection on it 
     * @param limit => [0,9]
     * @return collection
    */

    public static function collected($type,$arr = [],$limit = null) {
        if($type == 'chunk') {
           $collection = collect($arr)->chunk($limit);
        } else if($type == 'map') {
          $collection = collect($arr)->mapWithKeys(function($arr){
             return [$arr['id'] => $arr['name']];
          });
        } else if($type == 'merge') {
          $collection = collect($arr[0])->merge($arr[1]);
        } else if($type == 'limit') {
          $collection = collect($arr)->take($limit);
        }
        
        return $collection;
    }

    public function searchFor(string $get)
    {
        $this->get = $get;

        return $this;
    }

    /**
     * Get array of shows that have keyword | genre that provided 
     * @param search 
     * 
     */
    public function fetch(string | int $search)
    {
        if($this->get == 'query') {
            $request = $this->base_url . 'search/multi' . $this->key() . "&language=en-US&page=1&include_adult=false&query=$search".'&page='.$this->page;

            return Http::get($request)->json();

        } else if ($this->get == 'genre') {
            $request = $this->base_url . '/discover/' . $this->type . '/' . $this->key . "&language=en-US&page=1&include_adult=false&query=$search";

            return Http::get($request)->json();

        }

    }
 

}