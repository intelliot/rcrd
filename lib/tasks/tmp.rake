task :assign_time_zones => :environment do
  Record.all.each do |record|
    record.time_zone = record.time_zone_text
    record.save
  end
end
