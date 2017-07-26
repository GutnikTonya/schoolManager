(function () {

    "use strict";



    var appModule = angular.module("appModule", ["ngRoute", "schoolModule", "ngCookies"]);



    //controller for the index html
    appModule.controller('HeaderController', function ($scope, $location, $cookies, $http, $rootScope) {

        var LogedIN = $cookies.get('logedIN');
        var isTeacher=$cookies.get('logedRole');
        
        if (LogedIN != undefined) {
            $rootScope.showManu = true;
            
            if(isTeacher=='teacher')
            {
                
                $rootScope.showIfTeacher = true;
            }
            else
            {
              $rootScope.showIfTeacher = false;  
                
            }

        }
        
        
        
        $scope.logOut=function(){
            $cookies.remove("logedIN");
            $cookies.remove("logedUserName");
            $cookies.remove("logedRole");
            $cookies.remove("logedImage");
            $location.path('/login'); 
            
            
            
            
            
            
            
        };



    });









    appModule.config(["$routeProvider", function ($routeProvider,$cookies, $location, $rootScope) {

            $routeProvider
                    .when("/school", {

                        templateUrl: "html/School.html",
                        controller: "SchoolController",
                         resolve: {
                            check: function ($cookies, $location, $rootScope) {


                                var LogedIN = $cookies.get('logedIN');




                                if (LogedIN != undefined) {

                                    $rootScope.logedUserName = $cookies.get('logedUserName');
                                    $rootScope.logedrole = $cookies.get('logedRole');
                                    $rootScope.logedImage = $cookies.get('logedImage');
                                    $rootScope.showManu = true;
                                    $location.path('/school');

                                } else {
                                    $rootScope.showManu = false;

                                    $location.path('/login');    //redirect user to login page if not login.

                                }




                            }
                        }



                    })
                    .when("/login", {

                        templateUrl: "html/LogIn.html",
                        controller: "LoginController",
                        resolve: {
                            check: function ($cookies, $location, $rootScope) {


                                var LogedIN = $cookies.get('logedIN');




                                if (LogedIN != undefined) {

                                    $rootScope.logedUserName = $cookies.get('logedUserName');
                                    $rootScope.logedrole = $cookies.get('logedRole');
                                    $rootScope.logedImage = $cookies.get('logedImage');
                                    $rootScope.showManu = true;
                                    $location.path('/school');

                                } else {
                                    $rootScope.showManu = false;

                                    $location.path('/login');    //redirect user to login page if not login.

                                }




                            }
                        }

                    })
                    .when("/administration", {

                         resolve: {
                            check: function ($cookies, $location, $rootScope) {


                                var LogedIN = $cookies.get('logedIN');




                                if (LogedIN != undefined) {

                                    $rootScope.logedUserName = $cookies.get('logedUserName');
                                    $rootScope.logedrole = $cookies.get('logedRole');
                                    $rootScope.logedImage = $cookies.get('logedImage');
                                    $rootScope.showManu = true;
                                    $location.path('/administration');

                                } else {
                                    $rootScope.showManu = false;

                                    $location.path('/login');    //redirect user to login page if not login.

                                }




                            }
                        },
                        
                        templateUrl: "html/Administration.html",
                        controller: "AdministrationController"


                    })



                    .otherwise({

                        redirectTo: "/school"

                    });




        }]);















})();