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
  end

  def edit 
    @name = params[:id]
    @cat = current_user.cats.find_or_create_by_name @name
  end

  def update
    if params[:id].match /[0-9]+/
      @cat = current_user.cats.find_by_id params[:id]
    else
      @cat = current_user.cats.find_or_create_by_name params[:id]
    end

    #@option = params[:option]

    if @cat.equalize_then_save
      redirect_to '/cats/'+@cat.name+'/edit'  
    end


    #@cat[@option] = !@cat[@option]
    #if @cat.equalize_then_save
    #  render text: "success"
    #else
    #  render text: "error"
    #end
  end

end
