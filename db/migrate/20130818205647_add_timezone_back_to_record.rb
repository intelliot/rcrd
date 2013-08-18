class AddTimezoneBackToRecord < ActiveRecord::Migration
  def change
    add_column :records, :time_zone, :string
  end
end
