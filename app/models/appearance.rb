class Appearance < ActiveRecord::Base
  attr_accessible :magnitude, :type, :record_id, :cat_id
  belongs_to :record
  belongs_to :cat
end
