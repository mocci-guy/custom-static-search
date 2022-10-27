
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>
        <input type="text" name="searchBar">
        <input type="button" value="Clear" name="clear-btn">  
        <input type="button" value="Search" name="search-btn">    
    </div>
    <div class="search-result">

    </div>

    <?php include_once "create-json.php"; ?>
    <script src="custom-search.js"></script>
</body>
</html>