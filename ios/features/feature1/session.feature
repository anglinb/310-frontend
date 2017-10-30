Feature: Session

Scenario: Create Budget
  Given the app has launched
  Then I wait to see "+ Add a New Budget"
  And I touch "+ Add a New Budget"
  And I wait to see "budget-name"
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

Scenario: Create new category
  Given the user 'agga140@usc.edu' is reset
  Given the app has launched
  Then I wait to see "Personal Expenses"
  Then I wait to see "budget-widget"
  And I touch "budget-widget"
  Then I wait to see "budget-edit"
  And I touch "budget-edit"
  Then I wait to see "+ New Category"
  And I touch "+ New Category"
  Then I touch text field number 1
  Then enter in text box "Clothing"
  Then I touch text field number 2
  Then enter in text box "51"
  Then I touch view with label "checkmark"
  Then I wait to see "Edit Clothing"
  Then I wait to see "editing-cancel"
  Then I wait for 1 seconds
  Then I touch "editing-cancel"
  Then I scroll view down
  Then I wait to see "Clothing"

Scenario: Check Default Categories
    Given the user 'agga140@usc.edu' is reset
    Given the app has launched
    Then I wait to see "+ Add a New Budget"
    And I touch "+ Add a New Budget"
    And I touch "budget-name"
    And enter in text box "Test Budget"
    And I touch "budget-date"
    Then I touch done
    Then I touch item "Monthly" of picker number 1
    Then I wait for 1 second
    And I touch "checkmark"
    Then I should see "Test Budget"
    And I scroll view down
    Then I wait for 1 seconds
    Then I should see "Food and Groceries"
    Then I should see "Entertainment"
    Then I should see "Rent"

Scenario: Add New Transaction
    Given the user 'agga140@usc.edu' is reset
    Given the app has launched
    Then I wait to see "Personal Expenses"
    Then I touch "Personal Expenses"
    Then I wait to see "add-transaction"

    Then I wait for 1.5 second
    Then I touch view with label "add-transaction"
    Then I wait to see "name-transaction"
    And I touch "name-transaction"
    And enter in text box "Trader Joe's Purchase"
    And I touch "description-transaction"
    And enter in text box "Dinner supplies"
    And I touch "amount-transaction"
    And enter in text box "50"
    Then I touch done
    Then I touch item "Personal Expenses" of picker number 1
    Then I wait for 1 second
    And I scroll view down
    Then I wait to see "Food and Groceries"
    Then I touch item "Food and Groceries" of picker number 2
    Then I wait for 2 seconds
    And I touch "checkmark"
    And I scroll view down
    Then I wait for 2 second
    Then I should see "Trader Joe's"
    Then I should see "-$50"
