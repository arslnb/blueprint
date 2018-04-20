function htmlEncode(value){
    return $('<div/>').text(value).html();
}

var Items = Backbone.Collection.extend({
    url: '/collection'
});

var ItemView = Backbone.View.extend({
    el: '.root',
    events: {
        'click .edit-row': 'editObject'
    },
    editObject: function(event){
        alert('edit me!')
    },
    render: function () {
      var that = this;
      var items = new Items();
      items.fetch({
        success: function (items) {
        console.log(items)
          var template = _.template($('#all-items').html());
          that.$el.html(template({items: items.models}));
        }
      })
    }
});

var allItems = new ItemView();
allItems.render()