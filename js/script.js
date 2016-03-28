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

}])

.controller('homeCtrl', ['$scope', '$http', function($scope, $http){
	var mainPage = document.getElementById("mainpage");
	mainPage.innerHTML = "";
}])

.controller('championCtrl', ['$scope', '$http', function($scope, $http){
	createSearch();
	getChamps();

function createSearch(){
	var mainPage = document.getElementById("mainpage");
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
	mainpage.appendChild(div);
}

function getChamps(){
	var ajax = new XMLHttpRequest();
	ajax.onload = fillSearch;
	ajax.open("GET", "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=9de4b039-b7a1-431a-9969-714f68532ed3", true);
	ajax.send();
}

function fillSearch(){
	if(this.status == 200){
		var data = JSON.parse(this.responseText);
		var champs = data.data;
		var datalist = document.getElementById("championlist");
		for(var champ in champs){
			var option = document.createElement("option");
			option.innerHTML = champ;
			datalist.appendChild(option);
		}
	}
	showChamps(data, champs);
}

function showChamps(data, champs){
	var mainPage = document.getElementById("mainpage");
	var allChamps = document.createElement("div");
	allChamps.overflow = "hidden";
	allChamps.id = "allchamps";
	for(var champ in champs){
		var champDiv = document.createElement("div");
		var image = document.createElement("img");
		var name = document.createElement("p");
		image.onerror = defaultImage;
		image.src = "http://ddragon.leagueoflegends.com/cdn/6.5.1/img/champion/" + champ + ".png";
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

function filterChamps(){
	var options = document.querySelectorAll(".champ");
	for(var i = 0; i < options.length; i++){
		var searchName = this.value.replace(/\s+/g, "").toLowerCase();
		var champName = options[i].id.toLowerCase();
		if(champName.indexOf(searchName) > -1){
			console.log(champName);
			options[i].style.display = "";
		}else{
			options[i].style.display = "none";
		}
	}
}

function defaultImage(){
	this.src = "";
}
}])