import React, { Component } from "react";

export default class Newsitem extends Component {
  render() {
    const { title, description, imageurl, newsurl,author,date,source } = this.props;
    
    return (
      <div className="my-3">
        <div className="card" >
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger " style={{right:"-2%",zIndex:"1"}}>
    {source}
    
  </span>
          <img
            src={!imageurl ? "https://www.irishtimes.com/resizer/1t7ggcqNe-E4eGQAW1nRumHB3g8=/1200x630/filters:format(jpg):quality(70)/cloudfront-eu-central-1.images.arcpublishing.com/irishtimes/6QZSQVFUVD4LPRELCPEDUEDLSQ.jpg" : imageurl}
            className="card-img-top"
            alt={title || "Image"}
            style={{ height: "13rem" }}
            onError={(e) => {
              e.target.src = "https://www.cricbuzz.com/a/img/v1/595x396/i1/c381310/the-england-vice-captain-thoug.jpg"; // Provide the path to your default image
              e.target.alt = "Default Image Alt Text"; // Provide the alternative text for the default image
            }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
