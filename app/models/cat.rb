class Cat < ActiveRecord::Base
  attr_accessible :name, :user_id
  has_many :appearances
  has_many :records, through: :appearances
  belongs_to :user
  validates_presence_of :name
  validates :name, :uniqueness => {:scope => :user_id}

  def self.no_mag(str)
    str.gsub(/^\s*\d+\.*\d*\s*/, '')
  end

  def equalize_then_save
    if !self.dashboard && self.day_avgs
      self.dashboard = true 
    end
    self.save
  end

end
