Tako.Notification = do (TK = Tako) ->
  active = false

  notification = $ """<div data-element="notification"><div></div></div>"""
  notification_window = $ """<article class="window"></article>"""

  notification.find("div").append notification_window
  $("body").append notification

  timeout = null
  callback = null


  success = (icon="ok", title, content, time_out, cb) ->
    html = _iconHtml icon, title, content
    _show html, "success center upwards", time_out, cb

  error = (icon="deny", title, content, time_out, cb) ->
    html = _iconHtml icon, title, content
    _show html, "error center downwards", time_out, cb

  loading = (title, time_out, args...) ->
    if args[0]? and typeof(args[0]) is "string"
      icon = args[0]
      cb   = args[1]
    else
      icon = "spin4"
      cb = args[0]
    html = ""
    html += """
      <div id="loading-block" style="position: absolute; top: 0;" class="loading center not_clickable">
        <span class="icon #{icon} animated show-loading"></span>
      </div>
    """
    _showLoading html, null, time_out, cb

  progress = (icon, title, content, time_out, cb) ->
    html = """<header class="#{if icon? then 'align-left' else 'center'}">"""
    html += """<span class="icon #{icon}"></span>""" if icon?
    html +=  """
    <span>#{title}</span>
    </header>
    <section>
      <span class="content">#{content}</span>
      <div id="notification_progress"></div><div style="clear:both"></div>
    </section>
    """
    _show html, "center progress not_clickable", time_out, cb
    progress = TK.ProgressBar "notification_progress", 0
    percent: (value) ->
      val = progress.percent value
      setTimeout (-> do hide), 150 if val is 100
      val

  confirm = (icon="help-circled", title, content, accept="Accept", cancel="Cancel", cb) ->
    html = """<section>
                <span class="icon #{icon}"></span>
                <div>
                  <span class="title">#{title}</span><br>
                  <span class="content padding bottom clear">#{content}</span>
                </div>
              </section>
              <footer>
                <button class="button accept">#{accept}</button>
                <button class="button cancel">#{cancel}</button>
              </footer>
            """
    _show html, "center confirm not_clickable", null, null

    buttons = notification_window.find("button")
    buttons.bind Tako.tap, (element) ->
      buttons.unbind Tako.tap
      do hide
      if $(@).hasClass("accept")
        cb.call cb, true
      else
        cb.call cb, false

  custom = (title, content, closable=true, classes="", timeout, cb) ->
    header = ""
    if title? and closable
      header = """
        <header>
          <span class="close icon deny"></span>
          <h1>
            <span>#{title}</span>
          </h1>
        </header>"""
    else if title?
      header = """<header><h1>
        <span>#{title}</span>
      </h1></header>"""
    html = """
    #{header}
    <section>"""
    html += """<span class="close black icon deny"></span>""" if closable and not title?
    html += """#{content}
    </section>
    """

    _show html, "center custom not_clickable #{classes}", timeout, cb
    notification.find(".close").on Tako.tap, _close

  hide = ->
    active = false
    clearTimeout timeout
    timeout = null
    notification_window.removeClass "show"
    setTimeout _hide, 500

  _iconHtml = (icon, title, content) ->
    """
    <header>
      <span class="icon #{icon}"></span>
    </header>
    <section>
      <span class="title">#{title}</span>
      <span class="content">#{content}</span>
    </section>
    """

  _show = (html, classes, time_out, cb) ->
    if not active
      active = true
      do notification_window.removeClass
      notification.find("#loading-block").remove()
      notification_window.addClass "window " + classes
      notification_window.html html
      notification.addClass "show"
      setTimeout (-> notification_window.addClass("show")), 100
      callback = cb if cb?
      if time_out?
        timeout = setTimeout hide, time_out*1000
    else
      original_cb = callback
      callback = ->
        do original_cb if original_cb?
        _show html, timeout, cb
      do hide

  _showLoading = (html, classes, time_out, cb) ->
    if not active
      active = true
      notification.append html
      notification.addClass "show"
      callback = cb if cb?
      if time_out?
        timeout = setTimeout hide, time_out*1000
    else
      original_cb = callback
      callback = ->
        do original_cb if original_cb?
        _show html, timeout, cb
      do hide

  _ontap = (ev) ->
    do ev.preventDefault
    do ev.stopPropagation
    if $(ev.currentTarget).find("#loading-block").length then return null
    unless notification_window.hasClass "not_clickable"
      active = false
      clearTimeout timeout
      timeout = null
      notification_window.removeClass "show"
      setTimeout _hide, 500

  _close = (ev) ->
    do ev.preventDefault
    do ev.stopPropagation
    active = false
    clearTimeout timeout
    timeout = null
    notification_window.removeClass "show"
    setTimeout _hide, 500

  _hide = ->
    notification.removeClass "show"
    cb = callback
    callback = null
    cb.call cb if cb?


  notification.on Tako.tap, _ontap

  success: success
  error: error
  confirm: confirm
  loading: loading
  progress: progress
  custom: custom
  hide: hide