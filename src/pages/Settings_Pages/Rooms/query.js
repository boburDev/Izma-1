import {
   gql
} from '@apollo/client'

const ROOMS = gql `
    query {
        rooms {
            id
            room
        }
    }
`

const CREATE_ROOM = gql `
mutation createRoom($name: String!) {
    createRoom(name: $name) {
      id
      room
    }
  }
`

const UPDATE_ROOM = gql `
mutation updateRoom($ID: ID! $name: String!) {
    updateRoom(id: $ID name: $name){
        id
        room
      }
  }
`


const DELETE_ROOM = gql `
mutation deleteRoom($ID: ID!) {
    deleteRoom(id: $ID){
        id
        room
      }
  }
`
export {
   ROOMS,
   CREATE_ROOM,
   UPDATE_ROOM,
   DELETE_ROOM
}