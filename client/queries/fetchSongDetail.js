import gql from 'graphql-tag';

export default gql`
    query SongDetail($id: ID!){
        song(id: $id) {
            id
            title
            lyrics {
                id
                content
            }
        }
    }
`;