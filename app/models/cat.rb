class Cat < ActiveRecord::Base
  attr_accessible :name
  has_many :appearances
  has_many :records, through: :appearances
  belongs_to :user
  validates_presence_of :name

  def equalize_then_save
    if !self.dashboard && self.day_avgs
      self.dashboard = true 
    end
    self.save
  end

end
