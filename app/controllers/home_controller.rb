class HomeController < ApplicationController

  def index 
    @num_days = 60  
    @cats = []
    if current_user && current_user.email == "gcarpenterv@gmail.com"
      @cats << {name: 'workout', color: '96b4fd', avgs: true}
      @cats << {name: 'swim', color: '032780', avgs: true}
      @cats << {name: 'run', color: '009942', avgs: true, day_avgs: true}
      @cats << {name: 'drink', color: 'D42627', avgs: true, mag_avgs: true}
      @cats << {name: 'walk', color: 'cf0b7b'}
    elsif current_user
      @trending_cats = current_user.get_trending_cats[0..3]
      colors = ['96b4fd', '032780', '009942', 'D42627', 'cf0b7b']
      @trending_cats.each_with_index do |cat, i|
        @cats << {name: cat, color: colors[i], avgs: true}
      end
    end

    @cats.each do |cat|
      cat[:days] = {}
      cat[:days] = current_user.binary_cat_existence(@num_days, cat[:name])

      if cat.has_key?(:avgs) && cat[:avgs]
        cat[:last_4_weeks] = current_user.records.get_weekly_frequency_since(Date.today - 4.weeks, cat[:name])
        cat[:last_8_weeks] = current_user.records.get_weekly_frequency_since(Date.today - 8.weeks, cat[:name])
        cat[:last_16_weeks] = current_user.records.get_weekly_frequency_since(Date.today - 16.weeks, cat[:name])
      end
    end
  end

  def experimental
    records = Record.all
    @data = {}

    # for each record (assuming 3 cats)
      # for each cat
        # relate to all others

    records.each do |record|
puts record.inspect 
      cats = record.cats_from_raw_without_mags
      cats.each do |source|
        cats.each do |target|
          break if source == target
          if source < target
            key = source
            value = target
          else
            key = target
            value = source
          end
          next if @data.has_key? key && @data[key] == target
          @data[key] = target
        end  
      end  
    end

    # relate(source, target)
      # relations are always stored alphabetically
        # e.g. swim -> workout
        # not workout -> swim 
      # if source == target, return 

  end

end
