<div>

    {{-- 
        
        IMPORTANT NOTE: 
     * 
     * THIS COMPONENT GETS ALL THE "GET"s PARAMETERS AND RENDERS THEM AS HIDDEN INPUTS.
     * 
     * WHY IS THIS USEFUL? 
     * 
     *  - Because recently, I stepped in a edge case where I need to pass GET parameters through 
     *    a FORM to a different page.
        
        
        --}}


    @foreach ($_GET as $name => $value)
        <input type="hidden" name="{{$name}}" value="{{$_GET["$name"]}}">
    @endforeach


</div>