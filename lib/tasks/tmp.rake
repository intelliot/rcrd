task :assign_time_zones => :environment do
  Record.all.each do |record|
    record.time_zone = record.time_zone_text
    record.save
  end
end

task :generate_cats => :environment do
  Record.all.each do |record|
    record.cats_from_raw.each do |cat_name|
      record.user.cats.find_or_create_by_name cat_name
    end
  end
end
