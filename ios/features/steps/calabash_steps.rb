require 'net/http'
require 'uri'
require 'json'

Then("enter in text box {string}") do |string|
  keyboard_enter_text(string)
end


Then("I touch view with label {string}") do |string|
  touch("view marked:'#{string}' index:1")
end

Then("I touch image view with label {string}") do |string|
  touch("RCTImageView marked:'#{string}' index:1")
end

Then("I touch item {string} of picker number {int}") do |string, int|

  int += -1
  touch "UIPickerView index:#{int} label text:'#{string}'"
end


Then("I press back") do
  touch "* marked:'header-back'"
end

Then("I scroll custom scroll view up") do
  scroll("RCTCustomScrollView index:0", :up)
end

Then("I scroll view up") do
  scroll("*", :up)
end

Then("I scroll view down") do
  scroll("*", :down)
end


Given(/^the user '(.*)' is reset$/) do |username|
  uri = URI.parse("http://localhost:3000/_debug/user/reset")

  header = {'Content-Type': 'application/json'}
  user = { username: username }

  # Create the HTTP objects
  http = Net::HTTP.new(uri.host, uri.port)
  request = Net::HTTP::Post.new(uri.request_uri, header)
  request.body = user.to_json

  # Send the request
  response = http.request(request)
end
