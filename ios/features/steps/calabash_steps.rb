Then("enter in text box {string}") do |string|
  keyboard_enter_text(string)
end

Then("I touch view with label {string}") do |string|
  touch("view marked:'#{string}' index:1")
end
