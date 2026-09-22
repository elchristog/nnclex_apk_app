import React from 'react';
import { View, Image, StyleSheet, ImageStyle, ViewStyle } from 'react-native';

export const LOGO_URL = 'https://rnnclex.com/wp-content/uploads/2025/06/rn_nclex_logo_large-300x300.webp';

interface AppLogoProps {
  size?: number;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  size = 64,
  borderWidth = 2,
  borderColor = '#3b82f6',
  backgroundColor = '#ffffff',
  style,
}) => {
  const containerStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth,
    borderColor,
    backgroundColor,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const imageStyle: ImageStyle = {
    width: '100%',
    height: '100%',
    borderRadius: size / 2,
  };

  return (
    <View style={[styles.wrapper, containerStyle, style]}>
      <Image
        source={{ uri: LOGO_URL }}
        style={imageStyle}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
});
