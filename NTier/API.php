<?php

require_once 'BL.php';

$command = $_REQUEST["command"];

switch($command) {
    
    case "addUser":
        $data = json_decode(file_get_contents("php://input"));
        $firstName = $data->firstName;
        $lastName = $data->lastName;
        $phone= $data->phone;
        $email=$data->email;
        $password=$data->password;
        $role=$data->role;
        $imageFileName=$data->imageFileName;
        echo addUser($firstName, $lastName,$phone, $email, $password, $role, $imageFileName);
       
        break;
        
    case "updateUser":
        $data = json_decode(file_get_contents("php://input"));
        $firstName = $data->firstName;
        $lastName = $data->lastName;
        $phone= $data->phone;
        $email=$data->email;
        $password=$data->password;
        $role=$data->role;
        $imageFileName=$data->imageFileName;
        $userID=$data->userID;
        updateUser($userID, $firstName, $lastName,$phone, $email, $password, $role, $imageFileName);
        break;

    case "uploadFile":
        print_r($_FILES);
        move_uploaded_file($_FILES["file"]["tmp_name"],"../img/".$_FILES["file"]["name"]);        
        break;
    
    case "deleteUser":
        $data = json_decode(file_get_contents("php://input"));
        $userID = $data->userID;
        echo deleteUser($userID);
       
        break;

    case "getOneUser":
        $userID = $_GET["userID"];
        echo getOneUser($userID);
        break;
    
    //get all user by role
     case "getAllUser":
        $role=$_GET["role"];
       echo getAllUsers($role);
        break;
    
    //all users teachers and students
     case "getAllUsers":
       echo getUsers();
        break;
    
    
    
    
    
    
     case "addCourse":
        $data = json_decode(file_get_contents("php://input"));
        $name = $data->courseName;
        $description = $data->description;
        $imageFileName= $data->imageFileName;
        
        echo(addCourse($name,$description,$imageFileName));
       
        break;
    
        
    case "updateCourse":
        $data = json_decode(file_get_contents("php://input"));
        $name = $data->courseName;
        $description = $data->description;
        $imageFileName= $data->imageFileName;
        $courseID = $data->courseID;
        echo (updateCourse($courseID,$name,$description,$imageFileName));
        
        break;

    case "deleteCourse":
        $data = json_decode(file_get_contents("php://input"));
        $courseID = $data->courseID;
        echo (deleteCourse($courseID));
       
        break;

    case "getOneCourse":
        $courseID = $_GET["courseID"];
        echo getOneCourse($courseID);
        break;
    
     case "getAllCourses":
        
        echo getAllCourses();
        break;
    
    
    
    
    
    
    case "addUserCourse":
        $userID = $_POST["userID"];
        $courseID = $_POST["courseID"];
        
        addUserCourse($userID,$courseID);
               
        break;
    
        
    case "deleteUserCourse":
       $keyID = $_POST["keyID"];
        
        deleteUserCourse($keyID );      
        break;
    
    case "updateUserCourse":
        $data = json_decode(file_get_contents("php://input"));
        $userID = $data->userID;
        $newUserCourseIDs = $data->newUserCourseIDs;
        
        updateUserCourse($userID,$newUserCourseIDs);      
        break;
    

    case "getUserCourse":
        $userID = $_GET["userID"];
        echo getUserCourse($userID);
        break;
    
    
    
    case "getCourseUser":
        $courseID = $_GET["courseID"];
        echo getCourseUser($courseID);
        break;
    
     case "getAllUserCourses":
        
        echo getAllUserCourses();
        break;
    
    
    case "login":
       $email = $_GET["email"];
       $password = $_GET["password"];
       echo login($email,$password);
       break;    
    
}
