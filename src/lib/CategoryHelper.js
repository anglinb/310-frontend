
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
      return innerSum + transaction.value
    }, 0)
  }

  categoryBudgetPercentage() {
    return this.categoryBudgetUsed() / this.categoryBudgetAmount()
  }

}
