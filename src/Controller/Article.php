<?php
class Article
{
    protected $container;

    public function __construct($container) {
       $this->container = $container;
    }

    public function actionGet($request, $response, $args) {
        $article = $this->container['pwiki']->getMarkdownContentByKey($args['articleId']);
        return $response->write($article);
    }
}
