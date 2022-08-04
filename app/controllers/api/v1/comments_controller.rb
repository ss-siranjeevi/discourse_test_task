# frozen_string_literal: true

module Api
  module V1
    class CommentsController < ApplicationController
      before_action :set_user, only: %i[index create]

      def index
        comments = Comment.order('created_at ASC').to_json(only: %i[id post_id user_id title])

        render json: { data: JSON.parse(comments) }, status: :ok
      end

      def create
        comment = Comment.create(comment_params.merge(user_id: current_user.id))

        render json: { status: 'Success', data: comment }, status: :ok if comment.save
      rescue StandardError
        render json: { status: 'Error', message: 'Record not created' }, status: :bad_request
      end

      private

      def comment_params
        params.require(:comment).permit(:title, :post_id)
      end
    end
  end
end
