<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Feelingly')
<img src="{{URL::asset('assets/logo-with-text.svg')}}" class="logo" alt="Feelingly Logo">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
