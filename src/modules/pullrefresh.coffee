do ->
  lastTime = 0
  vendors = ["ms", "moz", "webkit", "o"]
  x = 0

  while x < vendors.length and not window.requestAnimationFrame
    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"]
    window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] or window[vendors[x] + "CancelRequestAnimationFrame"]
    ++x
  unless window.requestAnimationFrame
    window.requestAnimationFrame = (callback, element) ->
      currTime = new Date().getTime()
      timeToCall = Math.max(0, 16 - (currTime - lastTime))
      id = window.setTimeout(->
        callback currTime + timeToCall
      , timeToCall)
      lastTime = currTime + timeToCall
      id
  unless window.cancelAnimationFrame
    window.cancelAnimationFrame = (id) ->
      clearTimeout id


Tako.Pull_Refresh = (container, options={})->
  options.pullLabel      = options.pullLabel or ""
  options.releaseLabel   = options.releaseLabel or ""
  options.refreshLabel   = options.refreshLabel or ""
  options.onRefresh      = options.onRefresh or undefined
  container              = document.getElementById container

  class PullToRefresh
    constructor: (container, @options) ->
      PULLREFRESH = """<div class="pulltorefresh">
        <span class="icon down-big"></span>
        </div>"""

      @breakpoint = 50
      @container = container
      @pullrefresh = $(PULLREFRESH)[0]
      $(@container).prepend @pullrefresh
      @icon = $(@pullrefresh).find ".icon"
      @text = $(@pullrefresh).find ".text"
      @_slidedown_height = 0
      @_anim = null
      @_dragged_down = false
      @showRelease = false
      Hammer(@container).on "touch",  =>
        $(@container).addClass "pulling"
        @hide(false) if not @refreshing

      Hammer(@container).on "dragdown", @onPull
      Hammer(@container).on "release", =>
        #return unless @_dragged_down
        cancelAnimationFrame @_anim
        if @_slidedown_height >= @breakpoint
          if @options.onRefresh
            do @onRefresh
          else
            do @hide
        else
          do @hide

    onPull: (ev) =>
      @_dragged_down = true
      return if @container.scrollTop > 5
      @updateHeight() unless @_anim
      ev.gesture.preventDefault()
      ev.gesture.stopPropagation()
      if @_slidedown_height >= @breakpoint
        @onArrived()
      else
        @onUp() if @showRelease
      @_slidedown_height = ev.gesture.deltaY * 0.4

    setHeight: (height) =>
      height -= 495
      @_trasformPullrefresh height

    animatePullrefreshTransform: =>
      @height = parseInt(@height);
      @_trasformPullrefresh @height
      if(@height > -445)
        setTimeout =>
          @height -= 3
          do @animatePullrefreshTransform;
      else
        do @finishOnRefresh

    onRefresh: ->
      @icon[0].className = "icon spin4 animated"
      @text.html @options.refreshLabel
      do @animatePullrefreshTransform

    finishOnRefresh: ->
      @refreshing = true
      @icon.removeClass("rotated")
      @options.onRefresh.call @options.onRefresh

    onArrived: ->
      @showRelease = true
      @icon.addClass("rotated")
      @text.html @options.releaseLabel

    onUp: ->
      @showRelease = false
      @icon.removeClass("rotated")
      @text.html @options.pullLabel

    hide: (remove_pulling=true)=>
      $(@container).removeClass "pulling" if remove_pulling
      @icon[0].className = "icon down-big"
      @text.html @options.pullLabel
      @_slidedown_height = 0
      @setHeight 0
      @icon.removeClass("rotated")
      cancelAnimationFrame @_anim
      @_anim = null
      @_dragged_down = false
      @refreshing = false

    updateHeight: =>
      @height = @_slidedown_height - 495
      @_trasformPullrefresh @height
      @_anim = requestAnimationFrame @updateHeight

    _trasformPullrefresh: (height) ->
      @pullrefresh.style.transform = "translate(0, #{height}px)"
      @pullrefresh.style.webkitTransform = "translate(0, #{height}px)"
      @pullrefresh.style.mozTransform = "translate(0, #{height}px)"
      @pullrefresh.style.msTransform = "translate(0, #{height}px)"
      @pullrefresh.style.marginBottom = "#{height}px"
      @pullrefresh.style.oTransform = "translate(0, #{height}px)"

  new PullToRefresh(container, options)
