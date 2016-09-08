Array.prototype.collate = function(collateSize) {
    var collatedList = [];

    if (collateSize <= 0) {
        return [];
    }
    angular.forEach(this, function(item, index) {
        if (index % collateSize === 0) {
            collatedList[Math.floor(index / collateSize)] = [item];
        } else {
            collatedList[Math.floor(index / collateSize)].push(item);
        }
    });

    return collatedList;
};

var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);

myApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'allposts.htm',
        controller: 'PostsController'
    }).when('/posts', {
        templateUrl: 'posts.htm',
        controller: 'PostController'
    }).when('/addpost', {
        templateUrl: 'addpost.htm',
        controller: 'AddController'
    }).otherwise({
        redirectTo: '/'
    });
});

myApp.controller('PostsController', function($scope) {});

myApp.controller('PostController', function($scope) {});

myApp.controller('AddController', function($scope) {});


myApp.controller('controller', function($scope, $http) {
    $scope.apptitle = "Kansi app";

    $http({
        method: 'GET',
        url: "http://jsonplaceholder.typicode.com/posts"
    }).then(function(response) {
        $scope.posts = response.data;
        $scope.viewby = 9;
        $scope.totalItems = $scope.posts.length;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        $scope.maxSize = 5;
        $scope.collatedPosts = getCollatedPosts($scope.posts);
        $scope.newPost = {};


        function getCollatedPosts(posts) {
            if (!posts) {
                return [];
            }

            var paginatedPosts = posts.slice((($scope.currentPage - 1) * $scope.itemsPerPage), (($scope.currentPage) * $scope.itemsPerPage));
            return paginatedPosts.collate(3);
        }

        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.setItemsPerPage = function(num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first page
            $scope.collatedPosts = getCollatedPosts($scope.posts);
        };

        $scope.pageChanged = function(currentPage) {
            $scope.currentPage = currentPage;
            $scope.collatedPosts = getCollatedPosts($scope.posts);
        };
        $scope.addPost = function() {
            $http.post("http://jsonplaceholder.typicode.com/posts", {
                    title: $scope.newPost.title,
                    body: $scope.newPost.body,
                    usrId: 1
                })
                .success(function(data, status, headers, config) {
                    console.log(data);
                    $scope.posts.push($scope.newPost);
                    $scope.newPost = {};
                })
                .error(function(error, status, headers, config) {
                    console.log(error);
                });
        };
    });


    $scope.alerts = [];

    $scope.msg = "Well done! Your post was added";

    $scope.addAlert = function(msg, type) {
        $scope.alerts.push({
            msg: msg,
            type: type
        });
    };

});