#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Installing dependencies..."
bundle install

echo "Precompiling assets..."
bundle exec rake assets:precompile

echo "Cleaning assets..."
bundle exec rake assets:clean

echo "Running migrations..."
bundle exec rails db:migrate

# Post-deploy: Crear Admin si no existe
echo "Creating Admin user if not exists..."
bundle exec rails runner 'Admin.create!(email: "admin@example.com", password: "password", password_confirmation: "password") unless Admin.exists?(email: "admin@example.com")'

echo "Admin user count:"
bundle exec rails runner 'puts Admin.count'

echo "Admin email:"
bundle exec rails runner 'puts Admin.first.email if Admin.count > 0'

echo "Verificando creación de Admin..."
bundle exec rails runner 'puts Admin.find_by(email: "admin@example.com").inspect'

