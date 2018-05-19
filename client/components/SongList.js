import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';
import mutation from '../queries/deleteSong';

class SongList extends Component {

    removeSong(id) {
        this.props.mutate({
            variables: {
                id
            }
        }).then(() => this.props.data.refetch());
    }

    renderSong(songList) {
        return(
            <ul className="collection">
                { 
                    songList.map((e, key) => <li key={key} className="collection-item"> 
                    <Link to={`song/${e.id}`}>{ e.title }</Link>
                    <i className="material-icons" onClick={() => this.removeSong(e.id)}>delete</i>
                    </li>)
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
                    className="btn-floating btn-large right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
        );
    }
}

export default  graphql(mutation)(
    graphql(query)(SongList)
);