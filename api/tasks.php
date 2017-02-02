<?php
 

// get the HTTP method, path and body of the request, and overriden method
$method = $_SERVER['REQUEST_METHOD'];
$overMethod = $_SERVER['HTTP_X-HTTP-Method-Override'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true);
 
// connect to the oracle database
$pass = file_get_contents('../../../password.txt');
$link = oci_connect('ts340234', $pass, '');
 
// retrieve the key from the path
$key = array_shift($request)+0;

$columns = array_keys($input);
$values = array_values($input);
$set = '';
for ($i=0;$i<count($columns);$i++) {
  $set.=($i>0?',':'').'`'.$columns[$i].'`=';
  $set.=($values[$i]===null?'NULL':'"'.$values[$i].'"');
}

echo $overMethod;

// create SQL based on HTTP method
switch ($method) {
  case 'GET':
    $date = $_GET['date'];
    $sql = "select * from view_get_task_list where day = TO_DATE(" . "'" . $date . "', 'YYYY-MM-DD')"; 
    break;
  case 'POST':
    $over_method = $_POST[''];

   // $sql = "update to_do_items set done = 'Y' where id=" . $key; 
    break;
  case 'DELETE':
    break;
}



$stid = oci_parse($link, $sql);
oci_execute($stid);

$json = array();
while($data = oci_fetch_array($stid,OCI_ASSOC))
{
          $json[] = $data;
}

echo json_encode($json);

oci_close($link);

?>