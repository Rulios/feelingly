<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    @extends('partials.headers')

    <link rel="stylesheet" href="{{ URL::asset('css/signup.css')}}">

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
                        Sign up
                    </h1>

                    <h5>
                        Words written directly by your heart. &#10084;&#65039;
                    </h5>

                    @if(session()->has("signupSuccess") && session()->get("signupSuccess"))
                        <h5>
                            Let's start the journey from your heart.&#9997;
                        </h5>
                    @endif

                </div>
            </div>
           
            @if(session()->has("signupSuccess") && session()->get("signupSuccess"))

                <div class="alert alert-success roboto-slab-font">
                    <h4>    
                        SUCCESSFUL SIGN UP!
                        Now you can <a href="/">login</a>
                    </h4>
                </div>

                @else

                <form action="/register" method="POST">

                    {{csrf_field()}}
    
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email">
                        @error("email")
                            <div class="alert alert-danger">
                                {{$message}}
                            </div>
                        @enderror
                    </div>
    
                    <div class="form-group">
                        <label for="alias">Alias</label>
                        <input type="text" class="form-control" id="alias" name="alias" minlength="1" maxlength="30" aria-describedby="aliasHelp" placeholder="Unique alias">
                        @error("alias")
                            <div class="alert alert-danger">
                                {{$message}}
                            </div>
                        @enderror
                                           
                    </div>
    
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" name="name" minlength="1" maxlength="30" placeholder="Enter name">
                        @error("name")
                            <div class="alert alert-danger">
                                {{$message}}
                            </div>
                        @enderror
                    </div>
                    
                    <div class="form-group">
                        <label for="date_of_birth">Date of birth</label>
                        <input type="date" class="form-control" id="date_of_birth" name="date_of_birth" aria-describedby="date_of_birthHelp">
                        <small id="date_of_birthHelp" class="form-text text-muted"></small>
                        @error("date_of_birth")
                            <div class="alert alert-danger">
                                {{$message}}
                            </div>
                        @enderror
                    </div>
    
                    <div class="form-group">
                      <label for="password">Password</label>
                      <input type="password" class="form-control" id="password" name="password" minlength="6" placeholder="Must be at least 6 characters">
                      @error("password")
                            <div class="alert alert-danger">
                                {{$message}}
                            </div>
                        @enderror
                    </div>
    
                    <div class="form-group">
                        <label for="repeat_password">Repeat password</label>
                        <input type="password" class="form-control" id="repeat_password" name="repeat_password" placeholder="Repeat your password">
                        @error("repeat_password")
                            <div class="alert alert-danger">
                                {{$message}}
                            </div>
                        @enderror
                    </div>
    
                    <div class="mb-3 mt-3">
                        <a href="/">Already have an account? Log in</a>
                    </div>
    
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>

            @endif

            

        </div>
    
    </div>
    
    

</body>
</html>