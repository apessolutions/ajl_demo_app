import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDeviceFingerprint } from "@/context/DeviceFingerprintContext";

export default function DeviceStats() {
  const router = useRouter();
  const { fingerprintData, matchResponse } = useDeviceFingerprint();

  if (!fingerprintData) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading fingerprint data...</Text>
      </View>
    );
  }

  // Data sent to server
  const serverData = [
    { label: "IP Address", value: fingerprintData.ip_address },
    { label: "Width", value: `${fingerprintData.width}px` },
    { label: "Timezone", value: fingerprintData.timezone },
    { label: "Platform", value: fingerprintData.platform },
  ];

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Data Sent to Server</Text>

        <View style={styles.infoContainer}>
          {serverData.map((item, index) => (
            <View key={index} style={styles.infoItem}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue} numberOfLines={1} ellipsizeMode="tail">
                {item.value}
              </Text>
            </View>
          ))}
        </View>

        {Object.keys(fingerprintData.custom_parameters).length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Custom Parameters (UTM)</Text>
            <View style={styles.utmContainer}>
              {Object.entries(fingerprintData.custom_parameters).map(([key, value]) => (
                <View key={key} style={styles.utmItem}>
                  <Text style={styles.utmLabel}>{key}:</Text>
                  <Text style={styles.utmValue}>{String(value)}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {matchResponse && (
          <>
            <Text style={styles.sectionTitle}>Match Response</Text>
            <View style={styles.matchContainer}>
              <View style={styles.matchItem}>
                <Text style={styles.matchLabel}>Matched:</Text>
                <Text style={[styles.matchValue, matchResponse.matched ? styles.matchedTrue : styles.matchedFalse]}>
                  {matchResponse.matched ? "Yes" : "No"}
                </Text>
              </View>

              {matchResponse.fingerprint_id && (
                <View style={styles.matchItem}>
                  <Text style={styles.matchLabel}>Fingerprint ID:</Text>
                  <Text style={styles.matchValue}>{matchResponse.fingerprint_id}</Text>
                </View>
              )}

              {matchResponse.custom_parameters && Object.keys(matchResponse.custom_parameters).length > 0 && (
                <>
                  <Text style={styles.matchSubtitle}>Custom Parameters from Match:</Text>
                  {Object.entries(matchResponse.custom_parameters).map(([key, value]) => (
                    <View key={key} style={styles.matchParamItem}>
                      <Text style={styles.matchParamLabel}>{key}:</Text>
                      <Text style={styles.matchParamValue}>{String(value)}</Text>
                    </View>
                  ))}
                </>
              )}
            </View>
          </>
        )}

        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>✓ Fingerprint sent to server</Text>
        </View>

        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
    color: "#333",
  },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    gap: 8,
  },
  infoItem: {
    flex: 1,
    minWidth: "30%",
    maxWidth: "48%",
    padding: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 6,
    margin: 2,
  },
  infoLabel: {
    fontSize: 10,
    color: "#666",
    marginBottom: 4,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#007AFF",
    textAlign: "left",
  },
  utmContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
  },
  utmItem: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  utmLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginRight: 8,
  },
  utmValue: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  matchContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  matchItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  matchLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginRight: 8,
    minWidth: 120,
  },
  matchValue: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    fontWeight: "500",
  },
  matchedTrue: {
    color: "#2E7D32",
    fontWeight: "bold",
  },
  matchedFalse: {
    color: "#D32F2F",
    fontWeight: "bold",
  },
  matchSubtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#888",
    marginTop: 12,
    marginBottom: 4,
  },
  matchParamItem: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingLeft: 12,
  },
  matchParamLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
    marginRight: 8,
  },
  matchParamValue: {
    fontSize: 12,
    color: "#666",
    flex: 1,
  },
  statusContainer: {
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
  },
  statusText: {
    fontSize: 14,
    color: "#2E7D32",
    fontWeight: "500",
  },
  backButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
