import { gql } from '@apollo/client'

const CREATE_SALE = gql `
  mutation 
  updateSale($sale: String $stID: ID $groupID: ID){
    updateSale(sale: $sale studentID: $stID groupID: $groupID) {
      groupSale
    }
  }
`

const GROUP_SALE = gql `
  query groupSaleInfo($groupID: ID) {
    groupSaleInfo(groupID: $groupID) {
      studentID
      groupSale
      studentAddTime
    }
  }
`

const SUBSCRIP_SALE = gql `
  subscription {
    groupSale{
      studentID
      groupSale
      studentAddTime
    }
  }
`

export {
  CREATE_SALE,
  GROUP_SALE,
  SUBSCRIP_SALE
}