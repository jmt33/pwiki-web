<?php
class Category
{
    protected $container;

    public function __construct($container) {
       $this->container = $container;
    }

    public function actionCategory($request, $response, $args) {
        $categorys = $this->container['pwiki']->getCategory();
        return $response->withJson($categorys);
    }

    public function actionArticle($request, $response, $args)
    {
        $result = !empty($args['categoryId']) ? $this->_getArticleByCategory($args['categoryId']) : $this->_getArticles();
        return $response->withJson($result);
    }

    private function _getArticles()
    {
        return $this->container['pwiki']->getArticles();
    }

    private function _getArticleByCategory($categoryId)
    {
        return $this->container['pwiki']->getArticleByCategory($categoryId);
    }
}
