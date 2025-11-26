import WidgetKit
import SwiftUI

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), title: "Zornhau", description: "The Wrath Cut. A diagonal cut from the shoulder.", discipline: "German Longsword")
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), title: "Zornhau", description: "The Wrath Cut. A diagonal cut from the shoulder.", discipline: "German Longsword")
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [SimpleEntry] = []
        let currentDate = Date()

        // Read data from App Group
        let userDefaults = UserDefaults(suiteName: "group.com.yetanothersidequest.fechtonomicon.shared")
        let title = userDefaults?.string(forKey: "widgetTitle") ?? "No Card Selected"
        let description = userDefaults?.string(forKey: "widgetDescription") ?? "Open the app to select a card."
        let discipline = userDefaults?.string(forKey: "widgetDiscipline") ?? "Fechtonomicon"

        let entry = SimpleEntry(date: currentDate, title: title, description: description, discipline: discipline)
        entries.append(entry)

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let title: String
    let description: String
    let discipline: String
}

struct FlashcardWidgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
        ZStack {
            Color("WidgetBackground") // Ensure this color exists in Assets or use a fallback
                .ignoresSafeArea()

            VStack(alignment: .leading, spacing: 8) {
                Text(entry.discipline)
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .textCase(.uppercase)

                Text(entry.title)
                    .font(.headline)
                    .fontWeight(.bold)
                    .foregroundColor(.primary)

                Text(entry.description)
                    .font(.body)
                    .foregroundColor(.secondary)
                    .lineLimit(4)
            }
            .padding()
        }
    }
}

struct FlashcardWidget: Widget {
    let kind: String = "FlashcardWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            FlashcardWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Term & Definition")
        .description("Displays a HEMA term and its definition.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

struct FlashcardWidget_Previews: PreviewProvider {
    static var previews: some View {
        FlashcardWidgetEntryView(entry: SimpleEntry(date: Date(), title: "Zornhau", description: "The Wrath Cut.", discipline: "Longsword"))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
