import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/fetchSongDetail';
import { Link, hashHistory } from 'react-router';
import LyricCreate from './LyricCreate';

class SongDetail extends Component {

    onLike(id) {
        console.log(id);
    }

    renderLyrics(lyrics) {
        return <ul className='collection'>
            { 
                lyrics.map((e, key) => (
                <li key={key} 
                    className="collection-item">
                    {e.content}
                    <i 
                    className="material-icons"
                    onClick={() => this.onLike(e.id)}>thumb_up</i>
                </li>))
            }
            </ul>;
    }
    render(){
        const { song } = this.props.data;
        var title = 'Loading...';
        var lyrics = [];
        if (song) {
            title = song.title;
            lyrics = song.lyrics;
        }
        return <div className='container'>
                <Link to='/' >Back</Link>
                <h3>{title}</h3>
                <LyricCreate songId={this.props.params.id}/>
                {
                    this.renderLyrics(lyrics)
                }
            </div>;
    }
}



export default graphql(query, {
    options: (props) => ({ variables: { id: props. params.id }})
})(SongDetail);