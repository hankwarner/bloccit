const ApplicationPolicy = require("./application");

module.exports = class CommentPolicy extends ApplicationPolicy {
  new() {
      return this._isMember();
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