import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends Component {
    render() {
        const songList = this.props.data.songs ? this.props.data.songs : [];
        return (
            <div>
                <ul>
                    {
                        songList.map( (e, key) => <li key={key}> {e.title} </li>)
                    }
                </ul>
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