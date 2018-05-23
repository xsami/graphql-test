import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import addLyric from '../queries/addLyricToSong';
import { hashHistory } from 'react-router';

class LyricCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
    }

    getOptimisticResponse() {
        let lyrics = [];
        this.props.list.forEach(e => {
            lyrics.push(e);
        });
        lyrics.push({
            id: '000000000000',
            content: this.state.content,
            likes: 0,
            __typename: 'LyricType'
        });
        const optimisticResponse = {
            __typename: 'Mutation',
            addLyricToSong: {
                __typename: 'SongType',
                id: this.props.songId,
                title: this.props.songName,
                lyrics
            }
        };
        return optimisticResponse;
    }

    onSubmit(event) {
        event.preventDefault();
        const optimisticResponse = this.getOptimisticResponse();
        this.props.mutate({
            variables: {
                content: this.state.content,
                songId: this.props.songId
            },
            optimisticResponse
        }).then( () => {
            this.setState({ content: '' });
        });
    }

    render() {
        return <form onSubmit={this.onSubmit.bind(this)}>
            <label>Add a Lyric</label>
            <input
                value={this.state.content}
                onChange={event => this.setState({ content: event.target.value })} 
            />
            </form>
    }
}

export default graphql(addLyric)(LyricCreate);