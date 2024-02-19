import express from "express";
import mongodb from "mongodb";
import authenticate from "../middlewares/authenticate";
import adminOnly from "../middlewares/adminOnly";

const router = express.Router();

const validate = data => {
  const errors = {};

  if (!data.name) errors.name = "Name filed can't be blank";
  if (!data.surname)
    errors.surname = "Surname filed can't be blank";
  if (!data.age) errors.age = "Age filed can't be blank";
  if (!data.email) errors.email = "Email filed can't be blank";
  if (!data.experience) errors.experience = "Experience filed can't be blank";
  if (!data.img) errors.img = "This field can't be blank";
  if (data.status <= 0) errors.status = "Wrong status";
  if (data.age <= 0)
    errors.age = "Age must be only positive value";
  if (data.experience <= 0)
    errors.experience = "Experience must be only positive value";


  return errors;
};

router.get("/", authenticate, (req, res) => {
  const db = req.app.get("db");
  db.collection("emps")
    .find({})
    .toArray((err, emps) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ emps });
    });
});

router.get("/:_id", (req, res) => {
  const db = req.app.get("db");
  db.collection("emps").findOne(
    { _id: new mongodb.ObjectId(req.params._id) },
    (err, emps) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ emps });
    }
  );
});

router.post("/", authenticate, adminOnly, (req, res) => {
  const db = req.app.get("db");
  const errors = validate(req.body.emps);

  if (Object.keys(errors).length === 0) {
    db.collection("emps").insertOne(req.body.emps, (err, r) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ emps: r.ops[0] });
    });
  } else {
    res.status(400).json({ errors });
  }
});

router.put("/:_id", authenticate, adminOnly, (req, res) => {
  const db = req.app.get("db");
  const { _id, ...empsData } = req.body.emps;
  const errors = validate(empsData);

  if (Object.keys(errors).length === 0) {
    db.collection("emps").findOneAndUpdate(
      { _id: new mongodb.ObjectId(req.params._id) },
      { $set: empsData },
      { returnOriginal: false },
      (err, r) => {
        if (err) {
          res.status(500).json({ errors: { global: err } });
          return;
        }

        res.json({ emps: r.value });
      }
    );
  } else {
    res.status(400).json({ errors });
  }
});

router.delete("/:_id", authenticate, adminOnly, (req, res) => {
  const db = req.app.get("db");

  db.collection("emps").deleteOne(
    { _id: new mongodb.ObjectId(req.params._id) },
    err => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({});
    }
  );
});

export default router;
