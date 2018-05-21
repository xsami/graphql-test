import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/fetchSongDetail';
import mutation from '../queries/likeLyric';
import { Link, hashHistory } from 'react-router';
import LyricCreate from './LyricCreate';

class SongDetail extends Component {

    onLike(id, likes) {
        this.props.mutate({
            variables: {
                id
            },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: { 
                    id,
                    __typename: 'LyricType',
                    likes: likes + 1
                }
            }
        });
    }

    renderLyrics(lyrics) {
        return <ul className='collection'>
            { 
                lyrics.map((e, key) => (
                <li key={key} 
                    className="collection-item">
                    {e.content}
                    <div className="like-box">
                    <i 
                    className="material-icons"
                    onClick={() => this.onLike(e.id, e.likes)}>thumb_up</i>
                    <span className="new badge">{e.likes}</span>
                    </div>
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



export default graphql(mutation)(
    graphql(query, {
    options: (props) => ({ variables: { id: props. params.id }})
})(SongDetail));