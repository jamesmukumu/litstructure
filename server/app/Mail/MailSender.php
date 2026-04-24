<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MailSender extends Mailable{
    use Queueable, SerializesModels;
public $title;
public $body;
public $attach;
    /**
     * Create a new message instance.
     */
    public function __construct($title,$body,$attach=[]){
     $this->title = $title;
     $this->body = $body;
     $this->attach = $attach;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->title,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'pages.mail.EmailSenderView',
            with:[
            "body"=>$this->body
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
           $files = [];

    foreach ($this->attach as $path) {
        $files[] = Attachment::fromStorageDisk('local', $path);
    }

    return $files;
    }
}
