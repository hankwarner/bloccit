const ApplicationPolicy = require("./application");

module.exports = class PostPolicy extends ApplicationPolicy {

  new() {
    if (this.user.isAdmin() || this._isMember()) {
      return true;
    }
  }

  create() {
    return this.new();
  }

  edit() {
    if (this.user.isAdmin() || this._isOwner()) {
      return true;
    }
  }

  update() {
    return this.edit();
  }

  destroy() {
    if (this.user.isAdmin() || this._isOwner()) {
      return true;
    }
  }
}
