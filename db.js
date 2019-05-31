const MongoClient = require('mongodb').MongoClient;
/**
 *
 * @type {{db: Db}}
 */
const state = {
    db: null
};

exports.connect = function (url, done) {
  if(state.db)
      return done();
  MongoClient.connect(url,{ "useNewUrlParser": true },function (err, db) {
      if(err)
          return done(err);
      state.db = db.db('main');
      console.log('MongoDB was connected!');
      done();
  });
};
/**
 *
 * @returns {Db}
 */
exports.get = function () {
  return state.db;
};