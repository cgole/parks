module.exports = function(Park) {
  Park.within = function(lat1, lon1, lat2, lon2, limit, fn) {
    var default_result_count = 40;
    var pos1 = [Number(lat1), Number(lon1)];
    var pos2 = [Number(lat2), Number(lon2)];
    if (typeof limit === 'function') {
      fn = limit;
    }
    limit = Number(limit) || 40;

    Park.find({
      // find locations within the bounding box:
      where: {pos: {within: {$box: [pos1,pos2]}}},
      // throttling: 
      limit: limit
    }, fn);
  };

  Park.setup = function() {
    Park.base.setup.apply(this, arguments);
    // load our data here?

    this.remoteMethod('within', {
      description: 'Find locations within the area defined by a two map points',
      accepts: [
        {arg: 'lat1', type: 'Number', required: true,
          description: 'geo coordinate lat1'},
        {arg: 'lon1', type: 'Number', required: true,
          description: 'geo coordinate lon1'},
        {arg: 'lat2', type: 'Number', required: true,
          description: 'geo coordinate lat2'},
        {arg: 'lon2', type: 'Number', required: true,
          description: 'geo coordinate lon1'},
        {arg: 'limit', type: 'Number',
          description: 'max number of results'}
      ],
      returns: {arg: 'locations', root: true},
      http: { verb: 'GET' }
    });
  };

  Park.setup();
};
