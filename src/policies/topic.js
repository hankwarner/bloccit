const ApplicationPolicy = require("./application");

module.exports = class TopicPolicy extends ApplicationPolicy {

  new() {
    return this.user.isAdmin();
  }

  create() {
    return this.new();
  }

  edit() {
    return this.user.isAdmin();
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
}