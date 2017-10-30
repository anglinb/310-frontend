Feature: Session

# Scenario: Create a New Budget
#   Given the user 'agga140@usc.edu' is reset
#   Given the app has launched
#   Then I wait to see "+ Add a New Budget"
#   And I touch "+ Add a New Budget"
#   And I wait to see "budget-name"
#   And I touch "budget-name"
#   And enter in text box "School Budget"
#   And I touch "budget-date"
#   Then I touch done
#   Then I touch item "Monthly" of picker number 1
#   Then I wait for 1 second
#   And I touch "checkmark"
#   Then I should see "School Budget"
#   And I scroll view down
#   Then I wait for 1 seconds
#   Then I wait to see "hamburger"
#   Then I touch image view with label "hamburger"
#   Then I wait to see "Budgets"
#   Then I touch "Budgets"
#   Then I wait for 1 seconds
#   Then I scroll view down
#   Then I wait for 1 seconds
#   Then I should see "School Budget"
#
#   # Monthly Budget 2 value guaranteed greater than 28
#
#   Then I wait to see "+ Add a New Budget"
#   And I touch "+ Add a New Budget"
#   And I touch "budget-name"
#   And enter in text box "School Budget 2"
#   And I touch "budget-date"
#   Then I clear input field number 2
#   And enter in text box "30"
#   Then I touch done
#   Then I touch item "Monthly" of picker number 1
#   Then I wait for 1 second
#   And I touch "checkmark"
#   Then I should see "School Budget 2"
#   And I scroll view down
#   Then I wait for 1 seconds
#   Then I wait to see "hamburger"
#   Then I touch image view with label "hamburger"
#   Then I wait to see "Budgets"
#   Then I touch "Budgets"
#   Then I wait for 1 second
#   Then I scroll view down
#   Then I wait for .1 seconds
#   Then I scroll view down
#   Then I wait for 1 second
#   Then I should see "School Budget 2"
#
#
#   # Weekly Budget 1
#
#   Then I wait to see "+ Add a New Budget"
#   And I touch "+ Add a New Budget"
#   And I touch "budget-name"
#   And enter in text box "Weekly Costs"
#   Then I touch done
#   Then I touch item "Weekly" of picker number 1
#   Then I wait for 1 second
#   And I touch "checkmark"
#   Then I should see "Weekly Costs"
#   And I scroll view down
#   Then I wait for 1 seconds
#   Then I wait to see "hamburger"
#   Then I touch image view with label "hamburger"
#   Then I wait to see "Budgets"
#   Then I touch "Budgets"
#   Then I wait for 1 seconds
#   Then I scroll view down
#   Then I wait for .1 seconds
#   Then I scroll view down
#   Then I wait for .1 seconds
#   Then I scroll view down
#   Then I wait for .1 seconds
#   Then I scroll view down
#   Then I wait for .1 seconds
#   Then I scroll view down
#   Then I wait for .1 seconds
#   Then I scroll view down
#   Then I wait for .1 seconds
#   Then I scroll view down
#   Then I wait for .1 seconds
#   Then I scroll view down
#   Then I wait for 2 seconds
#   Then I should see "Weekly Costs"
#
#
# Scenario: Create Multiple Budgets
#   Given the user 'agga140@usc.edu' is reset
#   Given the app has launched
#
#   # Budget 1
#   Then I wait to see "+ Add a New Budget"
#   And I touch "+ Add a New Budget"
#   And I wait to see "budget-name"
#   And I touch "budget-name"
#   And enter in text box "Test Budget 1"
#   And I touch "budget-date"
#   Then I touch done
#   Then I touch item "Weekly" of picker number 1
#   Then I wait for 1 second
#   And I touch "checkmark"
#   Then I should see "Test Budget 1"
#   And I scroll view down
#   Then I wait for 1 seconds
#   Then I wait to see "hamburger"
#   Then I touch image view with label "hamburger"
#   Then I wait to see "Budgets"
#   Then I touch "Budgets"
#   Then I wait for 1 seconds
#   Then I scroll view down
#   Then I wait for 1 seconds
#   Then I should see "Test Budget 1"
#
#   # Budget 2
#   Then I wait to see "+ Add a New Budget"
#   And I touch "+ Add a New Budget"
#   And I touch "budget-name"
#   And enter in text box "Test Budget 2"
#   And I touch "budget-date"
#   Then I clear input field number 2
#   And enter in text box "5"
#   Then I touch done
#   Then I touch item "Monthly" of picker number 1
#   Then I wait for 1 second
#   And I touch "checkmark"
#   Then I should see "Test Budget 2"
#   And I scroll view down
#   Then I wait for 1 seconds
#   Then I wait to see "hamburger"
#   Then I touch image view with label "hamburger"
#   Then I wait to see "Budgets"
#   Then I touch "Budgets"
#   Then I wait for 1 second
#   Then I scroll view down
#   Then I wait for .1 seconds
#   Then I scroll view down
#   Then I wait for .1 seconds
#   Then I scroll view down
#   Then I wait for .1 seconds
#   Then I scroll view down
#   Then I wait for 1 second
#   Then I should see "Test Budget 2"
#
# Scenario: Create a New Category
#   Given the user 'agga140@usc.edu' is reset
#   Given the app has launched
#   Then I wait to see "Personal Expenses"
#   Then I wait to see "budget-widget"
#   And I touch "budget-widget"
#   Then I wait to see "budget-edit"
#   And I touch "budget-edit"
#   Then I wait to see "+ New Category"
#   And I touch "+ New Category"
#   Then I touch text field number 1
#   Then enter in text box "Clothing"
#   Then I touch text field number 2
#   Then enter in text box "51"
#   Then I touch view with label "checkmark"
#   Then I wait to see "Edit Clothing"
#   Then I wait to see "editing-cancel"
#   Then I wait for 1 seconds
#   Then I touch "editing-cancel"
#   Then I scroll view down
#   Then I wait to see "Clothing"
#   Then I wait to see "Breakdown"
#   Then I touch "Breakdown"
#   Then I wait for 1 second
#   Then I should see "Clothing: $51"
#
#
# Scenario: Check Default Categories
#     Given the user 'agga140@usc.edu' is reset
#     Given the app has launched
#     Then I wait to see "+ Add a New Budget"
#     And I touch "+ Add a New Budget"
#     And I touch "budget-name"
#     And enter in text box "Test Budget"
#     And I touch "budget-date"
#     Then I touch done
#     Then I touch item "Monthly" of picker number 1
#     Then I wait for 1 second
#     And I touch "checkmark"
#     Then I should see "Test Budget"
#     And I scroll view down
#     Then I wait for 1 seconds
#     Then I should see "Food and Groceries"
#     Then I should see "Entertainment"
#     Then I should see "Rent"
#     Then I wait to see "Breakdown"
#     Then I touch "Breakdown"
#     Then I wait for 1 second
#     Then I should see "Food and Groceries: $150"
#     Then I should see "Entertainment: $75"
#     Then I should see "Rent: $1000"
#
# Scenario: Add a New Transaction in Budget
#     Given the user 'agga140@usc.edu' is reset
#     Given the app has launched
#     Then I wait to see "Personal Expenses"
#     Then I touch "Personal Expenses"
#     Then I wait to see "add-transaction"
#     Then I wait for 1.5 second
#     Then I touch view with label "add-transaction"
#     Then I wait to see "name-transaction"
#     And I touch "name-transaction"
#     And enter in text box "Trader Joe's Purchase"
#     And I touch "description-transaction"
#     And enter in text box "Dinner supplies"
#     And I touch "amount-transaction"
#     And enter in text box "50"
#     Then I touch done
#     Then I touch item "Personal Expenses" of picker number 1
#     Then I wait for 1 second
#     And I scroll view down
#     Then I wait to see "Food and Groceries"
#     Then I touch item "Food and Groceries" of picker number 2
#     Then I wait for 2 seconds
#     And I touch "checkmark"
#     And I scroll view down
#     Then I wait for 2 second
#     Then I should see "Trader Joe's"
#     Then I should see "-$50"
#
# Scenario: Check Transaction is in Category
#     Given the user 'agga140@usc.edu' is reset
#     Given the app has launched
#     Then I wait to see "Personal Expenses"
#     Then I touch "Personal Expenses"
#     Then I wait to see "add-transaction"
#     Then I wait for 1.5 second
#     Then I touch view with label "add-transaction"
#     Then I wait to see "name-transaction"
#     And I touch "name-transaction"
#     And enter in text box "Trader Joe's Purchase"
#     And I touch "description-transaction"
#     And enter in text box "Dinner supplies"
#     And I touch "amount-transaction"
#     And enter in text box "50"
#     Then I touch done
#     Then I touch item "Personal Expenses" of picker number 1
#     Then I wait for 1 second
#     And I scroll view down
#     Then I wait to see "Food and Groceries"
#     Then I touch item "Food and Groceries" of picker number 2
#     Then I wait for 2 seconds
#     And I touch "checkmark"
#     And I scroll view down
#     Then I wait for 2 second
#     Then I should see "50/150"
#     And I touch "History"
#     And I touch "Food and Groceries"
#     Then I wait to see "Trader Joe\'s Purchase"
#     Then I press back
#     Then I press back
#     Then I wait for 1 second

Scenario: Test Amount Spent
    Given the user 'agga140@usc.edu' is reset
    Given the app has launched
    Then I wait to see "Personal Expenses"
    Then I touch "Personal Expenses"
    Then I wait to see "add-transaction"
    Then I wait for 1.5 second
    Then I touch view with label "add-transaction"
    Then I wait to see "name-transaction"
    And I touch "name-transaction"
    And enter in text box "Movie Tickets"
    And I touch "description-transaction"
    And enter in text box "AlphaGo Documentary"
    Then I touch done
    Then I touch item "Personal Expenses" of picker number 1
    Then I wait for 1 second
    And I scroll view down
    Then I wait to see "Entertainment"
    Then I touch item "Entertainment" of picker number 2
    Then I wait for 1 second
    And I scroll custom scroll view up

    # test for error on string
    Then I wait for 1 seconds
    Then I touch "amount-transaction"
    And enter in text box "text instead of a number"
    Then I wait for .5 seconds
    And I touch "checkmark"
    Then I should see "OK"
    Then I touch "OK"

    # test for error on negative number
    Then I clear input field number 3
    And enter in text box "-17"
    Then I wait for .5 seconds
    And I touch "checkmark"
    Then I should see "OK"
    Then I touch "OK"


    # should succeed with positive number
    Then I clear input field number 3
    And enter in text box "17"
    Then I touch done
    Then I wait for .5 seconds
    And I touch "checkmark"
    Then I wait for .5 seconds
    And I scroll view up
    Then I wait for 1 second
    Then I should see "$17/$1225"

    And I scroll view down
    Then I wait for 2 second
    Then I should see "17/75"

    Then I press back
    Then I press back
    Then I wait for 1 second
