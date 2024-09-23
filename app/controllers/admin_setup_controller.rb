# app/controllers/admin_setup_controller.rb
class AdminSetupController < ApplicationController
  def check
    if Admin.exists?(email: 'admin@example.com')
      render plain: 'Admin user already exists'
    else
      admin = Admin.create(email: 'admin@example.com', password: 'password123', password_confirmation: 'password123')
      if admin.persisted?
        render plain: 'Admin user created successfully'
      else
        render plain: 'Failed to create admin user'
      end
    end
  end
end
