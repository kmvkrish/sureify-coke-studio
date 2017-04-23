var app = angular.module("SureifyCokeStudio", ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
	
	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: 'list-songs.html',
		controller: 'ListSongsController',
		title: 'Sureify - Coke Studio'
	})
	.state('activity', {
		url: '/activity',
		templateUrl: 'activity-history.html',
		controller: 'ActivityHistoryController',
		title: 'Activity History'
	});
	
	$urlRouterProvider.otherwise('/');
	
}]);