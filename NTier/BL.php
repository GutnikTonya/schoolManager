<?php

require_once 'DAL.php';


//Queires for user table//
function addUser($firstName, $lastName,$phone, $email, $password, $role, $imageFileName) {
    $encrypted_password=password_hash($password,PASSWORD_DEFAULT);
    $sql = "insert into user(firstName,lastName,phone,email,password,role,imageFileName) values('$firstName','$lastName','$phone','$email','$encrypted_password','$role','$imageFileName')";
    echo(insert($sql));
}

function updateUser($id, $firstName, $lastName,$phone, $email, $password, $role, $imageFileName) {
    $encrypted_password=password_hash($password,PASSWORD_DEFAULT);
    $sql = "update user set firstName='$firstName', lastName='$lastName',phone='$phone',email='$email',password='$encrypted_password',role='$role',imageFileName='$imageFileName' where id=$id";
    echo(update($sql));
}

function deleteUser($id) {
    
    $sql = "DELETE FROM usercourses WHERE userID =$id";
    echo $sql;
    echo delete($sql);
    $sql = "delete from user where id=$id";
    echo $sql;
    echo delete($sql);
}

function getOneUser($id) {
    $sql = "select * from user where id=$id";
    return getObject($sql);
}


//using 'like' because role is a string
function getAllUsers($role) {
    $sql = "select * from user where role like '$role'";
    return getArray($sql);
}



function getUsers() {
    $sql = "select * from user";
    echo getArray($sql);
}






//Queries for course table
function addCourse($name,$description,$imageFileName) {
    $sql = "insert into course(name,description,imageFileName) values('$name','$description','$imageFileName')";
    insert($sql);
}

function updateCourse($id,$name,$description,$imageFileName) {
    $sql = "update course set name='$name', description='$description',imageFileName='$imageFileName' where id=$id";
    echo(update($sql));
}

function deleteCourse($id) {
    $sql = "delete from course where id='$id'";
    echo delete($sql);
}

function getOneCourse($id) {
    $sql = "select * from course where id=$id";
    return getObject($sql);
}

function getAllCourses() {
    $sql = "select * from course";
    return getArray($sql);
}

//Queries for usercourses table
function addUserCourse($userID,$courseID) {
    $sql = "insert into usercourses(userID,CourseID) values('$userID','$courseID')";
    insert($sql);
}

// id for the raw
function deleteUserCourse($id) {
    $sql = "delete from usercourses where id=$id";
    delete($sql);
}

function updateUserCourse($userID,$newUserCourseIDs) {
    $sql = "DELETE FROM usercourses WHERE userID = $userID";
    delete($sql);
    print_r($newUserCourseIDs);
    for($i=0;$i<sizeof($newUserCourseIDs);$i++){
    $sql = "insert into usercourses(userID,CourseID) values('$userID','$newUserCourseIDs[$i]')";
    echo('newID = '.insert($sql).'   ');
    }
}

function getUserCourse($userID) {
    $sql = "SELECT * FROM course WHERE id IN (select courseID from usercourses where userID=$userID)";
    return getArray($sql);
}

function getCourseUser($courseID) {
    $sql = "select * from usercourses where courseID=$courseID";
    return getArray($sql);
}

function getAllUserCourses($courseID) {
    $sql = "SELECT * FROM user WHERE id IN (select userID from usercourses where CourseID=$courseID)";
    return getArray($sql);
}

function login($email,$password){
    $sql = "SELECT * FROM user WHERE email like '$email'";
    $userToCheck = getObject2($sql);
    if(json_encode($userToCheck) == 'null'){
        echo "we";
    }
    else{
        if(password_verify($password,$userToCheck->password)){
            echo json_encode($userToCheck);
        }
        else{
            echo "wp";
        }
    }

}