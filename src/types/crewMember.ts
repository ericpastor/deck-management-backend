interface CrewMember {
  id: string
  name: string
  phone: string
  address: Address
  email: string
  password: string
  rank: Rank
  avatar: string
  token: string
}

interface addCrewMember {
  name: string
  phone: string
  street: string
  city: string
  postCode: string
  country: string
  email: string
  password: string
  rank: Rank
  avatar: string
}

interface LoginInput {
  email: string
  password: string
}

interface Address {
  street: string
  city: string
  postCode: string
  country: string
}

enum Rank {
  CAPTAIN,
  OFFICER,
  BUSON,
  AB,
  OS,
}
