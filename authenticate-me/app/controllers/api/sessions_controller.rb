# frozen_string_literal: true

class Api::SessionsController < ApplicationController
  def show
    if current_user
      @user = current_user
      render template: 'api/users/show'
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.find_by_credentials(params[:credential], params[:password])

    if @user
      login!(@user)
      render template: 'api/users/show'
    else
      render json: { errors: ['The provided credentials were invalid.'] }, status: :unauthorized
    end
  end

  def destroy
    return unless current_user

    logout!
    render json: { message: 'successs' }
  end
end
