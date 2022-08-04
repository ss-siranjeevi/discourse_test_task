# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      before_action :set_user, only: %i[index]

      def index
        users = User.order('created_at ASC').to_json(only: %i[id name email], include: [posts: { only: %i[
                                                       id title description
                                                     ] }])

        render json: { data: JSON.parse(users) }, status: :ok
      end

      def create
        user = User.new(user_params)
        if user.save
          render json: { status: 'Success', message: 'Record saved', data: user }, status: :created
        else
          render json: { status: 'Error', message: 'Record not created' }, status: :bad_request
        end
      end

      private

      def user_params
        params.require(:user).permit(:name, :email, :password)
      end
    end
  end
end
