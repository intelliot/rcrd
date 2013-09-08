class ChartsController < ApplicationController

  # TODO: Tighten up security on this
  def blocks 
    @num_days = 60  
    @options = []
    @settings = current_user.settings.where('name=? OR name=?', 'dashboard', 'day_avgs').order('name ASC')

    # TODO: Refactor out of old model

    @cats = []
    @settings.each do |setting|
      puts setting.inspect
      cat = @cats.find {|a| a[:name] == setting.name}
      if cat 
        cat[setting.name] = true if setting.on
      else
        @cats << {"name" => setting.content, setting.name => true} if setting.on  
      end 
    end

    colors = ['96b4fd', '032780', '009942', 'D42627', 'cf0b7b']
    c_i = 0

    @cats.each do |cat|
      option = {}
      option[:name] = cat['name']
      option[:color] = colors[c_i]
      option[:days] = current_user.binary_cat_existence(@num_days, cat['name'])
      option[:day_avgs] = cat['day_avgs']
      if option[:day_avgs]
        option[:last_4_weeks] = current_user.records.get_weekly_frequency_since(Date.today - 4.weeks, cat['name'])
        option[:last_8_weeks] = current_user.records.get_weekly_frequency_since(Date.today - 8.weeks, cat['name'])
        option[:last_16_weeks] = current_user.records.get_weekly_frequency_since(Date.today - 16.weeks, cat['name']) 
      end
      @options << option 

      c_i += 1
      if c_i >= colors.size then c_i = 0 end
    end

    @display = []
    row = 1 
    @options.each do |cat|
      column = 1
      cat[:days].each do |key, value|
        clr = '#eee'
        clr = '#'+cat[:color] if value
        @display << {'row' => row, 'col' => column, 'color' => clr}
        column += 1
      end
      row += 1
    end
    render json: @display
  end

end
