<?php
 

// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true);
 
// connect to the mysql database
$pass = file_get_contents('../../../password.txt');
$link = oci_connect('ts340234', $pass, '');
 
// retrieve the table and key from the path
$table = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$key = array_shift($request)+0;



/*
// create SQL based on HTTP method
switch ($method) {
  case 'GET':
    $date = $_GET['date'];
    $sql = "select * from view_get_task_list where day = TO_DATE('".$date."', 'YYYY-MM-DD')"); 
    break;
  case 'PUT':
    $sql = "update `$table` set $set where id=$key"; 
    break;
  case 'POST':
    $sql = "insert into `$table` set $set"; 
    break;
  case 'DELETE':
    $sql = "delete `$table` where id=$key"; 
    break;
}
*/
$date = $_GET['date'];

echo $date;

//$sql = "select * from view_get_task_list where day = TO_DATE('" . $date . "', 'YYYY-MM-DD')"); 

/*
$stid = oci_parse($link, $sql);
oci_execute($stid);

$json = array();
while($data = oci_fetch_array($stid,OCI_ASSOC))
{
          $json[] = $data;
}

echo json_encode($json);

oci_close($link);
*/
?>