class CreateSettings < ActiveRecord::Migration
  def change
    if !ActiveRecord::Base.connection.table_exists? 'settings'
      create_table :settings do |t|
        t.string :name
        t.boolean :on
        t.integer :user_id
        t.integer :cat_id
        t.string :content

        t.timestamps
      end

     User.all.each do |user|
       user.cats.each do |cat|
         setting = Setting.new
         setting.name = "dashboard"
         setting.content = cat.name
         setting.user_id = cat.user_id
         setting.on = cat.dashboard
         setting.created_at = cat.created_at
         setting.updated_at = cat.updated_at
         setting.save

         setting = Setting.new
         setting.name = "day_avgs"
         setting.content = cat.name
         setting.user_id = cat.user_id
         setting.on = cat.day_avgs
         setting.created_at = cat.created_at
         setting.updated_at = cat.updated_at
         setting.save
       end
     end 
   end 
  end
end
