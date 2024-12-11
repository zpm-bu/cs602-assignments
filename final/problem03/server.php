<?php

// I use the Intelephense language server, which just gave me a BUNCH of help
// on this. My PHP is pretty bad on its own.

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $corrected = [
        'name' => [
            'Gumby' => 'Mr. Jacky BooBoo Gumby',
        ],
        'age' => [
            70 => 78.4,
        ],
        'website' => [
            'https://www.gumbyworld.com/' => 'https://www.youtube.com/watch?v=wt87rvCPViQ',
        ],
        'height' => [
            '7.2 centimeters' => '7.0 inches',
        ],
        'sex' => [
            'Unknown' => 'Male',
        ],
    ];
    $json = file_get_contents('php://input');
    $data = json_decode($json, true); // <-- Zach: remember `true` for a hashmap!

    $name = $data['name'] ?? 'Gumby';
    $age = $data['age'] ?? 70;
    $website = $data['website'] ?? 'https://www.gumbyworld.com/';
    $height = $data['height'] ?? '7.2 centimeters';
    $sex = $data['sex'] ?? 'Unknown';

    $response = json_encode([
        'formal_name' => $corrected['name'][$name],
        'age' => $corrected['age'][$age],
        'website' => $corrected['website'][$website],
        'height' => $corrected['height'][$height],
        'sex' => $corrected['sex'][$sex],
    ]);

    http_response_code(200);
    echo $response;
}
