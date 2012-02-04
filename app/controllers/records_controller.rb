class RecordsController < ApplicationController

  before_filter :require_login

  require 'csv'

  def export
    # CRITERIA : to select customer records
    #=> Customer.active.latest.limit(100)
    records = Record.limit(10)
    filename ="records_#{Date.today.strftime('%d%b%y')}"
    csv_data = CSV.generate do |csv|
      # csv << Record.csv_header
      records.each do |c| 
        csv << 'stuff'
      end
    end 
    send_data csv_data,
      :type => 'text/csv; charset=iso-8859-1; header=present',
      :disposition => "attachment; filename=#{filename}.csv"
  end

  # GET /records
  # GET /records.json
  def index 
    @records = Record.find(:all, :conditions => ["user_id=?", current_user.id], :order => 'created_at DESC')
    
    @record_days = @records.group_by { |r| r.created_at.beginning_of_day }

    puts "DEBUG OUTPUT ========================================="
    puts Time.zone

    @karma = Measure.find_or_create_by_name('overall')
    if !@karma.value
      @karma.value = 0
      @karma.save
    end
        
    @record ||= Record.new
    @record.created_at = Time.zone.now.strftime("%H:%M %d/%m/%Y")
    
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @records, :include => :cats }      
    end
  end

  # GET /records/1/edit
  def edit
    @record = Record.find(params[:id])
  end

  # POST /records
  # POST /records.json
  def create
      
    @record = Record.new(params[:record])
    @record.raw = params[:record][:raw]
    
    things = params[:record][:raw].split(',')
    things.each do |t|
      matches = t.match(/(\d*\.*\d*)(\D{2,}.*)/)
      @cat = Cat.new
      @cat.name = matches[2].strip
      @cat.magnitude = matches[1] unless !matches[1] 
      if @cat.magnitude && @cat.magnitude > 1
        @cat.name = @cat.name.singularize
      end
      
      # !
      # because magnitudes are stored as ints, decimals are rounded off
      
      if Karma.exists?(:name => @cat.name)
        @karma = Karma.find(:first, :conditions => ["name = ?", @cat.name])
        if @cat.magnitude
          @cat.karma = @karma.points*@cat.magnitude
        else
          @cat.karma = @karma.points
        end
        # update overall karma
        @karma = Measure.find(:first, :conditions => ["name = ?", 'overall'])
        @karma.value += @cat.karma
        @karma.save
      end
      
      @record.cats << @cat
    end
    
    @record.user_id = current_user.id
     
    respond_to do |format|
      if @record.save
        format.html { redirect_to records_url, notice: 'Record was successfully created.' }
        format.json { render json: @record, status: :created, location: @record }
      else        
        @records = Record.all
        format.html { render action: "index" }
        format.json { render json: @record.errors, status: :unprocessable_entity }
      end
    end    
  end

  # PUT /records/1
  # PUT /records/1.json
  def update
    @record = Record.find(params[:id])
    @record.raw = params[:record][:raw]
    
    # return overall karma, then delete cat
    @karma = Measure.find(:first, :conditions => ["name = ?", 'overall'])
    @record.cats.each do |cat|
      if cat.karma
        @karma.value = @karma.value - cat.karma
      end
      cat.destroy
    end
    @karma.save
    
    things = params[:record][:raw].split(',')
    things.each do |t|
      matches = t.match(/(\d*\.*\d*)(\D{2,}.*)/)
      @cat = Cat.new
      @cat.name = matches[2].strip
      @cat.magnitude = matches[1] unless !matches[1] 
      if @cat.magnitude && @cat.magnitude > 1
        @cat.name = @cat.name.singularize
      end
      
      # !
      # because magnitudes are stored as ints, decimals are rounded off
      
      if Karma.exists?(:name => @cat.name)
        @karma = Karma.find(:first, :conditions => ["name = ?", @cat.name])
        if @cat.magnitude
          @cat.karma = @karma.points*@cat.magnitude
        else
          @cat.karma = @karma.points
        end
        # update overall karma
        @karma = Measure.find(:first, :conditions => ["name = ?", 'overall'])
        @karma.value += @cat.karma
        @karma.save
      end
      
      @record.cats << @cat
    end

    respond_to do |format|
      if @record.update_attributes(params[:record])
        format.html { redirect_to '/', notice: 'Record was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @record.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /records/1
  # DELETE /records/1.json
  def destroy
    @record = Record.find(params[:id])
    
    # update overall karma
    @karma = Measure.find(:first, :conditions => ["name = ?", 'overall'])
    @record.cats.each do |cat|
      if cat.karma
        @karma.value = @karma.value - cat.karma
      end
    end
    @karma.save
    
    @record.destroy

    respond_to do |format|
      format.html { redirect_to records_url }
      format.json { head :ok }
    end
  end
    
end
