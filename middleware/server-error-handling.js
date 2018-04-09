module.exports = function() {
  this.use(function(err, req, res, next) {
    console.error(err);

    res.status(500).json({
      code: err.name,
      error: err,
    });
  });
};
