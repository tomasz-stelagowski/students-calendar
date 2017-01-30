
<?php


echo "Hello World";
$pass = file_get_contents('../../password.txt')
$conn = oci_connect('ts340234', '', '');
if (!$conn) {
    echo "dupa";
    $e = oci_error();
    trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
}

echo "yes";

$stid = oci_parse($conn, 'select * from user_tables');

echo $stid;
oci_execute($stid);
echo $stid;

echo "<table border='1'>\n";
while ($row = oci_fetch_array($stid, OCI_BOTH)) {
    echo "<tr>\n";
    foreach ($row as $item) {
        echo "    <td>" . ($item !== null ? htmlentities($item, ENT_QUOTES) : "&nbsp;") . "</td>\n";
    }
    echo "</tr>\n";
}
echo "</table>\n";
?>