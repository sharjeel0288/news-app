import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import propTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {

    static defaultProps = {
        country: 'us',
        pageSize: 8,
        category: 'generals',
    }
    static propTypes = {
        country: propTypes.string,
        pageSize: propTypes.number,
        category: propTypes.string,
    }

    async changeNews(pageNo) {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6f66471fd5c64c22acfc91cc586c683b&page=${pageNo}&pagesize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.pageNo,
            articles: parsedData.articles,
            loading: false,
        })
    }
    handlePrevClick = async () => {
        this.changeNews(this.state.page - 1)
    }
    handleNextClick = async () => {
        this.changeNews(this.state.page + 1)
    }
     fetchMoreData = async() => {
        this.setState({page:this.state.page+1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6f66471fd5c64c22acfc91cc586c683b&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.pageNo,
            articles: this.state.articles.concat(parsedData.articles),
        })
    };
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        }
        document.title = 'NewsMpnkey' + this.props.category
    }
    async componentDidMount() {
        this.changeNews(this.state.page)

    }
    render() {
        return (<div className='container my-2 '>
            <h1 className='text-center my-4'>NewsMonkey - top {this.props.category} Headlines </h1>
            {this.state.loading && <Spinner />}
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.articles.length != this.state.totalResults}
                loader={<Spinner />}
            >
                <div className='container flex-sm-fill'>
                <div className='row'>
                    {this.state.articles.map((element) => {
                        return (
                            <div className='col-md-4 my-3' key={element.url} >
                                <NewsItem title={element.title} description={element.description} source={element.source.name} publishedAt={element.publishedAt} author={element.author} imageurl={element.urlToImage} newsurl={element.url} />
                            </div>
                        )
                    })}
                </div></div>
            </InfiniteScroll>
            <div className='container d-flex justify-content-between'>
                <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) ? true : false} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
        </div>)
    }
}

export default News;
