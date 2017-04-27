angular.module('mean-stack')

    .controller('PostsListController', ['$scope','$http','$routeParams','$location', function ($scope, $http, $routeParams,$location) {
        $http({
            method : "GET",
            url : "/api/posts/"
        }).then(function mySucces(response) {
            $scope.posts = response.data;
            console.log($scope.posts);
        }, function myError(response) {
            console.log(response.statusText);
        });
    }])
    .controller('PostViewManageController', ['$scope','$http','$routeParams','$location', function ($scope, $http, $routeParams,$location) {
        $http({
            method : "GET",
            url : "/api/posts/"+$routeParams.id
        }).then(function mySucces(response) {
            $scope.post = response.data;
            console.log($scope.post);
        }, function myError(response) {
            console.log(response.statusText);
        });
    }])




.controller('PostAddController', ['$scope', '$http', '$routeParams', '$location', function ($scope, $http, $routeParams, $location) {
    $scope.addPost = function () {
        var data = {
            title: $scope.title,
            postcontent: $scope.content,
            category: $scope.category
        };
        $http.post('/api/posts/', data).success(function (data, status) {
            console.log(status);
        });
        $location.path('/posts/list');
    };
    $scope.categories = postcategories();
}]);

function postcategories() {
    return [
            { name: 'Events'},
            { name: 'Accidents'},
            { name: 'Divers'}
        ];
    }


