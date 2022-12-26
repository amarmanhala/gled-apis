module.exports = function(err, req, res, next) {
  //TODO: logged error
  res.status(500).send("Something failed");
}