class AddDefaultAndNotNullToRecordTz < ActiveRecord::Migration
  def change
    change_column :records, :time_zone, :string, {null: false, default: "Pacific Time (US & Canada)"}
  end
end
