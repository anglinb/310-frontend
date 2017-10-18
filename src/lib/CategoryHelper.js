
export default class CategoryHelper {

  constructor(category) {
    this.category = category
    this.logger = () => {} // Replace with console.log
  }

  categoryBudgetAmount() {
    return this.category.amount
  }

  categoryBudgetUsed() {
    return (this.category.transactions || []).reduce( (innerSum, transaction) => {
      return innerSum + transaction.amount
    }, 0)
  }

  categoryBudgetPercentage() {
    const budgetUsed = this.categoryBudgetUsed()
    const budgetAmount = this.categoryBudgetAmount()
    console.log('CATEOGRY BUGE', budgetUsed, budgetAmount)
    if (budgetAmount > 0) {
      return (budgetUsed / budgetAmount) * 100
    } else {
      return 0
    }
  }

}
