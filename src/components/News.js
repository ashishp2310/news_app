import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spin from "./Spin";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultProps={
    country:"in",
    pageSize:9,
    category:"general"
  }
  static propsTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,


  }
  capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props){
    
    super(props);
    this.state = {
      articles:[],
      loading: false,
      page:1,
      totalResults:0
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewsPulse`;
  };
  async updatenews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e9d7f32f96be4e44ad6d6338d962b563&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  
    try {
      this.setState({ loading: true });
      const response = await fetch(url);
      const parsedData = await response.json();
  
      console.log("API response:", parsedData); // Log the API response
  
      if (parsedData.articles && parsedData.articles.length > 0) {
        this.setState({
          articles: parsedData.articles,
          totalResults: parsedData.totalResults,
          loading: false
        });
      } else {
        console.log("No articles found");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
  }
  
  async componentDidMount(){
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e9d7f32f96be4e44ad6d6338d962b563 &page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true}); 
    // let data = await fetch(url);
    //  let parsedData= await data.json();
    //  console.log(parsedData);
    //  this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
    this.updatenews();
  }
  // handlepreviousclick=async()=>{
  //   // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e9d7f32f96be4e44ad6d6338d962b563&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  //   // this.setState({loading:true});
  //   // let data = await fetch(url);
    
  //   // let parsedData= await data.json();
  //   // console.log(parsedData);
  //   // this.setState({
  //   //   page:this.state.page-1,
  //   //   articles:parsedData.articles,
  //   //   loading:false
  //   // })/
  //   this.setState({page:this.state.page-1})
  //   this.updatenews();

  // }
  // handlenextclick=async()=>{
    
    
  //   // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e9d7f32f96be4e44ad6d6338d962b563&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //   // this.setState({loading:true});
  //   // let data = await fetch(url);
   
  //   // let parsedData= await data.json();
  //   // console.log(parsedData);
  //   // this.setState({
  //   //   page:this.state.page+1,
  //   //   articles:parsedData.articles,
  //   //   loading:false
  //   // })
  //   this.setState({page:this.state.page+1})
  //   this.updatenews();


  // }
  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e9d7f32f96be4e44ad6d6338d962b563&page=${nextPage}&pageSize=${this.props.pageSize}`;
  
    try {
      const response = await fetch(url);
      const parsedData = await response.json();
  
      this.setState(prevState => ({
        articles: [...prevState.articles, ...parsedData.articles],
        totalResults: parsedData.totalResults,
        page: nextPage
      }));
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };
  
  render() {
    console.log("State:", this.state); // Log the state for debugging
    return (
      <>
        <h1 className="text-center" style={{margin:"35px"}}>NewsPulse-Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading&&<Spin/>}
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          
          loader={<h4><Spin/></h4>}
          >
            <div className="container">
        <div className="row">
         
        {!this.state.loading&&this.state.articles.map((element,index) => {
            return (
              <div className="col-md-4 " key={index}>
                <Newsitem
                  title={element.title?element.title.slice(0,45):" "}
                  description={element.description?element.description.slice(0,88):" "}
                  imageurl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
              
            );
          })}
          
        </div>
        </div>
        </InfiniteScroll>
        
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlepreviousclick}>&larr; previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handlenextclick}>next &rarr;</button>
        </div> */}
      </>
    );
  }
}
