class UsersController < ApplicationController

  def current 
    @output_user = {
      id: current_user.id,
      email:  current_user.email,
      time_zone: current_user.time_zone,
      local_time: current_user.local_time.now
    } 
    render json: @output_user 
  end

  def new 
    redirect_to :root if current_user
    @user = User.new 
  end

  def create
    if params[:user][:email]
      params[:user][:email].downcase!
    end 
    @user = User.new(params[:user])
    if @user.save
      cookies.permanent.signed[:user_id] = @user.id
      redirect_to root_url, notice: "Signed up!"
    else
      render action: :new
    end
  end

  def edit
    render 'shared/angular'
  end

  def update
    @user = User.find params[:id] 
    if @user.update_attributes(params[:user])
      render json: 'success'
    else
      render json: 'error'
    end
  end

end
