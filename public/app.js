function configFN($routeProvider){
    
    $routeProvider
        .when("/",{
            controller:"HomeController",
            templateUrl:"./pages/home.view.html"
        })
        .when("/MyProfile",{
            templateUrl:"./pages/my-profile.view.html"
        })
        .when("/Payment",{
            controller:"PaymentController",
            templateUrl:"./pages/payment.view.html"
        })
        .when("/comments",{
            controller:"CommentsController",
            templateUrl:"./pages/comments.view.html"
        })
        .when("/404",{
            templateUrl:"./pages/404.view.html"
        })
        .when("/posts/list/",{
            controller:"PostsListController",
            templateUrl:"./pages/PostViews/PostsList.view.html"
        })
        .when("/post/show/:id",{
            controller:"PostViewManageController",
            templateUrl:"./pages/PostViews/PostView.view.html"
        })
        .when("/post/add/",{
            controller:"PostAddController",
            templateUrl:"./pages/PostViews/PostAdd.view.html"
        })
        .when("/post/edit/:id",{
        controller:"PostEditController",
        templateUrl:"./pages/PostViews/PostEdit.view.html"
        })
        .otherwise({
            redirectTo:"/404"
        });
}

angular
    .module("mean-stack",["ngRoute","ngResource","angucomplete-alt","gm"])
    .config(configFN);



