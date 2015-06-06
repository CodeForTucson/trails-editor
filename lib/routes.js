module.exports = function (db) {

  return {

    getTrails: function (req, res, next) {

    },

    createTrails: function (req, res, next) {
      new db.TrailSegments(req.body).save()
        .then(function (trail) {
          return res.status(200).send(trail);
        })
        .catch(function (error) {
          return res.status(500).send("Internal server error!");
        })
      ;
    },

    createTrails: function (req, res, next) {

    },

    deleteTrails: function (req, res, next) {

    }

  }

};