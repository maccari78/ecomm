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
# Admin user creation is now handled in the render.yaml postDeploy script
# Uncomment and modify the following code if you need to create an admin user during seeding
=begin
admin_email = 'admin@example.com'
admin_password = 'password'

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
=end

# Add any other seed data you need below this line
# For example:
# Category.find_or_create_by!(name: 'Electronics')
# Category.find_or_create_by!(name: 'Books')
# ...

