const { User } = require("../models");
const { firebaseCreateUser } = require("../service/firebase");

module.exports = {
  save: async (req, res) => {
    try {
      const { email, password, username } = req.body;
      const { error } = await firebaseCreateUser({
        email,
        password,
        displayName: username,
      });
      if (error !== null) {
        const user = await User.create(req.body);
        /** Return only these fields, excluding password.
         *  The password is currently saved with plain text.
         *  For security reasons, we need to encrypt the password
         *  to secure it.
         */
        const { _id, email, username, role } = user;
        res.status(201).json({ _id, email, username, role });
      }
    } catch (error) {
      // TODO: Revert creation on any error
      res.status(422).json(error);
    }
  },
};
