import * as express from "express";
import { getCase } from "../service/case-service";

const router = express.Router();

router.get("/cases/:cid", (req, res) => {
  getCase(req, req.params.cid)
    .then((caseData) => {
      delete caseData._links;
      res.render("case-data", {
        caseData,
        generatedDateTime: generateDateTime(),
        title: "Simple Case Details output template",
        user: req.authentication.user,
      });
    })
    .catch((error) => {
      // console.error('Case data retrieval failed', error);
      res.status(error.status).send(error);
    });
});

function generateDateTime() {
  const dateTime = new Date(Date.now());
  return dateTime.toLocaleString();
}

module.exports = router;
