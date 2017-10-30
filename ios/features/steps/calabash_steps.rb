Then("enter in text box {string}") do |string|
  keyboard_enter_text(string)
end

Then("I touch view with label {string}") do |string|
  touch("RCTImageView marked:'#{string}' index:1")
end



Then("I touch item {string} of picker number {int}") do |string, int|

  int += -1
  touch "UIPickerView index:#{int} label text:'#{string}'"
end


Then("I press back") do
  touch "* marked:'header-back'"
end

Then("I scroll view down") do
  scroll("*", :down)
end
