require "spec_helper"

describe User do

  before(:each) do
    @user = User.create!(email: "whatever@jeff.is", password: "test", password_confirmation: "test") 
  end

  describe 'local_time' do
    it "Should output PST if user hasn't specified TZ yet" do
      expect(@user.local_time).to eq(ActiveSupport::TimeZone.new("Pacific Time (US & Canada)"))
    end
  end

  describe "self.authenticate" do
    it "works when a user exists" do
      expect(User.authenticate("whatever@jeff.is", "test")).to eq(@user)
    end
    it "works when a user does not exist" do
      expect(User.authenticate("nouser@jeff.is", "test")).to eq(nil)
    end
  end

  describe "encrypt_password" do
    it "encrypts before save" do
      @user.password_hash.should_not eq(hash)
    end
  end

  describe "get_trending_cats" do
    it "is correct under normal conditions" do
      one = @user.records.create!(raw: "workout, swim", target: Time.now)
      two = @user.records.create!(raw: "restaurant", target: Time.now)
      expect(@user.get_trending_cats).to include("workout")
      expect(@user.get_trending_cats).to include("restaurant")
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

end
