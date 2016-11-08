//From: https://thinkster.io/mean-stack-tutorial

var app = angular.module('flapperNews',['ui.router']);

app.factory('posts',[function(){
	var o ={
		posts:[]
	};
	return o;
}]);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider,$urlRouterProvider){
	$stateProvider.state('home',{
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		});
	$stateProvider.state('posts',{
			url: '/posts/{id}',
			templateUrl: '/posts.html',
			controller: 'PostsCtrl'
		});
	
	$urlRouterProvider.otherwise('home');
}]);

app.controller('MainCtrl',[
'$scope',
'posts',
function($scope,posts){
	$scope.test = "Hello World!";
	$scope.posts = posts.posts;
	/*[
	{title:'Post 1', upvotes: 5},
	{title:'Post 2', upvotes: 2},
	{title:'Post 3', upvotes: 15},
	{title:'Post 4', upvotes: 9},
	{title:'Post 5', upvotes: 4},
	];*/
	
	$scope.addPost = function() {
		if(!$scope.title || $scope.title === ''){return;}
		$scope.posts.push({
			title: $scope.title,
			upvotes:0,
			link: $scope.link,
			comments: [
				{author: 'Joe', body: 'Cool post!', upvotes: 0},
				{author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
			]
		});
		$scope.title = '';
		$scope.link = '';
	};
	
	$scope.incrementUpvotes = function(post){
		post.upvotes += 1;
	};
}]);

app.controller('PostsCtrl',[
'$scope',
'$stateParams',
'posts',
function($scope,$stateParams,posts){
	$scope.post = posts.posts[$stateParams.id];
	
	$scope.addComment = function(){
		if($scope.body === '') { return; }
		$scope.post.comments.push({
			body: $scope.body,
			author: 'user',
			upvotes: 0
		});
	
  $scope.body = '';
  };
  
  $scope.incrementUpvotes = function(comment){
		comment.upvotes += 1;
	};

}]);

