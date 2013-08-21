class Record < ActiveRecord::Base
  belongs_to :user
  has_many :appearances
  has_many :cats, through: :apprearances 
  attr_accessible :target, :raw, :time_zone
  default_scope order 'target DESC'
  validates_presence_of :raw, :user_id, :target
  before_save :sync_raw_with_cats

  def sync_raw_with_cats
    self.raw.cats_from_raw.each do |raw_cat|
      # split mag up from cat
      mag =
      # if mag, unpluralize cat:w
      if record.user.cats.find_by_name contains 
      # else, create one
        cat = Cat.new
        cat.name = 

      # end
    end
  end

  def local_target
    zone = ActiveSupport::TimeZone.new(self.time_zone)
    self.target.in_time_zone(zone)
  end

  # TODO: Deprecate
  # Tests have been deleted
  # Really? This seems useful
  # TODO: Add tests back in
  def cats_from_raw
    (self.raw || '').split(/,/).map {|cat| cat.strip}
  end

  # TODO: Deprecate, hand this logic over to helper
  # Tests have been deleted
  def cats_from_raw_without_mags
   cats_from_raw.map {|cat| cat.sub /^\s*\d+\.*\d*\s*/, '' }
  end

  # I believe this should be a method on User
  def self.get_weekly_frequency_since(date, cat)
    records = Record.where("target > ? AND raw LIKE ?", date, '%'+cat+'%').count.to_f # TODO: Update
    (records / ((Date.today - date).to_f / 7.0)).round(2)
  end

  def hue
   minutes = self.local_target.strftime('%k').to_f * 60.0
   minutes += self.local_target.strftime('%M').to_f
   (minutes / 1440.0)  * 360.0
  end

  # For temporary backwards compatibility
  def time_zone_text
    if self.raw && self.raw.match("time zone")
      record = self
    else
      target = self.target || Time.now.utc
      record = self.user.records.where("raw LIKE ? AND target < ?", '%time zone%', target).limit(1).first
    end
    if record
      cats = record.cats_from_raw
      cats.delete 'time zone' # not the most elegant thing in the world
      zone_text = cats.first 
      return zone_text || nil
    else
      return nil
    end
  end
end
