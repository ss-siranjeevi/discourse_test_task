# frozen_string_literal: true

module Api
  module V1
    class SessionsController < ApplicationController
      def create
        user = User.where(email: params[:email]).first
        if user.password == params[:password]
          render json: user.as_json(only: %i[name authentication_token email id]), status: :created
        else
          render json: { message: 'unauthorized' }, status: :unauthorized
        end
      end

      def destroy
        if current_user
          current_user = nil
          render json: { message: 'Loged out successfuly' }
        else
          render json: { message: 'You not loged In' }
        end
      end
    end
  end
end
