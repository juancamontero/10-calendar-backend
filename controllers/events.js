// * Esto es para que funcione el intellisense nada maás
const { response, request } = require("express");
const Event = require("../models/Event");

const getEvents = async (req = request, res = response) => {
  const events = await Event.find().populate("user", "name");

  res.json({
    ok: true,
    events,
  });
};
const createEvent = async (req = request, res = response) => {
  const event = new Event(req.body);

  try {
    // set the user UID before saving to DB
    event.user = req.uid;
    const savedEvent = await event.save();
    res.json({
      ok: true,
      msg: "Create event",
      event: savedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "contact the DB amin.",
    });
  }
};

const updateEvent = async (req = request, res = response) => {
  const eventId = req.params.id;

  try {
    const myEvent = await Event.findById(eventId);

    // if doesn't exist
    if (!myEvent) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    }

    // Check user id to allow edit
    if (myEvent.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: "not allowed to edit",
      });
    }

    // To update event
    const newEvent = {
      ...req.body,
      user: req.uid,
    };
    // update en DB
    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    }); //new: true to take the new entry and not the old one

    res.json({
      ok: true,
      updatedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "contact DB admin",
    });
  }
};
const deleteEvent = async (req = request, res = response) => {
  const eventId = req.params.id;

  try {
    const myEvent = await Event.findById(eventId);

    // if doesn't exist
    if (!myEvent) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    }

    // Check user id to allow edit
    if (myEvent.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: "not allowed to edit",
      });
    }

    // Delete en DB
    await Event.findByIdAndDelete(eventId);

    res.json({
      ok: true,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Delete: contact DB admin",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
