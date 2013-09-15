class HomeController < ApplicationController

  def index
    render 'shared/angular' 
  end

  def welcome
    @frontpage = true
    @user = User.new 
  end

  def about
  end

  def stats 
    respond_to do |format|
      format.html do 
        render 'shared/angular' 
      end 
      format.json do 
        @stats = {}
        @stats['1d'] = Record.where('target > ?', Time.now.utc - 1.day).count
        @stats['1w'] = Record.where('target > ?', Time.now.utc - 1.week).count
        @stats['1m'] = Record.where('target > ?', Time.now.utc - 1.month).count
        @stats['1y'] = Record.where('target > ?', Time.now.utc - 1.year).count
        render :json => @stats 
      end 
    end
  end

  def guide 
    render 'shared/angular' 
  end

  def gallery 
    render 'shared/angular' 
  end
end
