import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends Component {
    renderSong(songList) {
        return(
            <ul>
                { 
                    songList.map((e, key) => <li key={key}> { e.title} </li>)
                }
            </ul>
        );
    }
    render() {
        return (
            <div>
                {
                    this.renderSong(this.props.data.songs ? this.props.data.songs : [])
                }
            </div>
        );
    }
}
const query = gql`
{
    songs {
        title
    }
}
`;

export default  graphql(query)(SongList);