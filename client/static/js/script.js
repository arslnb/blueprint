// Helper functions

function htmlEncode(value){
    return $('<div/>').text(value).html();
}

$.fn.serializeObject = function(a) {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
  };

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
    className: 'row-object',
    events: {
        'click .edit-row': 'goToEdit',
        'click .del-row': 'delRow',
        'click .save-obj': 'saveObj'
    },
    initialize: function(options){
      this.el = '#' + String(this.id)
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
    },
    saveObj: function(ev){
        var that = this;
        var objectJson = $(ev.currentTarget).closest('.row-object').find('input').serializeObject()
        var newObject = new Item();
        newObject.save(objectJson,{
            success: function(data) {
                var updatedModel = objectJson
                updatedModel['isEditable'] = false
                that.model.set(updatedModel)
            }
        });
        return false;
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