<!DOCTYPE html>
<html lang="en">
<head>

    <script defer src="{{ URL::asset("build/profile-config.js")}}"></script>

    @extends("partials.headers")

    <link rel="stylesheet" href="{{ URL::asset('css/profile.css')}}">


    <title>{{$alias}} | Feelingly</title>
</head>
<body class="container roboto-slab-font">

    <x-navbar />    

    @if(session()->has("success_status"))
        <div class="row mt-2">
            <div class="col-lg-12 text-center">
                <div class="alert alert-success">
                    {{session()->get("success_status")}}
                </div>
            </div>
        </div>
    @endif

    @if(session()->has("failure_status"))
        <div class="row mt-2">
            <div class="col-lg-12 text-center">
                <div class="alert alert-danger">
                    {{session()->get("failure_status")}}
                </div>
            </div>
        </div>
    @endif



    <div class="row mt-5">
        <div class="col-4">
            <div class="list-group list-group-flush" id="list-tab" role="tablist">
            <a class="list-group-item list-group-item-action active" id="list-general-list" data-toggle="list" href="#list-general" role="tab" aria-controls="general">General</a>
            <a class="list-group-item list-group-item-action" id="list-changePassword-list" data-toggle="list" href="#list-changePassword" role="tab" aria-controls="changePassword">Change Password</a>
            <a class="list-group-item list-group-item-action" id="list-advanced-list" data-toggle="list" href="#list-advanced" role="tab" aria-controls="advanced">Advanced</a>
            </div>
        </div>

        <div class="col-8">
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="list-general" role="tabpanel" aria-labelledby="list-general-list">
                    <div class="row">

                        <div class="col-lg-12">
                            <div class="col-lg-12" class="image">
                                <x-profile-pic :alias="$alias" addClasses="d-block" width="100" height="100"/>
                            </div>
                        </div>

                    </div>

                    <div class="row">
                        <div class="col-lg-12 d-flex justify-content-center mt-3">
                            <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModalCenter">
                                Change profile pic
                            </button>
                            
                            <!-- Modal -->
                            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLongTitle">Change profile pic</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body text-center ">
                                            
                                            <form action="{{route("profile.image.update")}}" id="profile_image_form" method="POST" class="row p-3 fadeGreyWhenHover" enctype="multipart/form-data">
                                                @csrf

                                                <label for="profile_image_selector" class="mb-2 text-primary">Select new profile image:</label>
                                                <input type="file" class="form-control" id="profile_image_selector" name="profile_image">
                                            </form>

                                            <form action="{{route("profile.image.delete")}}" method="POST" class="row p-3 fadeGreyWhenHover">
                                                @csrf

                                                <button type="submit" class="col border-bottom p-3 text-danger noDecorationButton fadeGreyWhenHover">
                                                    Delete current image
                                                </button>
                                            </form>

                                        
                                            <div class="row">
                                                <button class="col p-3 noDecorationButton fadeGreyWhenHover" data-dismiss="modal" aria-label="Return">
                                                    Return
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <form action="{{route("profile.update.basic")}}" method="POST" class="row mt-4">
                        @csrf

                        <div class="form-group">
                            <label for="alias">Alias</label>
                            <input type="text" class="form-control" id="alias" name="alias" minlength="1" maxlength="30" value="{{$alias}}" aria-describedby="aliasHelp" placeholder="Enter alias">
                            @error("alias")
                                <div class="alert alert-danger">
                                    {{$message}}
                                </div>
                            @enderror
                        </div>

                        <div class="form-group mt-2">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" id="name" name="name" minlength="1" maxlength="30" value="{{$name}}" placeholder="Enter name">
                            @error("name")
                                <div class="alert alert-danger">
                                    {{$message}}
                                </div>
                            @enderror
                        </div>

                        <div class="form-group mt-2">
                            <label for="name">Description</label>
                            <textarea name="description" id="description" maxlength="1000" class="form-control" placeholder="Words that describes you">{{$description}}</textarea>

                            @error("description")
                                <div class="alert alert-danger">
                                    {{$message}}
                                </div>
                            @enderror
                        </div>

                        <div class="form-group ">
                            <button type="submit" class="btn btn-outline-primary mt-5 ">Save profile</button>
                        </div>


                    </form>
            

                </div>

                <div class="tab-pane fade" id="list-changePassword" role="tabpanel" aria-labelledby="list-changePassword-list">
                    <form action="{{route("profile.change.password")}}" method="POST" class="row">
                        @csrf
                        {{method_field("PUT")}}

                        <div class="form-group">
                            <label for="actual_password">Actual Password</label>
                            <input type="password" class="form-control" id="actual_password" name="actual_password" minlength="8" placeholder="">
                            @error("actual_password")
                                <div class="alert alert-danger">
                                    {{$message}}
                                </div>
                            @enderror
                        </div>

                        <div class="form-group mt-2">
                            <label for="password">New Password</label>
                            <input type="password" class="form-control" id="password" name="password" minlength="8" placeholder="Must be at least 8 characters">
                            @error("password")
                                <div class="alert alert-danger">
                                    {{$message}}
                                </div>
                            @enderror
                        </div>
        
                        <div class="form-group mt-2">
                            <label for="password_confirmation">Repeat password</label>
                            <input type="password" class="form-control" id="password_confirmation" name="password_confirmation" placeholder="Repeat your password">
                            @error("password_confirmation")
                                <div class="alert alert-danger">
                                    {{$message}}
                                </div>
                            @enderror
                        </div>

                        <div class="form-group ">
                            <button type="submit" class="btn btn-outline-primary mt-5 ">Change Password</button>
                        </div>
                    </form>
                </div>

                <div class="tab-pane fade" id="list-advanced" role="tabpanel" aria-labelledby="list-advanced-list">
                    <form action="{{route("profile.change.email")}}" method="POST">
                        @csrf
                        {{method_field("PUT")}}
                        
                        <div class="form-group">
                            <label for="currentEmail">Current email:</label>
                            <input type="email" id="currentEmail" class="form-control" readonly value="{{$email}}">
                        </div>

                        <div class="form-group">
                            <label for="isEmailVerified">
                                Email verified:

                                @if ($email_verified_at)
                                    <span class="text-success">verified</span>
                                
                                @else
                                    <span class="text-danger">not verified</span>
                                @endif

                            </label>


                            @if (!$email_verified_at)
                                <a href="{{route("verification.notice")}}" class="mt-3 mb-3" id="isEmailVerified">Resend verification link</a>
                            @endif
                            
                        </div>

                        <div class="form-group mt-2">
                            <label for="newEmail">New email:</label>
                            <input type="email" id="newEmail" class="form-control"  name="new_email">
                            @error("new_email")
                                <div class="alert alert-danger">
                                    {{$message}}
                                </div>
                            @enderror
                        </div>

                        <div class="form-group ">
                            <label for="password">Password:</label>
                            <input type="password" class="form-control" id="password" name="password" placeholder="">
                            @error("password")
                                <div class="alert alert-danger">
                                    {{$message}}
                                </div>
                            @enderror
                        </div>

                        <div class="form-group">
                            <button type="submit" class="btn btn-outline-primary mt-3">Change email</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    

    

</body>
</html>