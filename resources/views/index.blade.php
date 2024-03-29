<!DOCTYPE html>
<html lang="en">
    <head>


        @extends("partials.headers")

        <link rel="stylesheet" href="{{ URL::asset('css/index.css')}}">

        <title>Feelingly</title>

    </head>

    <body class="container-fluid">

        <div class="row">

            <div class="col-lg-3 order-xs-first ">
                <div class="mb-4">
                    <img src="{{URL::asset('assets/logo-with-text.svg')}}" class="sizeOfLogoWithText rounded mx-auto d-block img-responsive mt-4" alt="Feelingly">
                </div>


                <h1 class="mt-5 roboto-slab-font text-center">Log in</h1>

                

                <form action="/login" method="POST" class="m-5 roboto-slab-font">

                    @csrf
                    
                    @if(session()->has("success_status"))
                        <div class="row mt-2">
                            <div class="col-lg-12 text-center">
                                <div class="alert alert-success">
                                    {{session()->get("success_status")}}
                                </div>
                            </div>
                        </div>
                    @endif
                    

                    <div class="mb-2">
                        <label for="email" class="form-label">Email:</label>
                        <input type="email"class="form-control" id="email" name="email" placeholder="Your email" aria-describedby="emailHelp" autofocus>
                        @error("email")
                            <div class="alert alert-danger">
                                {{$message}}
                            </div>
                        @enderror
                    </div>

                    <div class="mb-2">
                        <label for="password" class="form-label mt-2">Password:</label>
                        <input type="password" class="form-control" id="password" name="password" placeholder="Your password" >
                    </div>

                    @if ($errors->any())
                        <div class="mb-2">
                            <a href="{{route("password.request")}}" class="text-secondary">Forgot password?</a>
                        </div>
                    @endif 
                    
                    <div class="mb-3">
                        <a href="/register">Don't have a account yet? Sign up</a>
                    </div>
                    
                    <div class="">
                        <button type="submit" class="btn btn-primary btn-block w-100">Log in</button>
                    </div>

                    <div class="mt-2">
                        <a href="{{ route('google.login') }}" class="btn border border-dark w-100 changeContrast">
                            <x-google-icon/> Login with Google
                        </a>
                    </div>


                    <div class="">
                        <x-additional-links/>
                    </div>
                </form>

                

            </div>

            <div class="col-lg-9 vh-100 deepSignBackground">

                <div class="mt-5 roboto-slab-font textBlock">
                    <h2 style="font-size:50px;" class="font-weight-bold">
                        Just your thoughts and you
                    </h2>
    
                    <h6 class="font-weight-light">
                        Express yourself feelingly. Write whatever you feel.
                    </h6>
                    
                </div>

               

            </div>

            

        </div>

        
     
    </body>
</html>

