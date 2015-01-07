import Ember from 'ember';

function iter(context, options) {
  var ret = "";

    for (var i = 0, j = context.length; i < j; i++) {
        ret += options.fn($.extend(context[i], {position: i + 1}));
    }

    return ret;
}

export {
  iter
};

export default Ember.Handlebars.makeBoundHelper(iter);
