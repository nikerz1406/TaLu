import * as React from 'react';
import { View,Text } from 'react-native';
export const Record = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <View><Text>Hi</Text></View>
  );
};
