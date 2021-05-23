<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    @extends('partials.headers')

    <link rel="stylesheet" href="{{ URL::asset('css/signup.css')}}">

    <title>Feelingly | Forgot password</title>
</head>
<body class="container-fluid vh-100 reversedDeepSignBackground">

    <div class="row justify-content-center">
        <div class="col-sm-4 mt-5 white pt-3 px-5 pb-5">

            <div class="mb-5">
                <a href="/">
                    <img src="{{URL::asset('assets/logo-with-text.svg')}}" width="60%" class="sizeOfLogoWithText rounded mx-auto d-block img-responsive mt-4" alt="Feelingly">
                </a>

                <div class="text-center mt-5 roboto-slab-font">

                    <h2>
                        Forgot your password?
                    </h2>

                    <h6>
                        No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
                    </h6>

                    <!-- Session Status -->
                    <x-auth-session-status class="mb-4" :status="session('status')" />

                    <!-- Validation Errors -->
                    <x-auth-validation-errors class="mb-4" :errors="$errors" />

                    <form method="POST" action="{{ route('password.email') }}" class="mt-4">
                        @csrf
            
                        <!-- Email Address -->
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" class="form-control" id="email" name="email" :value="old('email')" autofocus required>
            
                        </div>

                        <button type="submit" class="btn btn-primary mt-4">Email Password Reset Link</button>
            
                    </form>

                </div>
            </div>
           
        </div>
    
    </div>
    
    

</body>
</html>