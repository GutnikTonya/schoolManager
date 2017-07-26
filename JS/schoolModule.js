(function () {

    "use strict";
    // Creating the Module: 
    var module = angular.module("schoolModule", ['ngCookies']);
    //school controller
    module.controller("SchoolController", ["$scope", "$http", "$rootScope", "$timeout", '$cookies', function ($scope, $http, $rootScope, $timeout, $cookies) {





            //get all students
            $scope.getAllUsers = function () {
                $http({
                    method: 'GET',
                    url: 'NTier/API.php',
                    params: {command: "getAllUser", role: "student"}
                }).then(function successCallback(response) {

                    $scope.students = response.data;
                }, function errorCallback(err) {
                    console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                });

            };


            //get all courses
            $scope.getAllCourse = function () {
                $http({
                    method: 'GET',
                    url: 'NTier/API.php',
                    params: {command: "getAllCourses"}
                }).then(function successCallback(response) {

                    $scope.courses = response.data;
                }, function errorCallback(err) {
                    console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                });
            };


            //get one student by id
            $scope.getOneUser = function (id) {

                $http({
                    method: 'GET',
                    url: 'NTier/API.php',
                    params: {command: "getOneUser", userID: id}
                }).then(function successCallback(response) {


                    $scope.user = response.data;
                    $scope.userImage = response.data.imageFileName;
                }, function errorCallback(err) {
                    console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                });
            };



            //get one course by id
            $scope.getCourse = function (courseid) {

                $http({
                    method: 'GET',
                    url: 'NTier/API.php',
                    params: {command: "getOneCourse", courseID: courseid}
                }).then(function successCallback(response) {


                    $scope.currentCourse = response.data;
                }, function errorCallback(err) {
                    console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                });
            };




            //user courses ids array
            $scope.getUserCourses = function (userid) {

                $http({
                    method: 'GET',
                    url: 'NTier/API.php',
                    params: {command: "getUserCourse", userID: userid}
                }).then(function successCallback(response) {

                    $scope.userCourses = response.data;
                    $scope.getAllUserCoursesChecked();
                }, function errorCallback(err) {
                    console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                });
            };


            //get array all courses with parameter check
            $scope.getAllUserCoursesChecked = function () {

                $scope.arrAllCoursesChecked = [];
                var allCourses = $scope.courses;
                var userCourses = $scope.userCourses;
                for (var i = 0; i < allCourses.length; i++) {
                    $scope.arrAllCoursesChecked.push(allCourses[i]);
                    for (var j = 0; j < userCourses.length; j++) {



                        if (allCourses[i].id == userCourses[j].id) {
                            $scope.arrAllCoursesChecked[i].check = true;
                            break;
                        } else {

                            $scope.arrAllCoursesChecked[i].check = false;
                        }


                    }


                }

            };


            //function that checks if there was new input(image)
            $scope.filesChanged = function (elm) {
                $scope.files = elm.files;
                $scope.$apply();
            };




            //function update user parameters
            $scope.updateUserParameters = function () {

                var currentFileName;
                if ($scope.files == undefined) {
                    currentFileName = $scope.user.imageFileName;
                } else
                {
                    currentFileName = $scope.files[0].name;
                    var fd = new FormData();
                    fd.append('file', $scope.files[0]);
                    fd.append('name', $scope.files[0].name);
                    $http({
                        method: 'POST',
                        url: 'NTier/API.php',
                        params: {command: "uploadFile"},
                        data: fd,
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined, 'Process-Data': false}
                    }).then(function successCallback(response) {

                        console.log(response.data);
                    }, function errorCallback(err) {
                        console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                    });
                }

                $http({
                    method: 'POST',
                    url: 'NTier/API.php',
                    params: {command: "updateUser"},
                    data: {userID: $scope.user.id,
                        firstName: $scope.user.firstName,
                        lastName: $scope.user.lastName,
                        phone: $scope.user.phone,
                        email: $scope.user.email,
                        password: $scope.user.password,
                        role: $scope.role,
                        imageFileName: currentFileName},
                    headers: {'Content-Type': 'application/json'
                    }
                }).then(function successCallback(response) {
                    console.log(response.data);
                }, function errorCallback(err) {
                    console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                });



                if ($scope.role == 'student') {
                    var newUserCourseIDs = [];
                    var j = 0;

                    for (var i = 0; i < $scope.arrAllCoursesChecked.length; i++) {
                        if ($scope.arrAllCoursesChecked[i].check == true) {
                            newUserCourseIDs[j] = $scope.arrAllCoursesChecked[i].id;
                            j++;
                        }
                    }

                    $http({
                        method: 'POST',
                        url: 'NTier/API.php',
                        params: {command: "updateUserCourse"},
                        data: {userID: $scope.user.id,
                            newUserCourseIDs: newUserCourseIDs}
                    }).then(function successCallback(response) {
                        console.log(response.data);
                    }, function errorCallback(err) {
                        console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                    });
                }
                $timeout(function () {
                    $scope.getAllUsers();

                    $scope.MainContainerPage('summaryPage');
                }
                , 1000);
                //$scope.$apply();
            };





            //function that adds new user

            $scope.addNewUser = function () {

                var currentFileName;

                currentFileName = $scope.files[0].name;
                var fd = new FormData();
                fd.append('file', $scope.files[0]);
                fd.append('name', $scope.files[0].name);
                $http({
                    method: 'POST',
                    url: 'NTier/API.php',
                    params: {command: "uploadFile"},
                    data: fd,
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined, 'Process-Data': false}
                }).then(function successCallback(response) {

                    console.log(response.data);
                }, function errorCallback(err) {
                    console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                });




                $http({
                    method: 'POST',
                    url: 'NTier/API.php',
                    params: {command: "addUser"},
                    data: {
                        firstName: $scope.user.firstName,
                        lastName: $scope.user.lastName,
                        phone: $scope.user.phone,
                        email: $scope.user.email,
                        password: $scope.user.password,
                        role: $scope.role,
                        imageFileName: currentFileName},
                    headers: {'Content-Type': 'application/json'
                    }
                }).then(function successCallback(response) {
                    console.log(response.data);
                    if ($scope.role == 'student') {
                        var newUserCourseIDs = [];
                        var j = 0;
                        for (var i = 0; i < $scope.arrAllCoursesChecked.length; i++) {
                            if ($scope.arrAllCoursesChecked[i].check == true) {
                                newUserCourseIDs[j] = $scope.arrAllCoursesChecked[i].id;
                                j++;
                            }
                        }

                        $http({
                            method: 'POST',
                            url: 'NTier/API.php',
                            params: {command: "updateUserCourse"},
                            data: {userID: response.data,
                                newUserCourseIDs: newUserCourseIDs}
                        }).then(function successCallback(response) {
                            console.log(response.data);
                        }, function errorCallback(err) {
                            console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                        });
                    }
                }, function errorCallback(err) {
                    console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                });





                $timeout(function () {
                    $scope.getAllUsers();

                    $scope.MainContainerPage('summaryPage');
                }
                , 1000);
                //$scope.$apply();
            };




            //delete user

            $scope.delete = function () {

                $http({
                    method: 'POST',
                    url: 'NTier/API.php',
                    params: {command: "deleteUser"},
                    data: {userID: $scope.user.id}
                }).then(function successCallback(response) {
                    console.log(response.data);

                    $scope.getAllUsers();

                    $scope.MainContainerPage('summaryPage');

                }, function errorCallback(err) {
                    console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                });


            };


//Course users ids array
            $scope.getCourseUsers = function (courseid) {

                $http({
                    method: 'GET',
                    url: 'NTier/API.php',
                    params: {command: "getCourseUser", courseID: courseid}
                }).then(function successCallback(response) {

                    $scope.courseUsers = response.data;
                    console.log(JSON.stringify($scope.courseUsers));
                    //$scope.getAllUserCoursesChecked();
                    $scope.getCourseStudentsWithDetails();
                }, function errorCallback(err) {
                    console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                });



            };




            //get array course student with parameters
            $scope.getCourseStudentsWithDetails = function () {

                $scope.arrDetailsCourseStudents = [];

                var allUsers = $scope.students;

                var courseUsers = $scope.courseUsers;

                for (var i = 0; i < allUsers.length; i++) {

                    for (var j = 0; j < courseUsers.length; j++) {

                        if (allUsers[i].id == courseUsers[j].userID) {
                            $scope.arrDetailsCourseStudents.push(allUsers[i]);
                            break;
                        }

                    }

                }

            };





//function that adds new course

            $scope.addNewCourse = function () {

                var currentFileName;

                currentFileName = $scope.files[0].name;
                var fd = new FormData();
                fd.append('file', $scope.files[0]);
                fd.append('name', $scope.files[0].name);
                $http({
                    method: 'POST',
                    url: 'NTier/API.php',
                    params: {command: "uploadFile"},
                    data: fd,
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined, 'Process-Data': false}
                }).then(function successCallback(response) {

                    console.log(response.data);
                }, function errorCallback(err) {
                    console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                });

                $http({
                    method: 'POST',
                    url: 'NTier/API.php',
                    params: {command: "addCourse"},
                    data: {
                        courseName: $scope.currentCourse.name,
                        description: $scope.currentCourse.description,
                        imageFileName: currentFileName},
                    headers: {'Content-Type': 'application/json'
                    }
                }).then(function successCallback(response) {
                    console.log(response.data);
                }, function errorCallback(err) {
                    console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                });





                $timeout(function () {
                    $scope.getAllCourse();

                    $scope.MainContainerPage('summaryPage');
                }
                , 1000);
                //$scope.$apply();
            };


//function that update course parameters

            $scope.updateCourseParameters = function () {

                var currentFileName;
                if ($scope.files == undefined) {
                    currentFileName = $scope.currentCourse.imageFileName;
                } else
                {
                    currentFileName = $scope.files[0].name;
                    var fd = new FormData();
                    fd.append('file', $scope.files[0]);
                    fd.append('name', $scope.files[0].name);
                    $http({
                        method: 'POST',
                        url: 'NTier/API.php',
                        params: {command: "uploadFile"},
                        data: fd,
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined, 'Process-Data': false}
                    }).then(function successCallback(response) {

                        console.log(response.data);
                    }, function errorCallback(err) {
                        console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                    });
                }
                $http({
                    method: 'POST',
                    url: 'NTier/API.php',
                    params: {command: "updateCourse"},
                    data: {
                        courseID: $scope.currentCourse.id,
                        courseName: $scope.currentCourse.name,
                        description: $scope.currentCourse.description,
                        imageFileName: currentFileName},
                    headers: {'Content-Type': 'application/json'
                    }
                }).then(function successCallback(response) {
                    console.log(response.data);
                }, function errorCallback(err) {
                    console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                });





                $timeout(function () {
                    $scope.getAllCourse();

                    $scope.MainContainerPage('summaryPage');
                }
                , 1000);
                //$scope.$apply();
            };

//delete course

            $scope.deleteCourse = function () {

                $http({
                    method: 'POST',
                    url: 'NTier/API.php',
                    params: {command: "deleteCourse"},
                    data: {courseID: $scope.currentCourse.id}
                }).then(function successCallback(response) {
                    console.log(response.data);

                    $scope.getAllCourse();

                    $scope.MainContainerPage('summaryPage');

                }, function errorCallback(err) {
                    console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                });


            };


            //button save function that checks if we add new user or Edit user

            $scope.newOrAdd = function () {
                if ($scope.user.id == '') {
                    $scope.addNewUser();
                } else {
                    $scope.updateUserParameters();
                }
            };


            $scope.newCourseOrAddCourse = function () {
                if ($scope.currentCourse.id == '') {
                    $scope.addNewCourse();
                } else {
                    $scope.updateCourseParameters();
                }
            };





            //function activation

            if (($cookies.get('logedRole')) == 'teacher') {

                $rootScope.showIfTeacher = true;

            } else {

                $rootScope.showIfTeacher = false;

            }



            $scope.getAllUsers();
            $scope.getAllCourse();
            $scope.MainContainerView = "html/Summary.html";
            //function open page in the main container 

            $scope.showDelete = true;
            $scope.showTotalStudents = true;

            $scope.MainContainerPage = function (page, id) {

                switch (page) {

                    case "summaryPage":

                        $scope.MainContainerView = "html/Summary.html";
                        break;

                    case "AddEditStudent":

                        $scope.MainContainerView = "html/AddEditStudent.html";
                        //checking if there is id
                        if (id !== 'new') {
                            $scope.check = "NO";
                            $scope.showPic = true;
                            $scope.requireImage = false;
                            $scope.showDelete = true;
                        } else {
                            $scope.showDelete = false;
                            $scope.user = {};
                            $scope.user.id = "";
                            $scope.user.firstName = "";
                            $scope.user.lastName = "";
                            $scope.user.password = "";
                            $scope.user.email = "";
                            $scope.user.phone = "";
                            $scope.user.imageFileName = "";
                            $scope.role = "student";
                            $scope.arrAllCoursesChecked = $scope.courses;
                            $scope.requireImage = true;
                            for (var i = 0; i < $scope.arrAllCoursesChecked.length; i++) {
                                $scope.arrAllCoursesChecked[i].check = false;
                            }
                            $scope.showPic = false;
                        }


                        break;
                    case "DetailsStudent":
                        $scope.role = 'student';
                        $scope.getOneUser(id);
                        $scope.getUserCourses(id);
                        $scope.MainContainerView = "html/DetailsStudent.html";
                        break;
                    case "AddEditCourse":
                        $scope.MainContainerView = "html/AddEditCourse.html";
                        //checking if there is id
                        if (id !== 'new') {
                            if ($scope.courseUsers.length > 0) {
                                $scope.showDelete = false;
                            } else {
                                $scope.showDelete = true;
                            }
                            $scope.showPic = true;
                            $scope.requireImage = false;
                            $scope.showTotalStudents = true;
                        } else {
                            $scope.showDelete = false;
                            $scope.currentCourse = {};
                            $scope.currentCourse.id = "";
                            $scope.currentCourse.name = "";
                            $scope.currentCourse.description = "";
                            $scope.currentCourse.imageFileName = "";
                            $scope.requireImage = true;
                            $scope.showPic = false;
                            $scope.showTotalStudents = false;
                        }
                        break;
                    case "DetailsCourse":
                        $scope.getCourse(id);

                        $scope.getCourseUsers(id);

                        $scope.MainContainerView = "html/DetailsCourse.html";
                        break;
                }





            };
        }]);



    //login controller
    module.controller("LoginController", ["$scope", "$http", "$location", "$rootScope", '$cookies', function ($scope, $http, $location, $rootScope, $cookies) {

            //logInFunction

            $scope.logIn = function () {

                $http({
                    method: 'GET',
                    url: 'NTier/API.php',
                    params: {command: "login",
                    email: $scope.logInEmail,
                    password: $scope.logInPassword
                    }
                }).then(function successCallback(response) {

                    console.log(JSON.stringify(response.data));
                    var userToCheck = response.data;
                    if(userToCheck == 'we'){
                        alert("Wrong email");
                    }
                    else if(userToCheck== 'wp')
                    {
                        alert("Wrong password");
                    }
                    else{
                    var userName = userToCheck.firstName + " " + userToCheck.lastName;
                    var role = userToCheck.role;
                    var userImage = userToCheck.imageFileName;
                    
                    $cookies.put('logedIN', 'true');
                    $cookies.put('logedUserName', userName);
                    $cookies.put('logedRole', role);
                    $cookies.put('logedImage', userImage);

                    $location.path('/school');
                }
                }, function errorCallback(err) {
                    console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                });

            };

            


               






        }]);


















    //Administration controller
    module.controller("AdministrationController", ["$scope", "$http", "$rootScope", "$timeout", "$cookies", function ($scope, $http, $rootScope, $timeout, $cookies) {




            //get all teachers
            $scope.getAllUsers = function () {
                $http({
                    method: 'GET',
                    url: 'NTier/API.php',
                    params: {command: "getAllUser", role: "teacher"}
                }).then(function successCallback(response) {

                    $scope.teachers = response.data;
                }, function errorCallback(err) {
                    console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                });

            };



            //get one teacher by id
            $scope.getOneUser = function (id) {

                $http({
                    method: 'GET',
                    url: 'NTier/API.php',
                    params: {command: "getOneUser", userID: id}
                }).then(function successCallback(response) {


                    $scope.user = response.data;
                    $scope.userImage = response.data.imageFileName;
                }, function errorCallback(err) {
                    console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                });
            };


            //function that checks if there was new input(image)
            $scope.filesChanged = function (elm) {
                $scope.files = elm.files;
                $scope.$apply();
            };




            //function update user parameters
            $scope.updateUserParameters = function () {

                var currentFileName;
                if ($scope.files == undefined) {
                    currentFileName = $scope.user.imageFileName;
                } else
                {
                    currentFileName = $scope.files[0].name;
                    var fd = new FormData();
                    fd.append('file', $scope.files[0]);
                    fd.append('name', $scope.files[0].name);
                    $http({
                        method: 'POST',
                        url: 'NTier/API.php',
                        params: {command: "uploadFile"},
                        data: fd,
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined, 'Process-Data': false}
                    }).then(function successCallback(response) {

                        console.log(response.data);
                    }, function errorCallback(err) {
                        console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                    });
                }

                $http({
                    method: 'POST',
                    url: 'NTier/API.php',
                    params: {command: "updateUser"},
                    data: {userID: $scope.user.id,
                        firstName: $scope.user.firstName,
                        lastName: $scope.user.lastName,
                        phone: $scope.user.phone,
                        email: $scope.user.email,
                        password: $scope.user.password,
                        role: $scope.role,
                        imageFileName: currentFileName},
                    headers: {'Content-Type': 'application/json'
                    }
                }).then(function successCallback(response) {
                    console.log(response.data);
                }, function errorCallback(err) {
                    console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                });


                $timeout(function () {
                    $scope.getAllUsers();

                    $scope.MainContainerPage('summaryPage');
                }
                , 1000);
                //$scope.$apply();
            };





            //function that adds new user

            $scope.addNewUser = function () {

                var currentFileName;

                currentFileName = $scope.files[0].name;
                var fd = new FormData();
                fd.append('file', $scope.files[0]);
                fd.append('name', $scope.files[0].name);
                $http({
                    method: 'POST',
                    url: 'NTier/API.php',
                    params: {command: "uploadFile"},
                    data: fd,
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined, 'Process-Data': false}
                }).then(function successCallback(response) {

                    console.log(response.data);
                }, function errorCallback(err) {
                    console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                });




                $http({
                    method: 'POST',
                    url: 'NTier/API.php',
                    params: {command: "addUser"},
                    data: {
                        firstName: $scope.user.firstName,
                        lastName: $scope.user.lastName,
                        phone: $scope.user.phone,
                        email: $scope.user.email,
                        password: $scope.user.password,
                        role: $scope.role,
                        imageFileName: currentFileName},
                    headers: {'Content-Type': 'application/json'
                    }
                }).then(function successCallback(response) {
                    console.log(response.data);
                    if ($scope.role == 'student') {
                        var newUserCourseIDs = [];
                        var j = 0;
                        for (var i = 0; i < $scope.arrAllCoursesChecked.length; i++) {
                            if ($scope.arrAllCoursesChecked[i].check == true) {
                                newUserCourseIDs[j] = $scope.arrAllCoursesChecked[i].id;
                                j++;
                            }
                        }

                        $http({
                            method: 'POST',
                            url: 'NTier/API.php',
                            params: {command: "updateUserCourse"},
                            data: {userID: response.data,
                                newUserCourseIDs: newUserCourseIDs}
                        }).then(function successCallback(response) {
                            console.log(response.data);
                        }, function errorCallback(err) {
                            console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                        });
                    }
                }, function errorCallback(err) {
                    console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                });





                $timeout(function () {
                    $scope.getAllUsers();

                    $scope.MainContainerPage('summaryPage');
                }
                , 1000);
                //$scope.$apply();
            };




            //delete user

            $scope.delete = function () {

                $http({
                    method: 'POST',
                    url: 'NTier/API.php',
                    params: {command: "deleteUser"},
                    data: {userID: $scope.user.id}
                }).then(function successCallback(response) {
                    console.log(response.data);

                    $scope.getAllUsers();

                    $scope.MainContainerPage('summaryPage');

                }, function errorCallback(err) {
                    console.log("Failed to connect to server. Error: " + JSON.stringify(err));
                });


            };

            //button save function that checks if we add new user or Edit user

            $scope.newOrAdd = function () {
                if ($scope.user.id == '') {
                    $scope.addNewUser();
                } else {
                    $scope.updateUserParameters();
                }
            };



            //function activation
            $scope.getAllUsers();
            $scope.MainContainerView = "html/SummaryTeachers.html";


            $scope.MainContainerPage = function (page, id) {

                switch (page) {

                    case "summaryPage":

                        $scope.MainContainerView = "html/SummaryTeachers.html";
                        break;

                    case "AddEditTeacher":

                        $scope.MainContainerView = "html/AddEditTeacher.html";
                        //checking if there is id
                        if (id !== 'new') {
                            $scope.role = 'teacher';
                            $scope.getOneUser(id);
                            $scope.showPic = true;
                            $scope.requireImage = false;
                            $scope.showDelete = true;
                        } else {
                            $scope.showDelete = false;
                            $scope.user = {};
                            $scope.user.id = "";
                            $scope.user.firstName = "";
                            $scope.user.lastName = "";
                            $scope.user.password = "";
                            $scope.user.email = "";
                            $scope.user.phone = "";
                            $scope.user.imageFileName = "";
                            $scope.role = "teacher";
                            $scope.requireImage = true;
                            $scope.showPic = false;
                        }


                        break;

                }





            };





        }]);
})();