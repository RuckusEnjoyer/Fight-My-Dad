const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    password: String!
    username: String
    savedDads: [ID]
  }

  type Dad {
    _id: ID
    dadName: String
    nickname: String
    userId: String
    entryMusic: String
    dadJoke: String
    weight: Int
    armLength: Int
    experience: Int
    winNum: Int
    lossNum: Int
  }

  type Stats {
    _id: ID
    dadId: ID
    dadName: String
    WinNum: Int
    LossNum: Int
  }  

  type Auth {
    token: ID
    user: User
}

input dadStats {
  userId: String
  dadName: String
  nickname: String
  entryMusic: String
  dadJoke: String
  weight: Int
  armLength: Int
  experience: Int
  winNum: Int
  lossNum: Int
}

  type Query {
    me: User
    getAllDads: [Dad]
    getDad: Dad
  }

  type Mutation {
    addUser(firstName: String, lastName: String, username: String, password: String!): Auth
    login(username: String, password: String!): Auth

    addDad(input: dadStats) : Dad
    removeDad(dadId: ID!): Dad
  }
`;

module.exports = typeDefs;

// removeDad(_id: ID) : User