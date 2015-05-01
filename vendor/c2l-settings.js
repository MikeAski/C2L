/* global chrome */

window.C2LSettings = {
  activeByDefault: false,

  loadActive: function (callback) {
    var activeByDefault = this.activeByDefault;

    chrome.storage.local.get('c2l', function (data) {
      if (data.c2l === undefined) {
        callback(activeByDefault);
      } else {
        callback(data.c2l);
      }
    });
  },

  setActive: function (active, callback) {
    chrome.storage.local.set({
      'c2l': active
    }, function () {
      if (chrome.runtime.lastError) {
        throw new Error(chrome.runtime.lastError);
      } else {
        callback(active);
      }
    });
  },

  whenActive: function (callback) {
    chrome.storage.onChanged.addListener(function () {
      this.loadActive(callback);
    }.bind(this));
  }
};
