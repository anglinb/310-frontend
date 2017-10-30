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
  Then I wait for 1 second
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
  Then I should see "School Budget"

  # Monthly Budget 2 value guaranteed greater than 28

  Then I wait to see "+ Add a New Budget"
  And I touch "+ Add a New Budget"
  And I touch "budget-name"
  And enter in text box "School Budget 2"
  And I touch "budget-date"
  Then I clear input field number 2
  And enter in text box "30"
  Then I touch done
  Then I touch item "Monthly" of picker number 1
  Then I wait for 1 second
  And I touch "checkmark"
  Then I should see "School Budget 2"
  And I scroll view down
  Then I wait for 1 seconds
  Then I wait to see "hamburger"
  Then I touch image view with label "hamburger"
  Then I wait to see "Budgets"
  Then I touch "Budgets"
  Then I wait for 1 second
  Then I scroll view down
  Then I wait for .1 seconds
  Then I scroll view down
  Then I wait for 1 second
  Then I should see "School Budget 2"


  # Weekly Budget 1

  Then I wait to see "+ Add a New Budget"
  And I touch "+ Add a New Budget"
  And I touch "budget-name"
  And enter in text box "Weekly Costs"
  Then I touch done
  Then I touch item "Weekly" of picker number 1
  Then I wait for 1 second
  And I touch "checkmark"
  Then I should see "Weekly Costs"
  And I scroll view down
  Then I wait for 1 seconds
  Then I wait to see "hamburger"
  Then I touch image view with label "hamburger"
  Then I wait to see "Budgets"
  Then I touch "Budgets"
  Then I wait for 1 seconds
  Then I scroll view down
  Then I wait for .1 seconds
  Then I scroll view down
  Then I wait for .1 seconds
  Then I scroll view down
  Then I wait for .1 seconds
  Then I scroll view down
  Then I wait for .1 seconds
  Then I scroll view down
  Then I wait for .1 seconds
  Then I scroll view down
  Then I wait for .1 seconds
  Then I scroll view down
  Then I wait for .1 seconds
  Then I scroll view down
  Then I wait for 2 seconds
  Then I should see "Weekly Costs"
