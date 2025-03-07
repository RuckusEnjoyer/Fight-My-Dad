
const { User, Dad } = require('../models');

const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const data = await User.findOne({ _id: context.user._id })
          .populate('dad')
          .select('-__v -password');


        return data;
      } else {
        throw AuthenticationError;
      }
    },

    getAllDads: async (parent, args, context) => {
      if (context.user) {
        return Dad.find({});
        // return data;
      } else {
        throw new AuthenticationError(
          `There was a problem getting your dad, maybe he's out for milk.`
        );
      }
    },

    getDad: async (parent, args, context) => {
      if (context.user) {
        return Dad.find({_id: context.dad_id});
        // return data;
      } else {
        throw new AuthenticationError(
          `There was a problem getting your dad, maybe he's out for milk.`
        );
      }
    },

  },
  Mutation: {
    addUser: async (parent, { firstName, lastName, username, password }) => {
      try {
        const user = await User.create({
          firstName,
          lastName,
          username,
          password,
        });
        const token = signToken(user);

        console.log(token);
        return { token, user };
      } catch (err) {
        throw new AuthenticationError(`Error Adding Signing Up ${err}`);

      }
    },
    login: async (parent, { username, password }) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          throw new AuthenticationError(
            'User not found. Do you have an account?'
          );
        }


        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials!');
        }

        const token = signToken(user);
        console.log('Logged IN');
        return { token, user };
      } catch (err) {
        console.log(err)
      }
      

    },
    
   addDad: async (parent, { input }, context) => {
      console.log('Eliot juggles.', input);
      if (context.user) {
        try {
          const newDad = await Dad.create(input);
          console.log('Brian doesnt juggle', newDad);
          User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $addToSet: { savedDads: newDad._id },
            },
            { new: true, runValidators: true }
          );
          return newDad;
        } catch (err) {
          // If user attempts to execute this mutation and isn't logged in, throw an error
          throw new AuthenticationError('User is not authenticated.', err);
        }
      }
    },


/*
    addDad: async (parent, { userId, dadName, nickname, entryMusic, dadJoke, weight, armLength, experience, winNum,lossNum, }, context) => {
      console.log('Eliot juggles.',  userId, dadName, nickname, entryMusic, dadJoke, weight, armLength, experience, winNum,lossNum, );
      try {
        const newDad = await Dad.create({
          userId,    
          dadName,
          nickname,
          entryMusic,
          dadJoke,
          weight,
          armLength,
          experience,
          winNum,
          lossNum,
        });
        console.log('Brian doesnt juggle', newDad);

        return newDad;

      } catch (err) {

        console.error('Error adding dad:', err);
        throw err;
      }
    },
*/
  
  removeDad: async (parent, { dadId }, context) => {
    try {
      console.log('Removing dad with ID:', dadId);
      if (!context.user) {
        throw new AuthenticationError('User is not authenticated.');
      }
      const removedDad = await Dad.findByIdAndDelete(dadId);

      if (!removedDad) {
        throw new Error(`Dad with ID ${dadId} not found.`);
      }

      console.log(`Dad with ID ${dadId} removed successfully.`);

      return removedDad;

    } catch (err) {
      console.error('Error removing dad:', err);
      throw err;
    }
  }


    
    

  },
};



module.exports = resolvers;


//

// removeDad: async (parent, { dad }) => {},

// getDad: async (parent, { userId }) => {
//   const params = userId ? { userId } : {};
//   return Dad.find(params);
// },