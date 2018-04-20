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

// Main Item View

var ItemView = Backbone.View.extend({
    el: '.root',
    render: function(){
        var that = this;
        var getItems = new Items();
        getItems.fetch({
            success: function(collection){
                var template = _.template($('#all-items').html());
                that.$el.html(template({items: collection, isEditable: false}));
            }
        })
    }
});

var allItems = new ItemView();
allItems.render()