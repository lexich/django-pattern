define [
  "jquery"
  "underscore"
  "backbone"
  "bootstrap"
],($, _, Backbone)->
  initialize: ->
    self = this
    self.init()
    $(document).ready ->
      self.ready()
  init: ->
    #realtime code
    console.log "app.js init"
  ready: ->
    #document ready code
    console.log "app.js ready"
