var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http',function($scope, $http){
  console.log("Hello World Controller");

  var refresh = function() {
    console.log("test1");
    $http.get('/articlelist').success(function(response) {
      console.log("I got DATA");
      $scope.articlelist = response;
      $scope.article = "";
    });
  };

  refresh();

  $scope.addArticle = function() {
    console.log($scope.article);
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    $http.post('/articlelist', $scope.article).success(function(response){
      console.log($scope.article);
      refresh();
    });
    
  };

    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/articlelist/' + id);
        refresh();
   };

//    $scope.removeAll = function(article){    
//        console.log($scope.article);
//        $http.delete('/articlelist');
//        refresh();
//    }
}]);
