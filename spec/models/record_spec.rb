require "spec_helper"

describe Record do

  describe "time_zone" do
    it "returns correctly in a normal case" do
      user = User.create!(email: "whatever@jeff.is", password: "test", password_confirmation: "test")
      tz = user.records.create!(raw: "time zone, Tokyo", target: Time.now - 5.minutes)
      one = user.records.create!(raw: "workout, swim, 3200 yards", target: Time.now)
      expect(one.time_zone).to eq(ActiveSupport::TimeZone.new("Tokyo"))
    end

    it "when encountering a time zone that doesn't make sense, defaults" do
      user = User.create!(email: "whatever@jeff.is", password: "test", password_confirmation: "test")
      tz1 = user.records.create!(raw: "time zone, Tokyo", target: Time.now - 10.minutes)
      tz2 = user.records.create!(raw: "time zone, foo", target: Time.now - 5.minutes)
      one = user.records.create!(raw: "workout, swim, 3200 yards", target: Time.now)
      expect(one.time_zone).to eq(ActiveSupport::TimeZone.new("Pacific Time (US & Canada)"))
    end
  end

  it "correctly returns local_target" do
    user = User.create!(email: "whatever@jeff.is", password: "test", password_confirmation: "test")
    tz = user.records.create!(raw: "time zone, Tokyo", target: Time.now - 5.minutes)
    one = user.records.create!(raw: "workout, swim, 3200 yards", target: Time.now)
    expect(one.local_target).to eq(one.target.in_time_zone(ActiveSupport::TimeZone.new("Tokyo")))
  end

  it "get_cat_count_per_day" do
    # experimental
  end

  it "get_trending_cats" do
    user = User.create!(email: "whatever@jeff.is", password: "test", password_confirmation: "test")
    one = user.records.create!(raw: "workout, swim", target: Time.now)
    two = user.records.create!(raw: "restaurant", target: Time.now)
    expect(user.get_trending_cats).to include("workout")
    expect(user.get_trending_cats).to include("restaurant")
  end

  it "get_list_of_cat_frequencies" do
  end

  it "correctly returns cats_from_raw" do
    user = User.create!(email: "whatever@jeff.is", password: "test", password_confirmation: "test")
    one = user.records.create!(raw: "workout, swim, 3200 yards", target: Time.now)
    expect(one.cats_from_raw).to eq(['workout', 'swim', '3200 yards'])
  end

  it "cats_from_raw_without_mags" do
    user = User.create!(email: "whatever@jeff.is", password: "test", password_confirmation: "test")
    one = user.records.create!(raw: "1.5 things, 3200 yards, stuff 1.0", target: Time.now)
    expect(one.cats_from_raw_without_mags).to eq(['things', 'yards', 'stuff 1.0'])
  end

  it "calculates hue correctly" do
    user = User.create!(email: "whatever@jeff.is", password: "test", password_confirmation: "test")
    one = user.records.create!(raw: "workout, swim, 3200 yards", target: Time.now)

    minutes = one.local_target.strftime('%k').to_f * 60.0
    minutes += one.local_target.strftime('%M').to_f
    test_hue = (minutes / 1440.0) * 360.0

    expect(one.hue).to eq(test_hue)
  end


end
