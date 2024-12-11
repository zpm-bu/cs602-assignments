<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <form method="post" action="process.php">
            <?php $data = [ 'name' => 'Gumby',
                'age' => 70,
                'website' => 'https://www.gumbyworld.com/',
                'height' => '7.2 centimeters',
                'sex' => 'Unknown',
            ];
        ?>
            <!-- Dangerous: Not validating special chars b/c I'm in a rush -->
            <input name="name" value="<?php echo $data['name']; ?>">
            <input name="age" value="<?php echo $data['age'] ?>">
            <input name="website" value="<?php echo $data['website'] ?>">
            <input name="height" value="<?php echo $data['height'] ?>">
            <input name="sex" value="<?php echo $data['sex'] ?>">
            <button type="submit">Submit</button>
        </form>
    </body>
</html>
