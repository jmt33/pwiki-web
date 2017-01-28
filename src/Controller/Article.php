<?php
class Article
{
    protected $container;

    public function __construct($container) {
       $this->container = $container;
    }

    public function actionGet($request, $response, $args) {
        $result = !empty($args['categoryId']) ? $this->getArticleByCategory($args['categoryId']) : $this->getArticles();
        return $response->withJson($result);
    }

    private function getArticles()
    {
        return $this->container['pwiki']->getArticles();
    }

    private function getArticleByCategory($categoryId)
    {
        return $this->container['pwiki']->getArticleByCategory($categoryId);
    }
}
