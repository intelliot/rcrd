class CreateCatAppearances < ActiveRecord::Migration
  def change 
    create_table :appearances do |t|
      t.belongs_to :cat
      t.belongs_to :record
      t.string :type
      t.float :magnitude
      t.timestamps
    end

    # Cats were already migrated to settings
    # in a previous migration
    Cat.all.each {|c| c.destroy }
  end
end
