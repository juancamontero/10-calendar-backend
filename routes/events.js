// * Events routes
// * host + api/events

const { Router } = require("express");
const { check } = require("express-validator");

const { isDate } = require("../helpers/isDate");
const { fieldsValidators } = require("../middlewares/fieldsValidators");

const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

const { jwtValidator } = require("../middlewares/jwtValidator");

const router = Router();
// same middleware of each route validation for each route
router.use(jwtValidator);

// * get events
router.get("/", getEvents);

// * create event
router.post(
  "/",
  [
    check("title", "title is required").not().isEmpty(),
    check("start", "Start date is required!").custom(isDate),
    check("end", "End date is required!").custom(isDate),
    fieldsValidators,
  ],
  createEvent
);

// * update event
router.put(
  "/:id",
  [
    check("title", "title is required").not().isEmpty(),
    check("start", "Start date is required!").custom(isDate),
    check("end", "End date is required!").custom(isDate),
    fieldsValidators,
  ],
  updateEvent
);

// * delete event
router.delete("/:id", deleteEvent);

module.exports = router;
