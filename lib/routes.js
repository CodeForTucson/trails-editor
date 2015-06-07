module.exports = function (db) {

  return {

    getTrails: function (req, res, next) {
      new db.TrailSegments().fetchAll()
        .then(function (trails) {
          return res.status(200).send(trails);
        })
        .catch(function (error) {
          return res.status(500).send("Internal server error!");
        })
      ;
    },

    createTrails: function (req, res, next) {
      if (req.body.geometry) {
        req.body.geometry = JSON.parse(req.body.geometry);
      }
      new db.TrailSegments(req.body).save()
        .then(function (trail) {
          return res.status(200).send(trail);
        })
        .catch(function (error) {
          console.log(error);
          return res.status(500).send("Internal server error!");
        })
      ;
    },

    updateTrails: function (req, res, next) {
      var trailId = req.params.trail;
      new db.TrailSegments({ trail_segments_id: trailId }).fetch()
        .then(function (trail) {
          if (!trail) return res.status(404).send("Trail does not exist!");
          trail.save(req.body, { method: 'update' })
            .then(function (trailUpdate) {
              return res.status(200).send(trailUpdate);
            })
            .catch(function (error) {
              return res.status(500).send("Internal server error!")
            })
          ;
        })
        .catch(function (error) {
          return res.status(500).send("Internal server error!");
        })
      ;
    },

    deleteTrails: function (req, res, next) {
      var trailId = req.params.trail;
      new db.TrailSegments({ trail_segments_id: trailId }).fetch()
        .then(function (trail) {
          if (!trail) return res.status(404).send("Trail does not exist!");
          trail.destroy();
          res.status(200).end()
        })
        .catch(function (error) {
          return res.status(500).send("Internal server error!");
        })
      ;
    }

  }

};