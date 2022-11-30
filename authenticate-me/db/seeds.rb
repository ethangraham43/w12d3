# frozen_string_literal: true

ApplicationRecord.transaction do
  puts 'Destroying tables...'
  User.destroy_all

  puts 'Resetting primary keys...'
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts 'Creating users...'

  User.create!(
    username: 'jdoe',
    email: 'jdoe@test.com',
    password: 'password'
  )

  10.times do
    User.create!(
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    )
  end

  puts 'Done!'
end
