<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    @extends('partials.headers')

    <link rel="stylesheet" href="{{ URL::asset('css/verify-email.css')}}">

    <title>Feelingly | Signup</title>
</head>
<body class="container-fluid vh-100 reversedDeepSignBackground">

    <div class="row justify-content-center">
        <div class="col-sm-4 mt-5 white pt-3 px-5 pb-5">

            <div class="mb-5">
                <a href="/">
                    <img src="{{URL::asset('assets/logo-with-text.svg')}}" width="60%" class="sizeOfLogoWithText rounded mx-auto d-block img-responsive mt-4" alt="Feelingly">
                </a>

                <div class="text-center mt-5 roboto-slab-font">

                    <h1>
                        One more step👣
                    </h1>

                    <h5>
                        We've sent you a link to verify your email. If you didn't receive it, click to re-send
                    </h5>

                    <div class="mt-4 flex items-center justify-between">
                        <form method="POST" action="{{ route('verification.send') }}">
                            @csrf
            
                            <div>
                                <button class="btn btn-info">
                                    Resend Verification Email
                                </button>
                        
                            </div>
                        </form>
            
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
            
                            <button type="submit" class="underline text-sm text-gray-600 hover:text-gray-900 mt-4 btn btn-light">
                                {{ __('Log out') }}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
 
        </div>
    
    </div>
    
    

</body>
</html>