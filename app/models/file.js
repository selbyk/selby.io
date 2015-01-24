import DS from 'ember-data';

var File = DS.Model.extend({
    size: DS.attr('number'),
    path: DS.attr('string'),
    type: DS.attr('string'),
    name: DS.attr('string'),
    description: DS.attr('string'),
    url: DS.attr('string'),
    lastModifiedDate: DS.attr('date'),
    created_at: DS.attr('date'),
    updated_at: DS.attr('date')
});

export default File;
