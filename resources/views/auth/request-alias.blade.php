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
                        Please input an alias for your user account
                    </h5>

                    <div class="mt-4 flex items-center justify-between">
                        <form method="POST" action="{{ route('google.create-user') }}">
                            @csrf

                            <x-prepopulated-user-hidden-field/>

                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach

                            <input type="text" name="alias" class="form-control">
                            @error("alias")
                                <div class="alert alert-danger">
                                    {{$message}}
                                </div>
                            @enderror


                            <div>
                                <input type="submit" class="btn btn-info mt-5" value="Register!">
                        
                            </div>
                        </form>
            
                    </div>

                </div>
            </div>
 
        </div>
    
    </div>
    
    

</body>
</html>