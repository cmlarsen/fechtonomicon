import WidgetKit
import SwiftUI

struct FlashcardEntry: TimelineEntry {
    let date: Date
    let cardTitle: String
    let cardDescription: String
    let discipline: String
}

struct FlashcardProvider: TimelineProvider {
    func placeholder(in context: Context) -> FlashcardEntry {
        FlashcardEntry(
            date: Date(),
            cardTitle: "Vom Tag",
            cardDescription: "The 'From the Roof' guard. A high guard position with the sword held above the head.",
            discipline: "meyer-longsword"
        )
    }

    func getSnapshot(in context: Context, completion: @escaping (FlashcardEntry) -> ()) {
        let entry = loadCardData()
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<FlashcardEntry>) -> ()) {
        let currentDate = Date()
        let refreshDate = Calendar.current.date(byAdding: .hour, value: 1, to: currentDate)!

        let entry = loadCardData()
        let timeline = Timeline(entries: [entry], policy: .after(refreshDate))
        completion(timeline)
    }

    private func loadCardData() -> FlashcardEntry {
        let sharedDefaults = UserDefaults(suiteName: "group.com.hemaflashcards.shared")

        if let cardDataString = sharedDefaults?.string(forKey: "widgetCardData"),
           let cardData = cardDataString.data(using: .utf8),
           let json = try? JSONSerialization.jsonObject(with: cardData) as? [String: Any],
           let title = json["title"] as? String,
           let description = json["description"] as? String,
           let discipline = json["discipline"] as? String {

            return FlashcardEntry(
                date: Date(),
                cardTitle: title,
                cardDescription: description,
                discipline: discipline
            )
        }

        return FlashcardEntry(
            date: Date(),
            cardTitle: "Vom Tag",
            cardDescription: "Open the app to see your flashcards",
            discipline: "meyer-longsword"
        )
    }
}

struct FlashcardWidgetView: View {
    var entry: FlashcardProvider.Entry
    @Environment(\.widgetFamily) var family

    var body: some View {
        ZStack {
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 245/255, green: 230/255, blue: 211/255),
                    Color(red: 237/255, green: 217/255, blue: 191/255)
                ]),
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            .ignoresSafeArea()

            VStack(alignment: .leading, spacing: 10) {
                HStack {
                    Text(entry.cardTitle)
                        .font(.system(size: family == .systemSmall ? 18 : 22, weight: .bold))
                        .foregroundColor(Color(red: 42/255, green: 24/255, blue: 16/255))
                    Spacer()
                    Image(systemName: "sword.fill")
                        .font(.system(size: 16))
                        .foregroundColor(Color(red: 139/255, green: 111/255, blue: 71/255))
                }

                Text(entry.cardDescription)
                    .font(.system(size: family == .systemSmall ? 12 : 14))
                    .foregroundColor(Color(red: 92/255, green: 61/255, blue: 46/255))
                    .lineLimit(family == .systemSmall ? 4 : 6)
                    .fixedSize(horizontal: false, vertical: true)

                Spacer(minLength: 0)
            }
            .padding(16)
        }
        .widgetURL(URL(string: "hemaflashcards://card"))
    }
}

struct FlashcardWidget: Widget {
    let kind: String = "FlashcardWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FlashcardProvider()) { entry in
            if #available(iOS 17.0, *) {
                FlashcardWidgetView(entry: entry)
                    .containerBackground(for: .widget) {
                        LinearGradient(
                            gradient: Gradient(colors: [
                                Color(red: 245/255, green: 230/255, blue: 211/255),
                                Color(red: 237/255, green: 217/255, blue: 191/255)
                            ]),
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    }
            } else {
                FlashcardWidgetView(entry: entry)
            }
        }
        .configurationDisplayName("HEMA Flashcard")
        .description("View a random HEMA flashcard that updates hourly")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

struct FlashcardWidget_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            FlashcardWidgetView(entry: FlashcardEntry(
                date: Date(),
                cardTitle: "Vom Tag",
                cardDescription: "The 'From the Roof' guard. A high guard position with the sword held above the head, point directed backward or slightly forward.",
                discipline: "meyer-longsword"
            ))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
            .previewDisplayName("Small Widget")

            FlashcardWidgetView(entry: FlashcardEntry(
                date: Date(),
                cardTitle: "Zornhau",
                cardDescription: "The 'Wrath Strike'. One of the five Meisterhäue (Master Strikes). A powerful diagonal descending strike that simultaneously attacks and defends.",
                discipline: "meyer-longsword"
            ))
            .previewContext(WidgetPreviewContext(family: .systemMedium))
            .previewDisplayName("Medium Widget")
        }
    }
}
