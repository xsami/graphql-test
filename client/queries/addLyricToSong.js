import gql from 'graphql-tag';

export default gql`
    mutation AddLyricToSong($songId: ID!, $content: String!) {
        addLyricToSong(songId: $songId, content: $content) {
            id
            title
            lyrics {
                content
            }
        }
    }
`;