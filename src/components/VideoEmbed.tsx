import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import {
  borderRadius,
  colors,
  fontFamily,
  fontSize,
  spacing,
} from "../theme/tokens";

import React from "react";
import type { VideoLink } from "../types/flashcard";
import YoutubePlayer from "react-native-youtube-iframe";

interface VideoEmbedProps {
  videoLink: VideoLink;
}

const extractYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export const VideoEmbed: React.FC<VideoEmbedProps> = ({ videoLink }) => {
  const { width } = useWindowDimensions();
  const videoHeight = Math.round(width * (9 / 16));
  const [playing, setPlaying] = React.useState(false);

  const handleOpenVideo = React.useCallback(() => {
    Linking.openURL(videoLink.url).catch((err) => {
      console.error("Failed to open video URL:", err);
    });
  }, [videoLink.url]);

  const videoId = extractYouTubeVideoId(videoLink.url);

  if (!videoId) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Invalid YouTube URL</Text>
      </View>
    );
  }

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
  const iframeTitle = videoLink.title || "YouTube video";

  // For web platform, use native iframe
  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        {videoLink.title && (
          <Text style={styles.videoTitle}>{videoLink.title}</Text>
        )}
        <View style={styles.videoContainer}>
          {/* @ts-ignore - web-specific iframe */}
          <iframe
            src={embedUrl}
            title={iframeTitle}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: borderRadius.md,
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <View style={styles.fallbackOverlay}>
            <TouchableOpacity
              style={styles.fallbackButton}
              onPress={handleOpenVideo}
              activeOpacity={0.7}
            >
              <Text style={styles.fallbackButtonText}>Watch on YouTube</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // For native platforms, use react-native-youtube-iframe
  return (
    <View style={styles.container}>
      {videoLink.title && (
        <Text style={styles.videoTitle}>{videoLink.title}</Text>
      )}
      <View style={[styles.videoContainer, styles.nativeVideoContainer]}>
        <YoutubePlayer
          width={302}
          height={165}
          videoId={videoId}
          play={playing}
          onChangeState={(state: string) => {
            if (state === "ended") {
              setPlaying(false);
            }
          }}
          onError={(error: string) => {
            console.error("YouTube player error:", error);
            handleOpenVideo();
          }}
        />
      </View>
    </View>
  );
};

interface VideoSectionProps {
  videoLinks: VideoLink[];
}

export const VideoSection: React.FC<VideoSectionProps> = ({ videoLinks }) => {
  if (!videoLinks || videoLinks.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      {videoLinks.map((videoLink) => (
        <VideoEmbed key={videoLink.url} videoLink={videoLink} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  section: {
    marginBottom: spacing.md,
  },
  videoTitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.iron.main,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  videoContainer: {
    width: "100%",
    borderRadius: borderRadius.md,
    overflow: "hidden",
    // backgroundColor: colors.parchment.dark,
    borderWidth: 1,
    borderColor: colors.gold.main,
    position: "relative",
  },
  nativeVideoContainer: {
    aspectRatio: undefined,
    height: undefined,
  },
  fallbackOverlay: {
    position: "absolute",
    bottom: spacing.sm,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "box-none",
  },
  fallbackButton: {
    backgroundColor: colors.burgundy.main,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.gold.main,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  fallbackButtonText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.parchment.primary,
    textAlign: "center",
  },
  errorContainer: {
    padding: spacing.md,
    backgroundColor: colors.parchment.light,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.gold.dark,
  },
  errorText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.body,
    color: colors.iron.main,
    textAlign: "center",
  },
});
