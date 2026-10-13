<?php

use App\Http\Controllers\DocumentController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DocumentController::class, 'dashboard'])->name('dashboard');
    Route::post('documents', [DocumentController::class, 'store'])->name('documents.store');
    Route::post('documents/import', [DocumentController::class, 'upload'])->name('documents.upload');
    Route::get('documents/{document}', [DocumentController::class, 'show'])->name('documents.show');
    Route::put('documents/{document}', [DocumentController::class, 'update'])->name('documents.update');
    Route::post('documents/{document}/share', [DocumentController::class, 'share'])->name('documents.share');
    Route::delete('documents/{document}/share/{user}', [DocumentController::class, 'unshare'])->name('documents.unshare');
});

require __DIR__.'/settings.php';
