<?php
    $servername = "localhost";
    $username = "username";
    $password = "password";
    $dbname = "crux_locations";

    $option = $_GET["option"];

    $conn = new mysqli($servername, $username, $password, $dbname);

    switch ($option) {
        case "add_location":
            echo add_location();
        break;
        case "get_locations":
            echo get_locations();
        break;
        case "remove_location":
            echo remove_location();
        break;
        case "edit_location":   
            echo edit_location();
        break;
        default:
            echo "N/A";
        break;
    }

    $conn->close();

    function add_location(){

        global $conn;

        $location_name = $_GET["name"];
        $location_id_suffix = $_GET["id_suffix"];

        if ($conn->connect_error){
            return $conn->connect_error;
        }

        $sql = "INSERT INTO locations (name, id_suffix) VALUES ('" . $location_name . "', '" . $location_id_suffix . "')";

        if ($conn->query($sql) == TRUE){
            return "success";
        } else {
            return $conn->error;
        }
    }

    function get_locations() {

        global $conn;

        $sql = "SELECT name, id_suffix FROM locations";
        $result = $conn->query($sql);

        if ($conn->query($sql) == FALSE) return $conn->error;

        $rows = array();

        if ($result->num_rows > 0){
            while ($row = $result->fetch_assoc()) {
                array_push($rows, array($row["name"], $row["id_suffix"]));
            }

            return json_encode($rows);
        } else {
            return "0 results";
        }
    }

    function remove_location() {

        global $conn;

        $location_name = $_GET["name"];

        $sql = "DELETE FROM locations WHERE name='" . $location_name . "'";

        if ($conn->query($sql) == TRUE){
            return "success";
        } else {
            return $conn->error;
        }
    }

    function edit_location() {
        
        global $conn;

        $location_name = $_GET["name"];
        $location_id_suffix = $_GET["id_suffix"];

        $sql = "UPDATE locations SET id_suffix='" . $location_id_suffix . "' WHERE name = '" . $location_name . "'";

        if ($conn->query($sql) == TRUE){
            return "success";
        } else {
            return $conn->error;
        }
    }
?>