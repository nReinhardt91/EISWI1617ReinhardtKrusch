var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http',function($scope, $http){
    console.log("Hello World Controller");
    
var refresh = function() {  
$http.get('/articlelist').success(function(response) {
    console.log("I got DATA");
    $scope.articlelist = response;
    $scope.article = "";
});
};
    
    refresh();
    
    $scope.addArticle = function() {
      console.log($scope.article);  
        $http.post('/articlelist', $scope.article).success(function(response){;
        console.log(response); 
        refresh();
                                                                              
                                                                            
    });
    
    };
}]);


