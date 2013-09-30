class RecordsController < ApplicationController

  before_filter :authenticate

  helper ApplicationHelper 

  def index
    respond_to do |format|
      format.html { render 'shared/angular' }
      format.json { 
        @records = current_user.records.limit(40)
        @good_records = []
        @records.each {|r| @good_records.push r.sanitize }
        render :json => @good_records 
      }
    end
  end

  def distribution 
    @frequencies = current_user.get_list_of_cat_frequencies
    @frequencies_arr = []
    @frequencies.each do |k, v|
      @frequencies_arr << {"name" => k, "times" => v}
    end
    @frequencies_arr.sort! { |a, b| b["times"] <=> a["times"] }
    @frequencies = @frequencies_arr.to_json
  end

  def find
    @cat_name = params[:cat]
    # if this matches an existing cat, redirect there
    # IDEA: compare two searches (esp. in graphs)
    if @cat_name
      @records = current_user.records.where("raw ILIKE ?", '%'+@cat_name+'%') 
      @cohorts = {} # one level of cohort analysis for now
      @records.each do |record|
        record.cats_from_raw_without_mags.each do |cat|
          next if cat == @cat_name
          if !@cohorts[cat]
            @cohorts[cat] = 0
          end 
          @cohorts[cat] += 1
        end
      end 
      #@cohorts.values.sort
    else
      # error: param not found
    end
  end

  def show 
    respond_to do |format|
      format.html { render 'shared/angular' }
      format.json { 
        @record = current_user.records.find(params[:id])
        render :json => @record.sanitize 
      }
    end
  end

  def new
    @record = current_user.records.new(target: current_user.local_time.now)
    @last_7_days = current_user.records.where('target > ?', Date.today - 7.days)
  end

  def create      
    target = Time.new(
      params[:record]["year"],
      params[:record]["month"],
      params[:record]["day"],
      params[:record]["hour"],
      params[:record]["minute"]
    )#.in_time_zone(current_user.local_time)
    #target = current_user.local_time.local_to_utc(target)
    puts target.inspect
    ["year", "month", "day", "hour", "minute"].each do |a| 
      params[:record].delete(a)
    end
    @record = current_user.records.new(params[:record])
    @record.target = target 
    if @record.save
      render json: @record.sanitize 
    else        
      render json: 'error'
    end
  end

  def update
    @record = Record.find(params[:id])

    if @record.update_attributes(params[:record])
      render json: 'success'
    else
      render json: 'error'
    end
  end

  def destroy
    @record = Record.find(params[:id])
    @record.destroy
      flash[:notice] = "Record successfully deleted."
    redirect_to action: 'new'
  end
end
