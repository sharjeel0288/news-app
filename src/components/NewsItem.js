import React, { Component } from 'react';




export class NewsItem extends Component {



    render() {
        let { title, description, imageurl, newsurl, author, publishedAt ,source} = this.props;
        return (
            <div>
                <div className="card" >
                    <img src={imageurl} className="card-img-top" alt={imageurl} />
                    <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%' , Zindex:1}}> {source} <span className="visually-hidden">dd</span>
                    </span>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className='card-text'><small className='text-muted'>By {author ? author : 'unknown'} on {new Date(publishedAt).toGMTString()}</small></p>
                        <a href={newsurl} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem;
