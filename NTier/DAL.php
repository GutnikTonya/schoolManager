<?php

function connect() {
    
    // Create connection to the database: 
    $connection = mysqli_connect("localhost", "root", "", "project4");

    
    // Check if connection succeeded: 
    if(mysqli_connect_errno($connection)) { // If there is an error - returns true if there is an error.
        die("Failed to connect to the database. Error: " . mysqli_connect_error());
    }
    
    // Supporting Hebrew: 
    mysqli_set_charset($connection, "utf8");
    
    return $connection;
}

function insert($sql) {
    $connection = connect();
    mysqli_query($connection, $sql);
    $newID = mysqli_insert_id($connection); // Get the new created id by the database.
    mysqli_close($connection);
    echo $newID;
}

function update($sql) {
    $connection = connect();
    mysqli_query($connection, $sql);
    $affectedRows = mysqli_affected_rows($connection); // Get the number of rows affected.
    mysqli_close($connection);
    return $affectedRows;
}

function delete($sql) {
    $connection = connect();
    mysqli_query($connection, $sql);
    $affectedRows = mysqli_affected_rows($connection); // Get the number of rows affected.
    mysqli_close($connection);
    return $affectedRows;
}

function getObject($sql) {
    $connection = connect(); // Open connection.
    $result = mysqli_query($connection, $sql); // Execute sql and get back the select result.
    $obj = mysqli_fetch_object($result); // Extract the one and only object.
    mysqli_close($connection); // Close connection.
    return json_encode($obj); // Convert to JSON and return it.
}

function getObject2($sql) {
    $connection = connect(); // Open connection.
    $result = mysqli_query($connection, $sql); // Execute sql and get back the select result.
    $obj = mysqli_fetch_object($result); // Extract the one and only object.
    mysqli_close($connection); // Close connection.
    return $obj; 
}

function getArray($sql) {
    $connection = connect(); // Open connection.
    $result = mysqli_query($connection, $sql); // Execute sql and get back the select result.
    $obj = mysqli_fetch_object($result); // Extract the first object.
    $arr = array(); // Create empty array.
    while($obj) { // Run while there is data
        $arr[] = $obj; // Add data to the array.
    $obj = mysqli_fetch_object($result); // Extract the next object.
    }
    mysqli_close($connection); // Close connection.
    return json_encode($arr); // Convert to JSON and return it.
}

