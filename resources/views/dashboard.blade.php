<!DOCTYPE html>
<html lang="en">
<head>


    <script defer src="{{ URL::asset("build/dashboard.js")}}"></script>

    @extends("partials.headers")
    <link rel="stylesheet" href="{{ URL::asset('css/dashboard.css')}}">

    <title>Dashboard | Feelingly</title>
</head>
<body class="container">

    <x-navbar/>    

    <div id="root"></div>

    <x-hidden-values/>


</body>
</html>