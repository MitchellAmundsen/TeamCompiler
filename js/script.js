'use strict';

angular.module('TeamCompiler', ['ui.router'])
.config(function($stateProvider){
	//creates a controller for each partial
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'partials/home.html'
		})
		.state('champions', {
			url: '/champions',
			templateUrl: 'partials/champions.html'
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