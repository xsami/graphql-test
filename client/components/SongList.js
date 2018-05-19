import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends Component {
    renderSong(songList) {
        return(
            <ul className="collection">
                { 
                    songList.map((e, key) => <li key={key} className="collection-item"> { e.title} </li>)
                }
            </ul>
        );
    }
    render() {
        
        return (
            <div>
                <h3>List of current songs</h3>
                {
                    this.props.data.loading ?
                    <h5>Loading...</h5> :
                    this.renderSong(this.props.data.songs ? this.props.data.songs : [])
                }
                <Link
                    to="/songs/new"
                    className="btn-floating btn-large red right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
        );
    }
}

export default  graphql(query)(SongList);