def get_first_element_with_label(arr, match)
  arr.each do |element|
    if element["label"].match(match) 
      return element
    end
  end
  return nil
end

Given(/^the app has launched$/) do
  wait_for do
    !query("*").empty?
  end
  sleep 1
  wait_for do
    get_first_element_with_label(query("RCTView"), /^In progress Downloading/).nil?
  end
  sleep 1.5
end

Then(/^I should see '(.*)'$/) do |expected_mark|
  until element_exists("view marked:'#{expected_mark}'") || element_exists("view text:'#{expected_mark}'")
    screenshot_and_raise "No element found with mark or text: #{expected_mark}"
  end
end
