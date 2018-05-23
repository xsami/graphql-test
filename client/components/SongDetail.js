import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/fetchSongDetail';
import { Link } from 'react-router';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {

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
                <LyricCreate songId={this.props.params.id} songName={title} list={lyrics}/>
                <LyricList list={lyrics}/>
            </div>;
    }
}



export default graphql(query, {
    options: (props) => ({ variables: { id: props.params.id }})
})(SongDetail);