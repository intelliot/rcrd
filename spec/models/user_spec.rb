require "spec_helper"

describe User do

  describe "self.authenticate" do
  end

  describe "encrypt_password" do
  end

  describe "current_time_zone" do

    it "defaults to Pacific Time" do
      user = User.create!(email: "whatever@jeff.is", password: "test", password_confirmation: "test")
      expect(user.current_time_zone).to eq(ActiveSupport::TimeZone.new("Pacific Time (US & Canada)"))
    end

    it "is correct under normal conditions" do
      user = User.create!(email: "whatever@jeff.is", password: "test", password_confirmation: "test")
      tz = user.records.create!(raw: "time zone, Tokyo", target: Time.now - 5.minutes)
      one = user.records.create!(raw: "workout, swim, 3200 yards", target: Time.now)
      expect(user.current_time_zone).to eq(ActiveSupport::TimeZone.new("Tokyo"))
    end

  end

  describe "default_time_zone" do
  end

  describe "get_trending_cats" do
    it "is correct under normal conditions" do
      user = User.create!(email: "whatever@jeff.is", password: "test", password_confirmation: "test")
      one = user.records.create!(raw: "workout, swim", target: Time.now)
      two = user.records.create!(raw: "restaurant", target: Time.now)
      expect(user.get_trending_cats).to include("workout")
      expect(user.get_trending_cats).to include("restaurant")
    end
  end

  describe "get_list_of_cat_frequencies" do
  end

  describe "binary_cat_existence" do
    it "is correct under normal conditions" do
=begin      
      user = User.create!(email: "whatever@jeff.is", password: "test", password_confirmation: "test")
      one = user.records.create!(raw: "workout, swim", target: Time.now - 2.days)
      two = user.records.create!(raw: "swim, lake", target: Time.now)

      expected = {}
      expected[Time.now.strftime('%F').to_s] = true

      expect(user.binary_cat_existence(3, 'swim')).to eq()
=end
    end
  end

  describe "get_cat_count_per_day" do
    # this badly needs testing
  end

end
