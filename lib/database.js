var bcrypt = require('bcrypt-nodejs')
  , config = require('../config.json')
  , knex = require('knex')(config.db)
  , bookshelf = require('bookshelf')(knex)
  , TrailSegments
  , NamedTrails
  , Trailheads
  , Stewards
  , Areas
;

TrailSegments = bookshelf.Model.extend({
  tableName: 'trail_segments',
  idAttribute: 'trail_segments_id'
  steward: function () {
    return this.hasOne(Stewards, 'stewards_id');
  }
});

NamedTrails = bookshelf.Model.extend({
  tableName: 'named_trails',
  idAttribute: 'named_trails_id',
  trailSegments: function () {
    return this.hasMany(TrailSegments, 'trail_segments_id');
  }
});

TrailHeads = bookshelf.Model.extend({
  tableName: 'trailheads',
  idAttribute: 'trailheads_id',
  trailSegment: function () {
    return this.hasOne(TrailSegments, 'trail_segments_id');
  },
  steward: function () {
    return this.hasOne(Stewards, 'stewards_id');
  }
});

Stewards = bookshelf.Model.extend({
  tableName: 'stewards',
  idAttribute: 'stewards_id',
});

Areas = bookshelf.Model.extend({
  tableName: 'areas',
  idAttribute: 'areas_id',
  steward: function () {
    return this.hasOne(Stewards, 'stewards_id');
  }
});

exports.TrailSegments = TrailSegments;
exports.NamedTrails = NamedTrails;
exports.TrailHeads = TrailHeads;
exports.Stewards = Stewards;
exports.Areas = Areas;