// Helper functions

function htmlEncode(value){
    return $('<div/>').text(value).html();
}

function renderObject(data){
    var getTemplate = data.isEditable ? $('#edit-object').html() : $('#view-object').html()
    var template = _.template(getTemplate);
    return template({item: data.item, id: data.id});
}

// Models and collections

var Items = Backbone.Collection.extend({
    url: '/collection'
});

var Item = Backbone.Model.extend({
    defaults: {
        isEditable: false
    },
    urlRoot: '/model'
});

// Each Objects View

var ObjectView = Backbone.View.extend({
    initialize: function(options){
      var templateFile = options.isEditable ? $('#edit-object').html() : $('#view-object').html()
      this.id = options.id
      this.template = _.template(templateFile)
      this.listenTo(this.model, 'change', this.render);
    },
    render: function(){
      return this.template({item: this.model, id: this.id});
    }
});

// Main Item View

var ItemView = Backbone.View.extend({
    el: '.root',
    render: function(){
        var that = this;
        var getItems = new Items();
        getItems.fetch({
            success: function(collection){
                var template = _.template($('#all-items').html());
                that.$el.html(template());
                _.each(collection.models, function(item, id, items){
                    var childObject = new ObjectView({model: item, id: id, isEditable: false})
                    that.$el.find('tbody').append(childObject.render())
                });
            }
        })
    }
});

var allItems = new ItemView();
allItems.render()