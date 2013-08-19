class User < ActiveRecord::Base
  has_many :records
  has_many :settings 
  has_many :cats 
  attr_accessible :email, :password, :password_confirmation, :dashboard, :time_zone
  attr_accessor :password
  before_save :encrypt_password

  validates_presence_of :email
  validates_uniqueness_of :email
  validates_presence_of :password, on: :create
  validates_presence_of :password_confirmation, on: :create
  validates_confirmation_of :password, message: "must match confirmation"

  def local_time
    ActiveSupport::TimeZone.new self.time_zone
  end

  def self.authenticate(email, password)
    user = self.find_by_email(email.downcase)
    if user && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt)
      return user
    else
      return false
    end
  end

  def encrypt_password
    if password.present?
      self.password_salt = BCrypt::Engine.generate_salt
      self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
    end
  end

  def get_trending_cats
    cat_freqs = self.get_list_of_cat_frequencies
    cat_freqs = cat_freqs.sort_by {|k,v| -v}
    cat_freqs.collect! {|f| f.first }
    return cat_freqs
  end

  def get_list_of_cat_frequencies
    cat_list = {}
    self.records.each do |record|
      record.cats_from_raw_without_mags.each do |cat|
        cat_list[cat] = 0 if !cat_list[cat]
        cat_list[cat] += 1
      end 
    end
    return cat_list
  end

  def binary_cat_existence(num_days, cat)
    days = {} 

    past_date = self.local_time.today - (num_days - 1).days 
    today = self.local_time.today
    (past_date..today).each do |day|
      days[day.strftime('%F')] = false 
    end

    records = self.records.where('target > ? AND raw LIKE ?', Date.today - (num_days - 2).days, '%'+cat+'%')

    records.each do |records|
      this_key = records.local_target.strftime('%F')
      if days.has_key? this_key 
        days[this_key] = true
      end
    end

    days
  end

end
