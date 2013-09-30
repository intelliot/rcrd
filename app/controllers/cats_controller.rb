class CatsController < ApplicationController

  before_filter :authenticate

  def index
    # a more in-depth report of cat usage (frequency, cohorts)
    # a stream (the squiggly bulgy timeline one) graph of cats would be cool
    #@trending = current_user.get_trending_cats.slice 0, 100
    if params[:name]
      @cats = current_user.cats.where('name=?', params[:name])
    elsif params[:limit]
      @cats = current_user.cats.limit(params[:limit])
    else
      @cats = current_user.cats
    end
    respond_to do |format|
      format.html # Fall through to view 
      format.json { render :json => @cats }
    end
  end

  def show
    respond_to do |format|
      format.html { render 'shared/angular' }
      format.json { 
        render :json => current_user.cats.find(params[:id])
      }
    end
  end

  def records
    # MUSING: I guess the only way to do this well is to look for
    # singular and plural forms of the same word...
    name_singular = params[:cat_name].chomp.singularize.downcase
    name_plural = params[:cat_name].chomp.pluralize.downcase
    # TODO: Look up any aliases, if one exists, 
    # start process again with that alias
    @records = []
    singular_records = current_user.records.where("lower(raw) ~ ?", "[\s\d\.]*#{name_singular}[\s]*,|,[\s\d\.]*#{name_singular}[\s]*|,[\s\d\.]*#{name_singular}[\s]*,")
    plural_records = current_user.records.where("lower(raw) ~ ?", "[\s\d\.]*#{name_plural}[\s]*,|,[\s\d\.]*#{name_plural}[\s]*|,[\s\d\.]*#{name_plural}[\s]*,")
    proto_records = singular_records | plural_records
    proto_records.each {|r| @records.push r.sanitize }
    render :json => @records
  end

  def edit 
    @name = params[:id]
    @cat = current_user.cats.find_or_create_by_name @name
  end

  def update
    @cat = current_user.cats.find params[:id]
    if params[:option]
      option = params[:option]
      @cat[option] = !@cat[option]
      if @cat.save
        render text: "success"
      else
        render text: "error"
      end
    else
      @cat.update_attributes(params[:cat])
      @cat.save
      render :edit 
    end
  end

end
