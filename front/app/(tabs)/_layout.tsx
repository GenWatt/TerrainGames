import { Tabs } from 'expo-router';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import Colors from '@/constants/Colors';
import useMe from '@/features/shared/api/useMe';
import { UserRole } from '@/types';
import DebugDisplay from '@/features/shared/componets/debug/DebugDisplay';

export default function TabLayout() {
  const { user } = useMe();

  return (
    <>
      <DebugDisplay />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.dark.primary,
          tabBarStyle: {
            backgroundColor: Colors.dark.background,
          },
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                text={user?.role && user.role === UserRole.ADMIN ? user.role : ""}
                name={focused ? 'people-circle' : 'people-circle-outline'} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
