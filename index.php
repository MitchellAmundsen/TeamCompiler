<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="league.css">
	<link rel="icon" type="image/png" href="images/favicon.png">

	<!-- load jquery -->
	<!--<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>-->
	<!-- load angular -->
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.js"></script>

</head>
<body>
	<div id="top">
		<div id="logo">
			<img src="images/logo.png" id="logoimage"/>
			<div id="search">
				<button id="searchbutton">Search</button>
				<input id="playersearch" list="Search players...">
			</div>
		</div>
		<div id="menu">
			<div id="embossed">
				<ul id="menuitems">
					<li><a ui-sref="home">Home</a></li>
					<li><a ui-sref="champions">Champions</a></li>
					<li><a ui-sref="profile">Profile</a></li>
					<li><a ui-sref="teams">Teams</a></li>
					<li><a ui-sref="dynamic">Comp</a></li>
				</ul>
			</div>
		</div>
		<div id="spacer"></div>
	</div>
		
	<div id="mainpage">
		<div ui-view></div>
	</div>

	<script src="js/script.js"/>
</body>
</html>