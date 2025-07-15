<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIsbnAndDescriptionToBooksTable extends Migration
{
    public function up()
    {
        Schema::table('books', function (Blueprint $table) {
            if (!Schema::hasColumn('books', 'isbn')) {
                $table->string('isbn')->nullable();
            }
            // Only add description if it does not exist
            if (!Schema::hasColumn('books', 'description')) {
                $table->text('description')->nullable();
            }
        });
    }

    public function down()
    {
        Schema::table('books', function (Blueprint $table) {
            if (Schema::hasColumn('books', 'isbn')) {
                $table->dropColumn('isbn');
            }
            if (Schema::hasColumn('books', 'description')) {
                $table->dropColumn('description');
            }
        });
    }
}
