<?php

$directory = "articles/";
$pages = scandir($directory);
array_splice($pages, 0, 2);
$json_array = [];

for ($i = 0, $size = count($pages); $i < $size; ++$i) { 
    $string = str_replace(".html", "", $pages[$i]);
    $object = new stdClass();
    $object->filename = $string;
    array_push($json_array, $object);
    #var_dump(json_encode($object));
}

$ready_to_push = json_encode($json_array);
file_put_contents('article-list.json', $ready_to_push);
var_dump(json_encode($json_array));

#$value = "hello world";
#var_dump($json)
?>