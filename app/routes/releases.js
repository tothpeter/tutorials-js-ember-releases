import Ember from 'ember';
import ajax from 'ic-ajax';

var AnalyticsService = {
  track: function(eventName, data) {
    console.log("Tracking analytics hit with ", eventName, data);
  }
};

export default Ember.Route.extend({
  model: function(params) {
    return ajax({
      // https://api.github.com/repos/ember-cli/ember-cli/releases
      // http://localhost:4200/ember-cli/ember-cli/releases

      url: 'https://api.github.com/repos/' + params.owner + '/' + params.repo + '/releases',
      type: 'get'
    }).then(function(releases) {
      releases.forEach(function(release) {
        release.created_at = new Date(release.created_at);
        release.published_at = new Date(release.published_at);
      });
      return releases;
    });
  },

  actions: {
    selectRelease: function(release) {
      AnalyticsService.track('release', release);
      this.transitionTo('releases.show', release);
    }
  }
});
