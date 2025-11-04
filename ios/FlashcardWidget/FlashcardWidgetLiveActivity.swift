//
//  FlashcardWidgetLiveActivity.swift
//  FlashcardWidget
//
//  Created by Caleb Larsen on 11/3/25.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct FlashcardWidgetAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var emoji: String
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

struct FlashcardWidgetLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: FlashcardWidgetAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom \(context.state.emoji)")
                    // more content
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.emoji)")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension FlashcardWidgetAttributes {
    fileprivate static var preview: FlashcardWidgetAttributes {
        FlashcardWidgetAttributes(name: "World")
    }
}

extension FlashcardWidgetAttributes.ContentState {
    fileprivate static var smiley: FlashcardWidgetAttributes.ContentState {
        FlashcardWidgetAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: FlashcardWidgetAttributes.ContentState {
         FlashcardWidgetAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: FlashcardWidgetAttributes.preview) {
   FlashcardWidgetLiveActivity()
} contentStates: {
    FlashcardWidgetAttributes.ContentState.smiley
    FlashcardWidgetAttributes.ContentState.starEyes
}
