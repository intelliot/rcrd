class Appearance < ActiveRecord::Base
  attr_accessible :magnitude, :type
  belongs_to :record
  belongs_to :cat
end
