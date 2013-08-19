require "spec_helper"

describe Record do

  before(:each) do
    @user = User.create!(
      email: "whatever@jeff.is", 
      password: "test", 
      password_confirmation: "test") 
    @record = @user.records.create!(
      raw: "workout, swim, 3200 yards", 
      target: Time.now)
  end

  describe "local_target" do
    it "defaults to PST when not specified" do
      pst = ActiveSupport::TimeZone.new("Pacific Time (US & Canada)")
      test_local_target = @record.target.in_time_zone(pst)
      expect(@record.local_target).to eq(test_local_target)
    end
  end

  describe "hue" do
    it "is correct in normal conditions" do
      minutes = @record.local_target.strftime('%k').to_f * 60.0
      minutes += @record.local_target.strftime('%M').to_f
      test_hue = (minutes / 1440.0) * 360.0

      @record.hue.should eq(test_hue)
    end
  end

end
