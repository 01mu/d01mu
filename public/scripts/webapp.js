var app = angular.module('app', ['ngRoute', 'ngResource']);
app.set('view engine', 'ejs');

    app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/view', {
        templateUrl: 'view',
        controller: 'view'
    })
    .when('/edit/:employeeId', {
        templateUrl: 'edit.ejs',
        controller: 'edit'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);
