import gql from 'graphql-tag'

const crewMemberSchema = gql`
  type Query {
    crewMemberCount: Int!
    allCrewMembers: [CrewMember!]!
    findCrewMember(name: String!): CrewMember
    findCrewMemberById(id: ID!): CrewMember
  }

  type Mutation {
    addCrewMember(
      name: String!
      phone: String!
      street: String!
      city: String!
      postCode: String!
      country: String!
      avatar: String
      email: String!
      password: String!
      rank: Rank!
    ): CrewMember

    editCrewMember(
      id: ID!
      name: String!
      phone: String!
      avatar: String!
      email: String!
      rank: Rank!
      address: AddressInput!
    ): CrewMember

    deleteCrewMember(id: ID!): CrewMember

    login(email: String!, password: String!): CrewMember
  }
`

export default crewMemberSchema
