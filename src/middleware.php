<?php
// Application middleware

// e.g: $app->add(new \Slim\Csrf\Guard);

$container['pwiki'] = function($c) {
    $dir = __DIR__;
    $commentPlugin = "<div id=\"uyan_frame\"></div><script type=\"text/javascript\" src=\"http://v2.uyan.cc/code/uyan.js?uid=2101665\"></script>";
    $config = [
        'pageInfo' => [
            'title' => 'Mtao Blog',
            'keywords' => '',
            'description' => ''
        ],
        'markdownPath' => $dir.'/../wiki/Markdown/',
        'htmlPath' => $dir.'/../wiki/Html/',
        'htmlIndexFile' => $dir.'/../wiki/index.html',
        'commentPlugin' => $commentPlugin
    ];
    return new \Pwiki\Pwiki(
        $config
    );
};
