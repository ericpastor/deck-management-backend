import gql from 'graphql-tag';
const crewMemberTypeDefs = gql `
  type CrewMember {
    id: ID!
    name: String!
    phone: String!
    address: Address!
    email: String!
    password: String!
    avatar: String
    rank: Rank!
    token: String
  }

  type Address {
    street: String!
    city: String!
    postCode: String!
    country: String!
  }

  input AddressInput {
    street: String
    city: String
    postCode: String
    country: String
  }

  enum Rank {
    CAPTAIN
    OFFICER
    BUSON
    AB
    OS
  }
`;
export default crewMemberTypeDefs;
