<div>
{{--     This components gets a generic object/array and 
    * renders it as a list of key-value pairs as a hidden input. 
    * 
    *  - The key is rendered as the name property of the input
    *  - The value is rendered as the value property of the input
 --}}

    @foreach ($collection as $key => $value)
        <input type="hidden" name="{{ $key }}" value="{{ $value }}">
    @endforeach 

</div>