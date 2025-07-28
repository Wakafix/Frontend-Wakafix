const getAIRecommendations = async (workers: Worker[]): Promise<string[]> => {
  console.log("🔥 AI Function Started");
  console.log("📦 Workers received:", workers);

  try {
    const response = await fetch("/api/aiRecommendation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ workers }),
    });

    const data = await response.json();
    console.log("✅ AI Response:", data);

    if (data && data.recommendedIds) {
      return data.recommendedIds;
    } else {
      console.warn("⚠️ No recommendedIds in response");
      return [];
    }
  } catch (error) {
    console.error("❌ AI service failed:", error);
    return [];
  }
};