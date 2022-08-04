Rails.application.routes.draw do
  get '/', to: 'page#index'
  get '/posts', to: 'page#index'
  get '/signup', to: 'page#index'

  namespace 'api' do
    namespace 'v1' do
      resources :users, only: %i[index create]
      resources :posts
      resources :comments, only: %i[index create]
      post 'signup', to: 'users#create'
      post 'login', to: 'sessions#create'
      delete 'logout', to: 'sessions#destroy'
      resources :sessions, only: %i[create destroy]
    end
  end

  post 'login', to: 'api/v1/sessions#create'
end
