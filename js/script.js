'use strict';

angular.module('TeamCompiler', ['ui.router'])
.config(function($stateProvider){
	//creates a controller for each partial
	$stateProvider
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
			templateUrl: 'partials/profile.html'
			controller: 'profileCtrl'
		})
		.state('team', {
			url: '/teamcomps',
			templateUrl: 'partials/team.html'
		})
})

//controllers acts as different scrips for each state (i believe)
.controller('profileCtrl', ['$scope', '$http', function($scope, $http){

}])