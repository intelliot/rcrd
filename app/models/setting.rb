class Setting < ActiveRecord::Base
  attr_accessible :cat_id, :contents, :name, :on, :user_id
  belongs_to :user
end