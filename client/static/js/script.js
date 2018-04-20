// Helper functions

function htmlEncode(value){
    return $('<div/>').text(value).html();
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
    tagName: 'tr',
    events: {
        'click .edit-row': 'goToEdit',
        'click .del-row': 'delRow',
        'click .save-row': 'saveRow'
    },
    initialize: function(options){
      this.el = '#' + this.id
      this.id = options.id
      this.listenTo(this.model, 'change', function(){
        this.$el.replaceWith(this.render())
      });
    },
    render: function(){
      var templateFile = this.model.get('isEditable') ? $('#edit-object').html() : $('#view-object').html()
      this.template = _.template(templateFile)
      this.$el.html(this.template({item: this.model, id: this.id}))
      return this.$el
    },
    goToEdit: function(){
        this.model.set('isEditable', true)
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
                    item.isEditable = false
                    var childObject = new ObjectView({model: item, id: id})
                    that.$el.find('tbody').append(childObject.render())
                });
            }
        })
    }
});

var allItems = new ItemView();
allItems.render()