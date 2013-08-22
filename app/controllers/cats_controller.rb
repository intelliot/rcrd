class CatsController < ApplicationController

  before_filter :authenticate

  def index
    # a more in-depth report of cat usage (frequency, cohorts)
    # a stream (the squiggly bulgy timeline one) graph of cats would be cool
    #@trending = current_user.get_trending_cats.slice 0, 100
    @cats = current_user.cats.sort_by{|c| -c.appearances.count }
  end

  def show
    @cat = current_user.cats.find params[:id] 
=begin
    # of the appearances this cat has had, grab siblings with magnitudes
    @quant_cohorts = [] 
    @cat.appearances.each do |appear|
      appear.record.appearances.each do |co_appear|
        @quant_cohorts << co_appear if co_appear.magnitude
      end
    end 

    # pull statistics from this data
    # now:
      # max
      # min
      # average 
    @maxes = {}
    @quant_cohorts.each do |appear|
      if !@maxes.has_key? appear.cat.name 
        @maxes[appear.cat.name] = appear.magnitude  
      else
        if appear.magnitude > @maxes[appear.cat.name] 
          @maxes[appear.cat.name] = appear.magnitude  
        end
      end
    end
=end
  end

  def edit 
    @name = params[:id]
    @cat = current_user.cats.find_or_create_by_name @name
  end

  def update
    @cat = current_user.cats.find_by_id params[:id]
    if @cat.update_attributes(params[:cat])
      flash[:notice] = "Your cat was successfully updated."
    else
      flash[:notice] = "There was a problem saving your cat."
    end
    redirect_to @cat
  end

end
