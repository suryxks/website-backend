const { Conflict, NotFound } = require("http-errors");
const { INTERNAL_SERVER_ERROR_MESSAGE } = require("../constants/progresses");
const { createTrackedProgressDocument } = require("../models/trackedProgresses");

const createTrackedProgressController = async (req, res) => {
  try {
    const data = await createTrackedProgressDocument({ ...req.body });
    return res.status(201).json({
      data,
      message: "tracked progress document created successfully.",
    });
  } catch (error) {
    if (error instanceof Conflict) {
      return res.status(409).json({
        message: error.message,
      });
    } else if (error instanceof NotFound) {
      return res.status(404).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: INTERNAL_SERVER_ERROR_MESSAGE,
    });
  }
};

const updateTrackedProgressController = async (req, res) => {
  return res.status(200).json({
    message: "Update tracked progress successfully.",
  });
};

module.exports = { createTrackedProgressController, updateTrackedProgressController };
