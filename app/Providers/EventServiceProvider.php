<?php

namespace App\Providers;

/*
    This Notification is custom built. 
*/
use App\Notifications\SendEmailVerificationNotification;
use App\Events\EmailChanged;
use App\Listeners\SendNewEmailVerificationNotification;

use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        EmailChanged::class => [
            SendNewEmailVerificationNotification::class
        ]

        
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
