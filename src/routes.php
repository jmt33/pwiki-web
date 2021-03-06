<?php
// Routes

$app->get('/', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});


//获取分类
$app->get('/categorys', function($request, $response, $args) {
    $controller = new Category($this);
    return $controller->actionCategory($request, $response, $args);
});

//获取文章
$app->get('/categorys/{categoryId}/articles', function($request, $response, $args) {
    $controller = new Category($this);
    return $controller->actionArticle($request, $response, $args);
});

$app->get('/articles/{articleId}', function($request, $response, $args) {
    $controller = new Article($this);
    return $controller->actionGet($request, $response, $args);
});

$app->post('/articles[/{articleId}]', function($request, $response, $args) {
    $controller = new Article($this);
    return $controller->actionPost($request, $response, $args);
});

$app->delete('/articles[/{articleId}]', function($request, $response, $args) {
    $controller = new Article($this);
    return $controller->actionDelete($request, $response, $args);
});

//$app->get('/categorys', 'Category:actionGet');
