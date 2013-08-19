require 'spec_helper'

describe Setting do

  before(:each) do
    @settings = []
    @settings << Setting.create!(
      name: "dashboard", 
      on: true, 
      user_id: 2,
      content: "stuff") 
  end

end
