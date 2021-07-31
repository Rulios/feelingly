<!DOCTYPE html>
<html lang="en">
<head>

    <script defer src="{{ URL::asset("build/profile.js")}}"></script>

    @extends("partials.headers")

    <link rel="stylesheet" href="{{ URL::asset('css/profile.css')}}">


    <title>{{$alias}} | Feelingly</title>
</head>
<body class="container roboto-slab-font">


    <x-navbar />    

    <div class="text-center">
        <div class="row mt-5">
            <div class="col-lg-12" class="image">
            <x-profile-pic :alias="$alias" addClasses="d-block" width="100" height="100"/>
            </div>
        </div>

        @if (!$isOwnProfile)
            <div class="row mt-2">
                <div class="col-lg-12">
                    <form action="">
                        @csrf
                        <button type="submit" class="btn btn-primary">Follow</button>                        
                    </form>
                </div>
            </div>

        {{-- @elseif ($isFollowing) TODO--}}

        @else

        <div class="row mt-2">
            <div class="col-lg-12">
                <a href="{{route("profile.config")}}" class="btn btn-primary">
                    Config profile
                </a>
            </div>
        </div>

        @endif
    
        <div class="row">
            <div class="col-lg-12">
                {{$alias}}
            </div>
        </div>
    
        <div class="row">
            <div class="col-lg-12">
                {{$name}}
            </div>
        </div>

        <div class="row roboto-font" style="font-weight:500;">
            <div class="col-lg-12 description px-5">
                {{$description}}
            </div>
        </div>

        

        <div class="row mt-3">
            <div class="col">
                {{$numberOfMemoriesWritten}} Memories Written
            </div>
        </div>


    </div>

    <div id="root">

    </div>

    <x-hidden-values :t-user-alias="$t_user_alias"/>

</body>
</html>