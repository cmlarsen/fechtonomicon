import Foundation
import React
import WidgetKit

@objc(WidgetBridge)
class WidgetBridge: NSObject {

  static let suiteName = "group.com.hemaflashcards.shared"
  static let widgetDataKey = "widgetCardData"

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc
  func updateWidgetData(_ cardDataString: String,
                        resolver: @escaping RCTPromiseResolveBlock,
                        rejecter: @escaping RCTPromiseRejectBlock) {
    guard let sharedDefaults = UserDefaults(suiteName: WidgetBridge.suiteName) else {
      rejecter("SHARED_DEFAULTS_ERROR", "Could not access shared UserDefaults", nil)
      return
    }

    sharedDefaults.set(cardDataString, forKey: WidgetBridge.widgetDataKey)
    sharedDefaults.synchronize()

    resolver(true)
  }

  @objc
  func reloadWidget(_ resolver: @escaping RCTPromiseResolveBlock,
                    rejecter: @escaping RCTPromiseRejectBlock) {
    #if os(iOS)
    if #available(iOS 14.0, *) {
      WidgetCenter.shared.reloadAllTimelines()
    }
    #endif
    resolver(true)
  }
}
