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

    public function actionPost($request, $response, $args) {
        if (isset($args['articleId'])) {
            $parsedBody = $request->getParsedBody();
            $result = $this->container['pwiki']->putMarkdownContent(
                $parsedBody['category'],
                $args['articleId'],
                $parsedBody['title'],
                $parsedBody['content']
            );
        }

        return $response->withJson($result);
    }

    public function actionDelete($request, $response, $args) {
        $result = [];
        if (isset($args['articleId'])) {
            $result = $this->container['pwiki']->delete(
                $args['articleId']
            );
        }
        return $response->withJson($result);
    }
}
