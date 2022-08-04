# frozen_string_literal: true

class User < ApplicationRecord
  acts_as_token_authenticatable
  validates :email, uniqueness: true
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
end
