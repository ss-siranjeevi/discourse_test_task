# frozen_string_literal: true

module Api
  module V1
    class PostsController < ApplicationController
      before_action :set_user, only: %i[index show create update destroy]

      def index
        posts = Post.order('created_at ASC').to_json(only: %i[id title description user_id],
                                                     include: [user: { only: %i[
                                                       id name
                                                     ] }, comments: { only: %i[
                                                       id title user_id post_id
                                                     ], include: [user: { only: %i[id name] }] }])

        render json: { data: JSON.parse(posts) }, status: :ok
      end

      def show
        post = Post.find(params[:id]).to_json(only: %i[title description], include: [comments: { only: %i[id title] }])

        if post.present?
          render json: { status: 'Success', message: 'Record present', data: JSON.parse(post) }, status: :found
        end
      rescue StandardError
        render json: { status: 'Error', message: 'Record not found' }, status: :not_found
      end

      def create
        post = Post.new(post_params.merge(user_id: current_user.id))

        render json: { status: 'Success', message: 'Record saved', data: post }, status: :created if post.save
      rescue StandardError
        render json: { status: 'Error', message: 'Record not created' }, status: :bad_request
      end

      def destroy
        post = Post.find(params[:id].to_i)

        post.destroy!
        render json: { status: 'Success', message: 'Deleted post' }, status: :no_content
      rescue StandardError
        render json: { status: 'Error', message: 'Record not found' }, status: :not_found
      end

      def update
        post = Post.find(params[:id].to_i)
        post.update!(post_params.merge(user_id: current_user.id))
        render json: { status: 'Success', message: 'Updated post', data: post }, status: :accepted
      rescue StandardError
        render json: { status: 'Error', message: 'Record not found' }, status: :not_found
      end

      private

      def post_params
        params.require(:post).permit(:title, :description)
      end
    end
  end
end
