# frozen_string_literal: true

class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  rescue_from ArgumentError, with: :render_unprocessable_entity_response

  attr_reader :current_user

  def set_user
    user = User.find_by(authentication_token: request.headers['token'])
    if user.present?
      @current_user = user
    else
      head(:unauthorised)
    end
  end

  private

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.message }, status: :unprocessable_entity
  end
end
