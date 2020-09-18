const express = require("express");
const {
	addIssue,
	getStatusIssues,
	updateIssue,
	deleteIssue,
	getNumberOfPages,
	updateIssueStatus,
	getAllIssues,
	getStatusNumberOfPages,
} = require("../controller/Issue");
const router = express.Router();
// router.get("/", (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader("Access-Control-Max-Age", "1800");
//     res.setHeader("Access-Control-Allow-Headers", "content-type");
//     res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
//      });

router.post("/add-issue", addIssue);
router.get("/list-issues", getAllIssues);
router.get("/:isClosed/list-issues", getStatusIssues);
router.get("/num-of-pages", getNumberOfPages);
router.get("/:isClosed/num-of-pages", getStatusNumberOfPages);
router.put("/update-issue/:id", updateIssue);
router.put("/update-issue-status/:id", updateIssueStatus);
router.delete("/delete-issue/:id", deleteIssue);

module.exports = router;