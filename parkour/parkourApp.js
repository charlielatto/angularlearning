var app = angular.module('parkour',['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider,$urlRouterProvider){
	$stateProvider.state('backlog',{
			url: '/backlog',
			templateUrl: '/backlog.html',
			controller: 'MainCtrl'
		});
	$stateProvider.state('sprint',{
			url: '/sprint',
			templateUrl: '/sprint.html',
			controller: 'SprintCtrl'
		});
	
	$urlRouterProvider.otherwise('backlog');
}]);

app.controller('MainCtrl',[
'$scope',
'sprint',
'backlog',
'setUp',
function($scope,sprint,backlog,setUp){
	$scope.sprintNum = 1;
	
	$scope.backlog = backlog.tasks;
	$scope.sprint = sprint.tasks;
	
	$scope.initBacklogKanban = function(){
		$( function() {
			$( "#backlog" ).sortable({
				connectWith: ".connectedSort",
				receive: function( event, ui ) { setUp.updateElem(event,ui,$scope.backlog,$scope.sprint); },
				//stop: function( event, ui ) { alert('Stop!'); }
			}).disableSelection();
			
		} );
		
		$( function() {
			$( "#sprint" ).sortable({
				connectWith: ".connectedSort",
				receive: function( event, ui ) { setUp.updateElem(event,ui,$scope.sprint,$scope.backlog); },
				//stop: function( event, ui ) { alert('Stop!'); }
			}).disableSelection();
			
		} );
	};
	
	$scope.initBacklogKanban();
	
	$scope.applyPriority = function(priority){
		return setUp.applyPriority(priority);
	}
	
	$scope.popUp = function(task){
		setUp.popUp(task);
	};
}]);

app.controller('SprintCtrl',[
'$scope',
'sprint',
'setUp',
function($scope,sprint,setUp){
	$scope.placeholder = "Sprint";
	$scope.sprint = sprint.tasks;
	
	var updateElem = function(event,ui,board){
		var id = ui.item.data().$scope.task.id;
		//console.log(id);
		//console.log(board);
	}
	
	
	$scope.initSprintKanban = function(){
		$( function() {
			$( "#sprint" ).sortable({
				connectWith: ".connectedSort",
				update: function( event, ui ) {
					updateElem(event,ui);
				}
			}).disableSelection();
			
		} );
	};
	
	$scope.initSprintKanban();
	
	$scope.applyPriority = function(priority){
		return setUp.applyPriority(priority);
	}
	
	$scope.popUp = function(task){
		setUp.popUp(task);
	};
}]);


app.factory('backlog',[function(){
	var o ={
		tasks:[{id:1,title:"Task 1", time: 8, priority: 2},
		{id:2,title:"Task 2", time: 16, priority: 1},
		{id:3,title:"Task 3", time: 4, priority: 3},
		{id:4,title:"Task 4", time: 4, priority: 4}]
	};
	return o;
}]);

app.factory('sprint',[function(){
	var o ={
		tasks:[{id:5,title:"Task 5", time: 6, priority: 3},
		{id:6,title:"Task 6", time: 13, priority: 2},
		{id:7,title:"Task 7", time: 8, priority: 4},
		{id:8,title:"Task 8", time: 4, priority: 1}]
	};
	return o;
}]);

app.service('setUp',function(){	

	this.updateElem = function(event,ui,board,fromBoard){
		var id = ui.item.data().$scope.task.id;
		//console.log(id);
		//console.log(board);
		//console.log(fromBoard);
		var index = -1;
		for(var i = 0; i < fromBoard.length; i++) {
			if (fromBoard[i].id === id) {
				index = i;
				break;
			}
		}
		if(index === -1) {return;}
		board.push(fromBoard[index]);
		fromBoard.splice(index,1);
		//console.log("done");
		//console.log(board);
		//console.log(fromBoard);
	}
	
	this.applyPriority = function(priority){
		if (priority == 1){
			return "callout alert";
		} else if (priority == 2){
			return "callout warning";
		} else if (priority == 3) {
			return "callout success";
		} else {
			return "callout";
		}	
	};
	
	this.popUp = function(task){
		alert(task.title);
	};
});