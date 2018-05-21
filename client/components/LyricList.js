import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import mutation from '../queries/likeLyric';

class LyricList extends Component {

    onLike(id, likes) {
        console.log('id: ', id,' likes: ', likes);
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
        }).then(res => console.log(res));
    }

    render() {
        return <ul className='collection'>
        { 
            this.props.list.map((e, key) => (
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
}

export default graphql(mutation)(LyricList);