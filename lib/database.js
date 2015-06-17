var bcrypt = require('bcrypt-nodejs')
  , config = require('../config.json')
  , knex = require('knex')(config.db)
  , bookshelf = require('bookshelf')(knex)
  , Users
  , TrailSegments
  , NamedTrails
  , Trailheads
  , Stewards
  , Areas
;

Users = bookshelf.Model.extend({
  tableName: 'users',
  idAttribute: 'users_id',
  trailSegments: function () {
    return this.hasMany(TrailSegments, 'trail_segments_id');
  },
  namedTrails: function () {
    return this.hasMany(NamedTrails, 'named_trails_id');
  },
  trailHeads: function () {
    return this.hasMany(Trailheads, 'trailheads_id');
  },
  stewards: function () {
    return this.hasMany(Stewards, 'stewards_id');
  },
  areas: function () {
    return this.hasMany(Areas, 'areas_id');
  }
});

TrailSegments = bookshelf.Model.extend({
  tableName: 'trail_segments',
  idAttribute: 'trail_segments_id',
  user: function () {
    return this.hasOne(Users, 'users_id');
  },
  steward: function () {
    return this.hasOne(Stewards, 'stewards_id');
  }
});

NamedTrails = bookshelf.Model.extend({
  tableName: 'named_trails',
  idAttribute: 'named_trails_id',
  user: function () {
    return this.hasOne(Users, 'users_id');
  },
  trailSegments: function () {
    return this.hasMany(TrailSegments, 'trail_segments_id');
  }
});

TrailHeads = bookshelf.Model.extend({
  tableName: 'trailheads',
  idAttribute: 'trailheads_id',
  user: function () {
    return this.hasOne(Users, 'users_id');
  },
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
  user: function () {
    return this.hasOne(Users, 'users_id');
  }
});

Areas = bookshelf.Model.extend({
  tableName: 'areas',
  idAttribute: 'areas_id',
  user: function () {
    return this.hasOne(Users, 'users_id');
  },
  steward: function () {
    return this.hasOne(Stewards, 'stewards_id');
  }
});

exports.Users = Users;
exports.TrailSegments = TrailSegments;
exports.NamedTrails = NamedTrails;
exports.TrailHeads = TrailHeads;
exports.Stewards = Stewards;
exports.Areas = Areas;