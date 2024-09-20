class CheckoutsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    Rails.logger.info "Received params: #{params.inspect}"

    unless params[:cart].is_a?(Array)
      render json: { error: "Invalid cart format. Expected an array." }, status: 400
      return
    end

    begin
      # Set Stripe API key
      stripe_secret_key = Rails.application.credentials.dig(:stripe, :secret_key)
      if stripe_secret_key.nil? || stripe_secret_key.empty?
        raise StandardError.new("Stripe API key is not configured properly")
      end
      Stripe.api_key = stripe_secret_key

      line_items = params[:cart].map do |item|
        product = Product.find(item["id"])
        product_stock = product.stocks.find{ |ps| ps.size == item["size"] }

        unless product_stock
          raise "Product stock not found for product #{item["id"]} with size #{item["size"]}"
        end

        if product_stock.amount < item["quantity"].to_i
          raise "Not enough stock for #{product.name} in size #{item["size"]}. Only #{product_stock.amount} left."
        end

        { 
          quantity: item["quantity"].to_i,
          price_data: { 
            product_data: {
              name: item["name"],
              metadata: { product_id: product.id, size: item["size"], product_stock_id: product_stock.id }
            },
            currency: "usd",
            unit_amount: item["price"].to_i
          }
        } 
      end

      session = Stripe::Checkout::Session.create(
        mode: "payment",
        line_items: line_items,
        success_url: checkout_success_url,
        cancel_url: checkout_cancel_url,
        shipping_address_collection: { 
          allowed_countries: ['US', 'CA']
        }
      )

      render json: { url: session.url }
    rescue ActiveRecord::RecordNotFound => e
      Rails.logger.error "Record not found: #{e.message}"
      render json: { error: "Product not found. Please refresh your cart." }, status: 400
    rescue Stripe::StripeError => e
      Rails.logger.error "Stripe Error: #{e.message}"
      render json: { error: "An error occurred with the payment processor. Please try again." }, status: 400
    rescue StandardError => e
      Rails.logger.error "Checkout Error: #{e.message}"
      render json: { error: e.message }, status: 400
    end
  end

  def success
    render :success
  end

  def cancel
    render :cancel
  end
end