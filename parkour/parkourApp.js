var app = angular.module('parkour',[]);

app.factory('backlog',[function(){
	var o ={
		tasks:[]
	};
	return o;
}]);

app.factory('sprint',[function(){
	var o ={
		tasks:[]
	};
	return o;
}]);

app.controller('MainCtrl',[
'$scope',
'sprint',
'backlog',
function($scope){
	$scope.title= "Parkour";
	$scope.sprintNum = 1;
	$scope.backlog = [{title:"Task 1", time: 8, priority: 2},
		{title:"Task 2", time: 16, priority: 1},
		{title:"Task 3", time: 4, priority: 3},
		{title:"Task 4", time: 4, priority: 4}];
	
	$scope.sprint = [{title:"Task 5", time: 6, priority: 3},
		{title:"Task 6", time: 13, priority: 2},
		{title:"Task 7", time: 8, priority: 4},
		{title:"Task 8", time: 4, priority: 1}];
		
	$scope.update = function(event,ui){
		var data = ui.item.data().$scope.task;
		console.log(data);
	}
	
	$scope.initKanban = function(){
		$( function() {
			$( "#backlog,#sprint" ).sortable({
				connectWith: ".connectedSort",
				update: function( event, ui ) {
					$scope.update(event,ui);
				}
			}).disableSelection();
			
		} );
	};
	
	$scope.initKanban();
	
	$scope.applyPriority = function(priority){
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
	
	$scope.popUp = function(task){
		alert(task.title);
	};
}]);