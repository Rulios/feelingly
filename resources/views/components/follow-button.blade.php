

{{-- 
    This component is used to render and handle the button of the feature of Follows in a profile
    This file should also include JS code to handle the AJAX interaction, and not redirecting.
    --}}

<div class="row mt-2">
    <div class="col-lg-12">
        @if (!$isOwnProfile && !$isFollowing)
            <form action="{{route("profile.follow")}}" method="POST">
                @csrf
                <input type="hidden" name="followed_user_alias" value={{$tUserAlias}}>
                <button type="submit" class="btn btn-primary">Follow</button>                        
            </form>

        @elseif ($isFollowing) 

            <form action="{{route("profile.unfollow")}}" method="POST">
                @csrf
                <input type="hidden" name="followed_user_alias" value={{$tUserAlias}}> 
                <button type="submit" class="btn btn-outline-primary">Unfollow</button>                        
            </form>
        @endif

    </div>
</div>



    
    