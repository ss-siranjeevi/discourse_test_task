# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

3.times do |user|
  User.create!(
    name: "abcd #{user}",
    email: "abcd#{user}@gmail.com",
    password: "12345#{user}"
  )
end

3.times do |title|
  Post.create!(
    title: "title #{title}",
    description: "description#{title}"
  )
end
