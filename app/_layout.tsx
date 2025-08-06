
import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return <Tabs>
      <Tabs.Screen name="connexion" options={{headerShown: false }}/>
      <Tabs.Screen name="index" options={{headerShown: false}}/>
      <Tabs.Screen name="(pages)" options={{headerShown: false,title: "message"}}/>
     </Tabs>
  
}
