const { check, validationResult } = require("express-validator");

const doLoginValidators = [
  check("username")
    .isLength({
      min: 1,
    })
    .withMessage("Mobile number or email is required"),
  check("password").isLength({ min: 1 }).withMessage("Password is required"),
];

const doLoginValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  console.log("log 5", mappedErrors);

  if (Object.keys(mappedErrors).length === 0) {
    console.log("log 3");

    next();
  } else {
    console.log("log 4");

    res.status(400).json({
      errors: mappedErrors,
      // {
      //   common: {
      //     msg: "Authentication failure!",
      //   },
      // },
    });

    // res.render("index", {
    //   data: {
    //     username: req.body.username,
    //   },
    //   errors: mappedErrors,
    // });
  }
};

module.exports = {
  doLoginValidators,
  doLoginValidationHandler,
};
