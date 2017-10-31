Feature: Login

Scenario: New User Scenario
  Given the app has launched
  Then I wait to see "Get Started"
  Then I wait for 2 seconds
  Then I touch "Get Started"
  Then I wait for 2 seconds
  Then I touch text field number 1
  Then enter in text box "cooneys@usc.edu"
  Then I touch text field number 2
  Then enter in text box "testingtheplatform!"
  Then I touch "Login/Sign Up"
  Then I wait for 1 second
  Then I should see "+ Add a New Budget"
  Then I wait to see "hamburger"
  Then I touch view with label "hamburger"
  Then I wait to see "Sign Out"
  Then I touch "Sign Out"
  Then I wait for 1 seconds

Scenario: Reset Password
  Given the app has launched
  Then I wait to see "Get Started"
  Then I wait for 2 seconds
  Then I touch "Get Started"
  Then I wait for 2 seconds
  Then I touch "Change Password"
  Then I wait for 2 seconds
  Then I touch text field number 1
  Then enter in text box "falseemail"
  Then I touch "checkmark"
  Then I touch "OK"
  Then I clear input field number 1
  Then enter in text box "agga140@usc.edu"
  Then I touch "checkmark"
  Then I wait to see "editing-cancel"
  Then I touch "editing-cancel"

Scenario: Previous User Scenario
  Given the app has launched
  Then I wait to see "Get Started"
  Then I wait for 2 seconds
  Then I touch "Get Started"
  Then I wait for 2 seconds
  Then I touch text field number 1
  Then enter in text box "agga140@usc.edu"
  Then I touch text field number 2
  Then enter in text box "test"
  Then I touch "Login/Sign Up"
  Then I wait for 1 second
  Then I touch "OK"
  Then I touch text field number 2
  Then I clear input field number 2
  Then enter in text box "12345"
  Then I touch "Login/Sign Up"
  Then I wait for 5 seconds
  Then I should see "+ Add a New Budget"

