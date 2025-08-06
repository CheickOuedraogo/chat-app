import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title:"connexion"}}/>
      <Stack.Screen name="inscription" options={{title:"inscription"}}/>
    </Stack>
  );
}
