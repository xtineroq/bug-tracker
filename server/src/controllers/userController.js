const { User } = require("../models");
const { firebaseCreateUser } = require("../service/firebase");

module.exports = {
  save: async (req, res) => {
    try {
      const { email, password, username, role } = req.body;
      const user = await User.create(req.body);
      const { error } = await firebaseCreateUser({
        email,
        password,
        // Note: Firebase has specific properties for users see: https://firebase.google.com/docs/auth/web/manage-users
        displayName: username, // So we use username as displayName
      });
      /** On firebase error delete the saved user */
      if (error) {
        User.findByIdAndDelete(user._id, (err, _) => {
          if (err !== null) res.status(400).json(err);
        });
      }
      res.status(201).json({ id: user.id, email, username, role });
    } catch (err) {
      /** Create default human readable error message
       *  We can create specific error messages to guide the user (preferred)
       *  or just a generic error message.
       */
      let defaultMSG = "Invalid request.";
      let defaultCode = null;

      /** If there is an error from mongodb, extract that error message and use that value instead */
      const { _message, code } = err;
      if (_message) defaultMSG = _message;
      if (code) defaultCode = code;

      res.status(422).json({ message: defaultMSG, code });
    }
  },
};
