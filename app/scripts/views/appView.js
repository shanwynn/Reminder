/*global BackboneTimer, Backbone, JST*/

BackboneTimer.Views.Appview = BackboneTimer.Views || {};

(function () {
    'use strict';

    BackboneTimer.Views.Appview = Backbone.View.extend({

        template: JST['app/scripts/templates/appView.ejs'],

        el: $('#timer-app'),

        events: {
          'submit #newReminder' : 'onSubmit'
        },

        onSubmit: function (e) {
          e.preventDefault();
          var desc = $('#description');
          var time = $('#endTime');
          var reminder = new BackboneTimer.Models.Reminder({
            description: desc.val(),
            endTime: time.val()
          });
          reminder.save();
        },

        initialize: function () {
            this.remindersList = this.$el.find('#existingReminders');
            this.listenTo(BackboneTimer.Reminders, 'add', this.addOne);
            this.listenTo(BackboneTimer.Reminders, 'reset', this.addAll);

            this.render();
            BackboneTimer.Reminders.fetch();
        },

        addOne: function (reminder) {
          var reminderView = new BackboneTimer.Views.Reminder(reminder);
          $('#existingReminders table tbody').append(reminderView.render().el);
        },

        addAll: function () {
          console.log('addAll Called');
        },

        render: function () {
            this.$el.html(this.template());
            console.log('render called in appView');
        }

    });

})();
