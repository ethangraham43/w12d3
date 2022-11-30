# frozen_string_literal: true

Rails.application.routes.draw do
  post 'api/test', to: 'application#test' # for testing authentication

  namespace :api, defaults: { format: :json } do
    resources :users, only: :create
    resource :session, only: %i[show create destroy]
  end
end
