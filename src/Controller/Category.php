<?php
class Category
{
    protected $container;

    public function __construct($container) {
       $this->container = $container;
    }

    public function actionGet($request, $response, $args) {
        $categorys = $this->container['pwiki']->getCategory();
        return $response->withJson($categorys);
    }
}
