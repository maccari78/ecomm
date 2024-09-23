namespace :verify do
  desc "Verify Admin model and Devise configuration"
  task admin: :environment do
    puts "Checking Admin model..."
    puts "Admin model exists: #{defined?(Admin) == 'constant' && Admin.is_a?(Class)}"
    puts "Admin is using Devise: #{Admin.respond_to?(:devise_modules)}"
    puts "Devise modules for Admin: #{Admin.devise_modules}"
    puts "Admin count: #{Admin.count}"
    
    if Admin.count > 0
      admin = Admin.first
      puts "First admin email: #{admin.email}"
      puts "First admin created at: #{admin.created_at}"
    end
  end
end