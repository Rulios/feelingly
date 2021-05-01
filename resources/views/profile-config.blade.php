<!DOCTYPE html>
<html lang="en">
<head>

    <script src="{{ URL::asset("build/profile-config.js")}}"></script>

    @extends("partials.headers")

    <link rel="stylesheet" href="{{ URL::asset('css/profile.css')}}">


    <title>{{$alias}} | Feelingly</title>
</head>
<body class="container roboto-slab-font">

    <x-navbar />    

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
                            <img src="{{URL::asset("assets/avatar.svg")}}"
                                 alt="{{$alias}}" width="100" height="100" class="rounded-circle border p-1 mx-auto d-block" >

                                
                        </div>

                        
                    </div>

                </div>

                <div class="row">
                    <div class="col-lg-12 d-flex justify-content-center mt-3">
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
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
                                    
                                    <form action="{{route("profile.image.update")}}" method="POST" class="row p-3 fadeGreyWhenHover">
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
                                       
                                    </div>

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

            </div>
            <div class="tab-pane fade" id="list-changePassword" role="tabpanel" aria-labelledby="list-changePassword-list">Change Password</div>
            <div class="tab-pane fade" id="list-advanced" role="tabpanel" aria-labelledby="list-advanced-list">Advanced</div>
            </div>
        </div>
    </div>
    

    

</body>
</html>