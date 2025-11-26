import Foundation
import WidgetKit

@objc public class WidgetHelper: NSObject {
    @objc public static func reloadWidgets() {
        if #available(iOS 14.0, *) {
            WidgetCenter.shared.reloadAllTimelines()
        }
    }
}
