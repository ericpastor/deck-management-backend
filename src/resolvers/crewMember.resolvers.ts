import { GraphQLError } from 'graphql'
import CrewMember from '../models/index'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { exitCode } from 'process'

const crewMemberResolvers = {
  Query: {
    crewMemberCount: () => CrewMember.collection.countDocuments(),
    allCrewMembers: async () => {
      return CrewMember.find({})
    },
    findCrewMember: async (root: CrewMember, args: CrewMember) => {
      const { name } = args
      const crewMemberFound = await CrewMember.findOne({ name })
      return crewMemberFound
    },
    findCrewMemberById: async (root: CrewMember, args: CrewMember) => {
      const { id } = args
      const crewMemberFound = await CrewMember.findById({ _id: id })
      return crewMemberFound
    },
  },
  CrewMember: {
    address: (root: Address) => {
      return {
        street: root.street,
        city: root.city,
        postCode: root.postCode,
        country: root.country,
      }
    },
  },

  Mutation: {
    addCrewMember: async (root: addCrewMember, args: addCrewMember) => {
      const {
        name,
        email,
        rank,
        phone,
        avatar,
        street,
        city,
        postCode,
        country,
        password,
      } = args

      const existingCrewMember = await CrewMember.findOne({ email })
      if (existingCrewMember) {
        throw new GraphQLError('Email must by unique', {
          extensions: {
            code: 'MAD_EMAIL_INPUT',
            invalidArgs: args.email,
          },
        })
      }

      const passwordHashed = await bcrypt.hash(password, 10)

      if (args) {
        const newCrewMember = new CrewMember({
          name,
          email,
          rank,
          phone,
          avatar,
          street,
          city,
          postCode,
          country,
          password: passwordHashed,
        })

        const res = await newCrewMember.save()

        return res
      }
    },

    login: async (root: CrewMember, args: CrewMember) => {
      const { email, password } = args
      const crewMember = await CrewMember.findOne({ email })

      if (crewMember && (await bcrypt.compare(password, crewMember.password))) {
        const token = jwt.sign(
          { id: crewMember._id, email },
          process.env.JWT_SECRET,
          {
            expiresIn: '48h',
          }
        )

        crewMember.token = token

        const res = await crewMember.save()

        return res
      } else {
        throw new GraphQLError(`No lo hemos encontrado: ${password}}`)
      }
    },

    editCrewMember: async (root: CrewMember, args: CrewMember) => {
      const { id } = args
      const foundCrewMember = await CrewMember.findById({ _id: id })
      if (!foundCrewMember) {
        return null
      }

      foundCrewMember.name = args.name
      foundCrewMember.email = args.email
      foundCrewMember.rank = args.rank
      foundCrewMember.phone = args.phone
      foundCrewMember.avatar = args.avatar
      if (args.address) {
        foundCrewMember.address = {
          ...foundCrewMember.address,
          ...args.address,
        }
      }

      return foundCrewMember.save()
    },
    deleteCrewMember: async (root: CrewMember, args: CrewMember) => {
      const { id } = args
      await CrewMember.deleteOne({ _id: id })
    },
  },
}

export default crewMemberResolvers
