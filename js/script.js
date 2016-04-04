'use strict';

angular.module('TeamCompiler', ['ui.router'])
.config(function($stateProvider){
	//creates a controller for each partial
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'partials/home.html',
			controller: 'homeCtrl'
		})
		.state('champions', {
			url: '/champions',
			templateUrl: 'partials/champions.html',
			controller: 'championCtrl'
		})
		.state('dynamic', {
			url: '/dynamicqueue',
			templateUrl: 'partials/dynamic.html'
		})
		.state('profile', {
			//questionable on how we implement user IDs
			url: '/profile',
			templateUrl: 'partials/profile.html',
			controller: 'profileCtrl'
		})
		.state('teams', {
			url: '/teams',
			templateUrl: 'partials/team.html'
		})
})

//controllers acts as different scrips for each state (i believe)
.controller('profileCtrl', ['$scope', '$http', function($scope, $http){
	var mainPage = document.getElementById("contents");
	mainPage.innerHTML = "";
}])

.controller('homeCtrl', ['$scope', '$http', function($scope, $http){
	var mainPage = document.getElementById("contents");
	mainPage.innerHTML = "";
}])

.controller('championCtrl', ['$scope', '$http', function($scope, $http){
	//create search bar
	createSearch();

	//load champions
	getChamps();

	//Adds elements for search bar into main page
	//Runs filterChamps function when something is typed in search bar
	function createSearch(){
		var mainPage = document.getElementById("contents");
		mainPage.innerHTML = "";
		var div = document.createElement("div");
		var input = document.createElement("input");
		var datalist = document.createElement("datalist");
		div.id = "championsearch";
		datalist.id="championlist";
		input.placeholder = "search champion...";
		input.type = "search";
		input.setAttribute("list", "championlist");
		input.oninput = filterChamps;
		div.appendChild(input);
		div.appendChild(datalist);
		mainPage.appendChild(div);
	}

	//Gets all basic champion json data from league static API
	//Runs fillSearch function when request is loaded
	function getChamps(){
		var ajax = new XMLHttpRequest();
		ajax.onload = showChamps;		//lets showChamps function do stuff with the data only once it has loaded
		ajax.open("GET", 
				  "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=9de4b039-b7a1-431a-9969-714f68532ed3",
				   true);
		ajax.send();
	}

	//loads picture and name for each champion to mainpage
	function showChamps(){
		if(this.status == 200){
			var data = JSON.parse(this.responseText);
			var champs = data.data;
			var mainPage = document.getElementById("contents");
			var allChamps = document.createElement("div");
			allChamps.overflow = "hidden";
			allChamps.id = "allchamps";

			//champ represents json object for a single champion
			//makes a div containing relevant info for each champion
			for(var champ in champs){
				var champDiv = document.createElement("div");
				var image = document.createElement("img");
				var name = document.createElement("p");
				image.onerror = defaultImage;
				image.onmouseover = champHover;
				image.onmouseout = champOut;													//if image src has an error run defaultImage function
				image.src = "http://ddragon.leagueoflegends.com/cdn/6.5.1/img/champion/" + 
				             champ + ".png";													//uses league API for each champion image
				image.className = "champpic";
				name.className = "champname";
				name.innerHTML = data.data[champ].name;
				champDiv.className = "champ";
				champDiv.id = champ;
				champDiv.appendChild(image);
				champDiv.appendChild(name);
				allChamps.appendChild(champDiv);
			}
			mainPage.appendChild(allChamps);
		}
	}

	//Makes champions searchable
	//Only displays champions that match the search string
	//All other champs are hidden until search is cleared
	function filterChamps(){
		var options = document.querySelectorAll(".champ");
		for(var i = 0; i < options.length; i++){
			var searchName = this.value.replace(/\s+/g, "").toLowerCase();	//Removes spaces from search and makes search lowercase
			var champName = options[i].id.toLowerCase();					//Makes names from champions lowercase
			if(champName.indexOf(searchName) > -1){							//Check if champ name contains search name
				options[i].style.display = "";
			}else{
				options[i].style.display = "none";
			}
		}
	}

	//Runs if there is an error getting a champion immage from league API
	//Makes the image source empty (will later replace with default image)
	function defaultImage(){
		this.src = "";
	}

	function champHover(){
		this.style.border = "2px black solid";
		this.style.height = "76px";
		this.style.width = "76px";
		this.style.cursor = "pointer";
	}

	function champOut(){
		this.style.border = "none";
		this.style.height = "80px";
		this.style.width = "80px";
	}
}])