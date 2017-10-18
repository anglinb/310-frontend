
export default class NotificationsHelper {

  constructor({ budget, thresholds = [ 0.5, 0.9 ] })  {
    this.budget = budget
    this.thresholds = thresholds
  }

  setThresholdMet(category){
    for (var i=this.thresholds.length-1; i>=0; i++) {
      if (category.categoryBudgetPercentage()>=thresholds[i]){
            category.thresholdmet = thresholds[i];
      }
    }
  }

  calculateThresholds() {
    // Should return any categories that are over a threshold

    //For each budget
    for (var i=0; i<this.budget.categories.length; i++) {
      setThresholdMet(this.budget.categories[i]);
    }
  }

}
