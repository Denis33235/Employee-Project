import express from "express";
import mongodb from "mongodb";

const router = express.Router();

const validate = data => {
  const errors = {};

  if (!data.name) errors.name = "Name field can't be blank";
  if (!data.surname) errors.surname = "Surname field can't be blank";
  if (!data.age) errors.age = "Age field can't be blank";
  if (!data.email) errors.email = "Email field can't be blank";
  if (!data.experience) errors.experience = "Experience field can't be blank";
  if (!data.img) errors.img = "Image field can't be blank";
  if (data.status <= 0) errors.status = "Wrong status";
  if (data.age <= 0) errors.age = "Age must be a positive value";
  if (data.experience <= 0) errors.experience = "Experience must be a positive value";

  return errors;
};

router.get("/", (req, res) => {
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
    (err, emp) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ emp });
    }
  );
});

router.post("/", (req, res) => {
  const db = req.app.get("db");
  const errors = validate(req.body);

  if (Object.keys(errors).length === 0) {
    db.collection("emps").insertOne(req.body, (err, r) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ emp: r.ops[0] });
    });
  } else {
    res.status(400).json({ errors });
  }
});

router.put("/:_id", (req, res) => {
  const db = req.app.get("db");
  const { _id, ...empData } = req.body;
  const errors = validate(empData);

  if (Object.keys(errors).length === 0) {
    db.collection("emps").findOneAndUpdate(
      { _id: new mongodb.ObjectId(req.params._id) },
      { $set: empData },
      { returnOriginal: false },
      (err, r) => {
        if (err) {
          res.status(500).json({ errors: { global: err } });
          return;
        }

        res.json({ emp: r.value });
      }
    );
  } else {
    res.status(400).json({ errors });
  }
});

router.delete("/:_id", (req, res) => {
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
