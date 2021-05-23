<?php

namespace App\Listeners;

use App\Events\EmailChanged;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Notifications\Notification;

use Illuminate\Auth\Notifications\VerifyEmail;

class SendNewEmailVerificationNotification extends Notification 
{
    //use InteractsWithQueue;
    use Queueable;

    /**
     * Handle the event.
     *
     * @param  EmailChanged  $event
     * @return void
     */
    public function handle(EmailChanged $event)
    {
        if ($event->user instanceof MustVerifyEmail && ! $event->user->hasVerifiedEmail()) {
            $event->user->sendNewEmailVerificationNotification();
        }
    }
}
