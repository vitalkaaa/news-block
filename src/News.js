import React, {Component} from 'react'
import './News.css'


class News extends Component{

    constructor(props){
        super(props);
        this.state = {
            from: 0,
            show_button: true,
            loading: true,
            news: [],
        };
        this.getMoreNews();
    }

    renderNews = (index, item) => {
        let img = 'images/news_stub.jpg';
        if(item.imageNews)
            img = item.imageNews;
        return(
            <div className='row' key={index}>
                <div className="photo col-sm-2 col-md-2">
                    <img src={img} className="img-responsive"/>
                </div>
                <div className="newsblock col-sm-10 col-md-10">
                    <div className="newsheader underline" onClick={function(){return window.location.href = '/news/'+item.id}}>
                        {item.headerNews}
                    </div>
                    <div className="newstext" align="justify">{item.shortDesc}</div>
                    <div className="newsdate">07 дек 2017</div>
                </div>
            </div>
    );};


    getMoreNews(){
        this.setState({loading: true});
        fetch("news.json?size=3&from="+this.state.from)
            .then(res => res.json())
            .then(
                new_news => {
                    this.setState({
                        loading: false,
                        new_news,
                        news: this.state.news.concat(new_news),
                        from: this.state.from + 3});
                    if(this.state.new_news.length === 0){
                        this.setState({show_button: false})
                    }
                },
                error => this.setState({ loading: false, error })
            );
    }

    render(){
        let spinner = '';
        if(this.state.loading)
            spinner = <i className="fa fa-spinner fa-spin"></i>
        let btn = <div className="button" onClick={this.getMoreNews.bind(this)}>
                        Загрузить еще&nbsp;
                        {spinner}
                  </div>;

        if(this.state.loading && !this.state.news.length)
            return (<p>loading</p>);
        else if(this.state.news)
            if(this.state.show_button === false)
                btn = <div className="button">
                            Больше нет новостей&nbsp;
                            <i className="fa fa-times" aria-hidden="true"></i>
                      </div>;
            return (
                <div className='container'>
                    <div id="newsList" className="mainpart newspage col-xs-12 col-sm-9 col-md-9">
                        {
                            this.state.news.map(
                            (item, index) =>
                            this.renderNews(index, item)
                            )
                        }
                        <div id="getMoreNewsButtonRow" className="row">
                            <div className="col-sm-2 col-md-2">
                            </div>
                            <div className="newsblock col-sm-10 col-md-10">
                                {btn}
                            </div>
                        </div>
                    </div>
                </div>
            )}

}

export default News;