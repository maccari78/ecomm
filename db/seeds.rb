# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
#   
admin_email = 'maccari78@gmail.com'
admin_password = 'n0m3nN3sc10'

unless Admin.exists?(email: admin_email)
  Admin.create!(
    email: admin_email,
    password: admin_password,
    password_confirmation: admin_password
  )
  puts "Admin user created with email: #{admin_email}"
else
  puts "Admin user already exists with email: #{admin_email}"
end

