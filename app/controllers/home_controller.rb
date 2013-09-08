class HomeController < ApplicationController

  def index
    render 'shared/angular' 
  end

  def welcome
    @frontpage = true
  end

  def about
  end

  def stats 
    @stats = {}
    @stats['1d'] = Record.where('target > ?', Time.now.utc - 1.day).count
    @stats['1w'] = Record.where('target > ?', Time.now.utc - 1.week).count
    @stats['1m'] = Record.where('target > ?', Time.now.utc - 1.month).count
    @stats['1y'] = Record.where('target > ?', Time.now.utc - 1.year).count
  end

end
