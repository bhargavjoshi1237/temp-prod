<?php
namespace App\Http\Repositories;

use App\Models\Book;
use App\Repositories\BaseRepository;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

class BookRepository extends BaseRepository
{
    public function __construct(Book $model)
    {
        parent::__construct($model);
    }

    public function getAll(array $relations = [], bool $withTrashed = false, array $selects = []): Collection|EloquentCollection|array
    {
        $query = $this->model->newQuery();

        if (!empty($relations)) {
            $query->with($relations);
        }

        if ($withTrashed && method_exists($query->getModel(), 'withTrashed')) {
            $query->withTrashed();
        }

        if (!empty($selects)) {
            $query->select($selects);
        }

        return $query->get();
    }

    
    public function create(array $data)
    {
        return Book::create($data);
    }
}
