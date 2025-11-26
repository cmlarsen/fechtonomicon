import WidgetKit
import SwiftUI

struct GuessProvider: TimelineProvider {
    func placeholder(in context: Context) -> GuessEntry {
        GuessEntry(date: Date(), title: "Zornhau", discipline: "German Longsword", cardId: "zornhau")
    }

    func getSnapshot(in context: Context, completion: @escaping (GuessEntry) -> ()) {
        let entry = GuessEntry(date: Date(), title: "Zornhau", discipline: "German Longsword", cardId: "zornhau")
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [GuessEntry] = []
        let currentDate = Date()

        // Read data from App Group
        let userDefaults = UserDefaults(suiteName: "group.com.yetanothersidequest.fechtonomicon.shared")
        let title = userDefaults?.string(forKey: "widgetTitle") ?? "No Card Selected"
        let discipline = userDefaults?.string(forKey: "widgetDiscipline") ?? "Fechtonomicon"
        let cardId = userDefaults?.string(forKey: "widgetCardId") ?? ""

        let entry = GuessEntry(date: currentDate, title: title, discipline: discipline, cardId: cardId)
        entries.append(entry)

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

struct GuessEntry: TimelineEntry {
    let date: Date
    let title: String
    let discipline: String
    let cardId: String
}

struct GuessWidgetEntryView : View {
    var entry: GuessProvider.Entry

    var body: some View {
        ZStack {
            Color("WidgetBackground")
                .ignoresSafeArea()

            VStack(alignment: .center, spacing: 12) {
                Text(entry.discipline)
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .textCase(.uppercase)

                Text(entry.title)
                    .font(.title3)
                    .fontWeight(.bold)
                    .foregroundColor(.primary)
                    .multilineTextAlignment(.center)

                Link(destination: URL(string: "fechtonomicon://card/\(entry.cardId)")!) {
                    Text("Tap to Reveal")
                        .font(.caption)
                        .fontWeight(.semibold)
                        .foregroundColor(.white)
                        .padding(.vertical, 6)
                        .padding(.horizontal, 12)
                        .background(Color.blue) // Use app theme color if possible
                        .cornerRadius(12)
                }
            }
            .padding()
        }
        .widgetURL(URL(string: "fechtonomicon://card/\(entry.cardId)"))
    }
}

struct GuessWidget: Widget {
    let kind: String = "GuessWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: GuessProvider()) { entry in
            GuessWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Guess the Definition")
        .description("Shows a term. Tap to reveal the definition in the app.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}
