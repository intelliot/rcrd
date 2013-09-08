class Cat < ActiveRecord::Base
  attr_accessible :name, :user_id, :color
  belongs_to :user
  validates_presence_of :name
  validates :name, :uniqueness => {:scope => :user_id}
  validates_format_of :color, 
    :with => /^(#[A-Fa-f0-9]{6}|#[A-Fa-f0-9]{3}|[01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/,
    :message => "must be a valid hex code (like #e2235e) or a hue number from 0-255"

  def self.no_mag(str)
    str.gsub(/^\s*\d+\.*\d*\s*/, '')
  end

end
