Feature: Session

Scenario: Create Budget
  Given the app has launched
  Then I wait to see "+ Add a New Budget"
  And I touch "+ Add a New Budget"
  And I touch "budget-name"
  And enter in text box "School Budget"
  And I touch "budget-date"
  Then I touch done
  Then I touch item "Monthly" of picker number 1
  And I touch "checkmark"
  Then I should see "School Budget"
  And I scroll view down
  Then I wait for 1 seconds
  Then I wait to see "hamburger"
  Then I touch image view with label "hamburger"
  Then I wait to see "Budgets"
  Then I touch "Budgets"
  Then I wait for 1 seconds
  Then I scroll view down
  Then I wait for 1 seconds
  Then I should see " School Budget"
