const Issue = require("../models/Issues");


// =====================
// CREATE ISSUE
// =====================

const createIssue = async (req, res) => {

  try {

    const issue = await Issue.create(req.body);

    res.status(201).json(issue);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// =====================
// GET ALL ISSUES
// =====================

const getIssues = async (req, res) => {

  try {

    const issues = await Issue.find();

    res.json(issues);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// =====================
// GET ISSUE BY ID
// =====================

const getIssueById = async (req, res) => {

  try {

    const issue = await Issue.findById(
      req.params.id
    );

    if (!issue) {

      return res.status(404).json({
        message: "Issue not found",
      });
    }

    res.json(issue);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// =====================
// UPDATE ISSUE
// =====================

const updateIssue = async (req, res) => {

  try {

    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(issue);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// =====================
// DELETE ISSUE
// =====================

const deleteIssue = async (req, res) => {

  try {

    await Issue.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Issue Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
};