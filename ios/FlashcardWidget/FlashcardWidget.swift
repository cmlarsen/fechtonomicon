import WidgetKit
import SwiftUI

struct TermData: Codable {
    let id: String
    let term: String
    let translation: String
    let description: String
    let discipline: String
}

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), id: "1", term: "Zornhau", translation: "Wrath Cut", description: "The Wrath Cut. A diagonal cut from the shoulder.", discipline: "German Longsword")
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), id: "1", term: "Zornhau", translation: "Wrath Cut", description: "The Wrath Cut. A diagonal cut from the shoulder.", discipline: "German Longsword")
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [SimpleEntry] = []
        let currentDate = Date()

        // 1. Try to load all terms from JSON file
        var allTerms: [TermData] = []
        if let containerURL = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: "group.com.yetanothersidequest.fechtonomicon.shared") {
            let fileURL = containerURL.appendingPathComponent("terms.json")
            if let data = try? Data(contentsOf: fileURL),
               let terms = try? JSONDecoder().decode([TermData].self, from: data) {
                allTerms = terms
            }
        }

        // 2. Generate timeline entries
        if !allTerms.isEmpty {
            // Create 24 hourly entries with random terms
            for hourOffset in 0..<24 {
                let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
                let randomTerm = allTerms.randomElement()!

                let entry = SimpleEntry(
                    date: entryDate,
                    id: randomTerm.id,
                    term: randomTerm.term,
                    translation: randomTerm.translation,
                    description: randomTerm.description,
                    discipline: randomTerm.discipline
                )
                entries.append(entry)
            }
        } else {
            // Fallback to single term from UserDefaults (Legacy/Single Selection)
            let userDefaults = UserDefaults(suiteName: "group.com.yetanothersidequest.fechtonomicon.shared")
            let id = userDefaults?.string(forKey: "widgetCardId") ?? "1"
            let term = userDefaults?.string(forKey: "widgetTerm") ?? userDefaults?.string(forKey: "widgetTitle") ?? "No Card Selected"
            let translation = userDefaults?.string(forKey: "widgetTranslation") ?? ""
            let description = userDefaults?.string(forKey: "widgetDescription") ?? "Open the app to select a card."
            let discipline = userDefaults?.string(forKey: "widgetDiscipline") ?? "Fechtonomicon"

            let entry = SimpleEntry(date: currentDate, id: id, term: term, translation: translation, description: description, discipline: discipline)
            entries.append(entry)
        }

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let id: String
    let term: String
    let translation: String
    let description: String
    let discipline: String
}

struct FlashcardWidgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
        ZStack {
            // Background for iOS 16 and below
            if #available(iOS 17.0, *) {
                // Handled by containerBackground
            } else {
                Color(red: 248/255, green: 244/255, blue: 232/255)
                    .ignoresSafeArea()
            }

            VStack(alignment: .leading, spacing: 4) {
                // Term
                Text(entry.term)
                    .font(.system(size: 20, weight: .bold, design: .serif))
                    // Text Primary: #333333
                    .foregroundColor(Color(red: 51/255, green: 51/255, blue: 51/255))

                // Translation (New line, italic, lighter)
                if !entry.translation.isEmpty {
                    Text(entry.translation)
                        .font(.system(size: 16, weight: .regular, design: .serif).italic())
                        // Iron Light: #8B8A87
                        .foregroundColor(Color(red: 139/255, green: 138/255, blue: 135/255))
                        .padding(.bottom, 4)
                }

                // Definition
                Text(entry.description)
                    .font(.system(size: 16, weight: .regular, design: .serif))
                    // Iron Main: #5C5B58
                    .foregroundColor(Color(red: 92/255, green: 91/255, blue: 88/255))
                    .lineLimit(nil)
                    .minimumScaleFactor(0.8)

                Spacer(minLength: 0) // Push content to top
            }
            .padding(16)
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading) // Force full width/height and top-leading alignment
        }
        .widgetURL(URL(string: "fechtonomicon://card/\(entry.id)"))
    }
}

struct FlashcardWidget: Widget {
    let kind: String = "FlashcardWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            FlashcardWidgetEntryView(entry: entry)
                .widgetBackground(Color(red: 248/255, green: 244/255, blue: 232/255))
        }
        .configurationDisplayName("Term & Definition")
        .description("Displays a HEMA term and its definition.")
        .supportedFamilies([.systemSmall, .systemMedium])
        .disableContentMargins()
    }
}

extension WidgetConfiguration {
    func disableContentMargins() -> some WidgetConfiguration {
        if #available(iOSApplicationExtension 17.0, *) {
            return self.contentMarginsDisabled()
        } else {
            return self
        }
    }
}

extension View {
    func widgetBackground(_ color: Color) -> some View {
        if #available(iOS 17.0, *) {
            return containerBackground(color, for: .widget)
        } else {
            return background(color)
        }
    }
}

struct FlashcardWidget_Previews: PreviewProvider {
    static var previews: some View {
        FlashcardWidgetEntryView(entry: SimpleEntry(date: Date(), id: "1", term: "Zornhau", translation: "Wrath Cut", description: "The Wrath Cut. A diagonal cut from the shoulder.", discipline: "Longsword"))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
