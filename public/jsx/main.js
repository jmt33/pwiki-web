class Header extends React.Component {
    render() {
        var _this = this;
        return (
            <header>
                <nav>
                    <ul className="nav navbar-top-links">
                        <li>
                            <button type="button" onClick = {this.handleWrite.bind(this)} title="写" className="btn btn-default">
                                <span className="glyphicon glyphicon-pencil"></span>
                            </button>
                        </li>
                        <li>
                            <button type="button" onClick = {this.handleSync.bind(this)} title="同步" className="btn btn-default">
                                <span className="glyphicon glyphicon-refresh"></span>
                            </button>
                        </li>
                        <li>
                            <button type="button" onClick = {this.handleClear.bind(this)} title="清空" className="btn btn-default">
                                <span className="glyphicon glyphicon-flash"></span>
                            </button>
                        </li>
                        <li>
                            <button type="button" onClick = {this.handleClear.bind(this)} title="删除" className="btn btn-default">
                                <span className="glyphicon glyphicon-trash"></span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }

    handleClear(event) {
        //暂使用比较low的方式
        $('#markdown').val('');
        $('#htmlArea div').empty();
    }

    handleWrite(event) {
        $('.sideinfo ul li').removeClass('active');
        pubsub.publish('newarticle', true);
        this.handleClear(event);
    }

    handleSync(event) {
        var title = $('#htmlArea').find('h1').eq(0).text(),
            _this = this,
            category = '',
            articleKey = '',
            data;
        if (title != '') {
            category = $('.sidenav .active').text();
            if (category == 0) {
                alert('必须选中分类');
                return false;
            }
            articleKey = $('.sideinfo .active').attr('data-key');
            data = {
                title: title,
                time: articleKey,
                category: category,
                content: $('#markdown').val()
            };
            if (this.state && this.state.time) {
                data.time = this.state.time;
            }
            $.post('/api.php?action=sync', data, function(data) {
                _this.setState({key: data});
                pubsub.publish('listchange', true);
            });
        } else {
            alert('请输入正确格式的文档');
        }
    }
}


class Category extends React.Component {
    constructor() {
        super();
        this.state = {
            category_id: '0',
            article: []
        };
    }

    componentWillMount() {
        var _this = this;
        $.ajax({
            url: '/categorys',
            datatype: "json",
            async: false,
            type: 'get',
            success: function (data) {
                _this.setState({value: data});
            }
        });

        this.fetchArticle(this.state.category_id);
    }

    componentDidMount() {
        var _this = this;
        pubsub.subscribe('listchange', function(topics, key) {
            _this.fetchArticle(_this.state.category_id);
        });

        pubsub.subscribe('newarticle', function(topics, key) {
            _this.state.article.unshift(
                <li data-key='' onClick={_this.articleChange.bind(_this)}> ss</li>
            );
            _this.setState({
                article: _this.state.article
            });
        });
    }

    handleChange(event) {
        $(event.target).addClass('active').siblings('li').removeClass('active');
        this.fetchArticle(event.target.getAttribute('data-id'));
    }

    articleChange(event) {
        let value = event.target.getAttribute('data-key'),
            _this = this;
        $(event.target).addClass('active').siblings('li').removeClass('active');
        if (value != 0) {
            $.get('/api.php?action=markdown&key=' + value, function(data) {
                $('#markdown').val(data.content);
                localStorage.articlekey=value;
                pubsub.publish('articlechange', data.content);
            });
        } else {
            $('#markdown').val(`#Hello`);
            pubsub.publish('articlechange', `#Hello`);
        }
    }

    fetchArticle(category_id) {
        var _this = this;
        $.ajax({
            url: '/categorys/' + category_id + '/articles',
            datatype: "json",
            async: false,
            type: 'get',
            success: function (data) {
                var items = [];
                console.log(typeof data);
                data.forEach(function(value) {
                    items.push(<li data-key={value['key']} onClick={_this.articleChange.bind(_this)}>{value['title']}</li>);
                });
                _this.setState({article: items.sort(function(a, b) {
                    return b - a;
                })});
            }
        });
    }

    componentDidUpdate() {
        $('.sideinfo li:first').addClass('active');
    }

    render() {
        var _this = this;
        return (
            <aside>
            <nav className = "sidenav">
                <ul>
                    <li className='title'>分类</li>
                    <li className='active' onClick={_this.handleChange.bind(_this)} data-id='0'>所有</li>
                    {
                        _this.state.value.map(function(option, i) {
                            return <li onClick={_this.handleChange.bind(_this)} data-id={option}>{option}</li>;
                        })
                    }
                </ul>
            </nav>
            <nav className = "sideinfo">
                <ul>
                    {_this.state.article}
                </ul>
            </nav>
            </aside>
       );
    }
}

class Markdown extends React.Component {
    constructor() {
        super();
        this.state = {
            converter: new showdown.Converter(),
            value: `Hello, World!\n===\n---\n# Write `,
        };
    }
    componentDidMount() {
        var _this = this;
       // 订阅ScoreItem的删除事件
       pubsub.subscribe('articlechange', function(topics, content){
           _this.setState({value: content})
       });
    }

    change(topics, content) {
        this.setState({ value: content });
    }

    createMarkup() {
        return {
            __html: this.state.converter.makeHtml(this.state.value)
        };
    }

  handleChange(event) {
      localStorage.articlecontent=event.target.value;
      this.setState({ value: event.target.value });
  }

  render() {
    return (
        <div className='markdown-container'>
            <textarea type='text' className="markdown-write" defaultValue={this.state.value} onChange={this.handleChange.bind(this)} id='markdown'></textarea>
            <div id='htmlArea' className='markdown-previewer'>
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>
        </div>
    );
  }
}

class App extends React.Component {
    render() {
        return (
            <div className='container-fluid'>
                <Header time='2016'/>
                <Category/>
                <Markdown/>
            </div>
        );
    }
}

const div = document.createElement('div');
div.id = 'app';
document.body.appendChild(div);
ReactDOM.render(<App/>, document.getElementById('app'));
