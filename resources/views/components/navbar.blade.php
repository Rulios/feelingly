<div>
    <!-- Simplicity is the essence of happiness. - Cedric Bledsoe -->

    <nav class="navbar navbar-expand-sm  navbar-light border-bottom ">
        <div class="container-fluid">

            <div class="mr-auto">
                <a href="/dashboard" class="navbar-brand ">
                    <img src="{{URL::asset('assets/logo-with-text.svg')}}" width="150" alt="Feelingly" class="img-responsive">
                </a>

            </div>



            <button class="navbar-toggler hidden-lg-up float-md-right ml-auto" type="button" data-toggle="collapse" data-target="#subItems" aria-controls="subItems" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            @if ($userLogged)
                <div class="collapse navbar-collapse justify-content-end" id="subItems">
                    <ul class="navbar-nav roboto-slab-font align-items-center ">

                        <li class="nav-item mx-3 BottomLineHoverAnimation">
                            <a href="/dashboard" class="text-decoration-none">Dashboard</a>
                        </li>

                        <li class="nav-item mx-3">
                            <a href="/profile/{{$alias}}" class="text-decoration-none ">
                                <x-profile-pic :alias="$alias" addClasses="" width="50" height="50"/>
                                <span class="mx-1 align-middle">
                                    Profile
                                </span>
                            </a>
                        </li>
        
                        <li class="nav-item mx-3">
                            <form method="POST" action="{{ route('logout') }}">
                                @csrf
                                <button type="submit" class="noDecorationButton BottomLineHoverAnimation" >
                                    {{ __('Log out') }}
                                </button>
                            </form>
                        </li>
                    </ul>
                </div>
            @else

                <div class="collapse navbar-collapse justify-content-end" id="subItems">
                    <ul class="navbar-nav roboto-slab-font align-items-center ">

                        <li class="nav-item mx-3 BottomLineHoverAnimation">
                            <a href="/" class="text-decoration-none">Log in</a>
                        </li>

                        <li class="nav-item mx-3 BottomLineHoverAnimation">
                            <a href="/register" class="text-decoration-none">Sign up</a>
                        </li>
                   
                    </ul>
                </div>

            @endif
            
            
        </div>
    </nav>

</div>