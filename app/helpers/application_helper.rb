module ApplicationHelper

  # Template macros
  # ===============

  def hue_now
    minutes = Time.now.strftime('%k').to_f * 60.0
    minutes += Time.now.strftime('%M').to_f
    (minutes / 1440.0)  * 360.0
  end

  def style_info(color)
    if color.is_a? Numeric # is hue value
      str = "background-color: hsl(#{color}, 65%, 48%);"
      str += "border-bottom: solid 2px hsl(#{color}, 80%, 20%);"
      str += "text-shadow: 0 -1px 1px hsl(#{color}, 30%, 0%);"
    else
      color = color[1..-1] if color[0] == "#"
      str = "background-color: ##{color};"
      str += "border-bottom: solid 2px rgba(1, 1, 1, 0.5);"
      str += "text-shadow: 0 -1px 1px rgba(1, 1, 1, 0.5);"
    end
  end

  def bg_color_now 
    "background-color: hsl(#{hue_now}, 65%, 48%);"
  end

  # Moving this logic to Cat model
  def mag(str)
    str[/^\s*\d+\.*\d*/]  
  end

  def no_mag(str)
    str.gsub(/^\s*\d+\.*\d*\s*/, '')
  end

  def tokenize(str)
    str.gsub(/^\s*\d+\.*\d*\s*/, '').singularize
  end

  def current(controller, action=nil)
    action = params[:action] if !action
    if params[:controller] == controller && params[:action] == action
      "current"
    else
      ""
    end
  end

end
