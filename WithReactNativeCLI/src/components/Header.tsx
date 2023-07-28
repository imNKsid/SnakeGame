import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import Iconicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../styles/colors';

interface HeaderProps {
  reloadGame: () => void;
  pauseGame: () => void;
  isPaused: boolean;
  children: JSX.Element;
}

const {width} = Dimensions.get('window');

const Header = ({isPaused, pauseGame, reloadGame, children}: HeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={reloadGame}>
        {/* <Iconicon name="reload-circle" size={35} color={Colors.primary} /> */}
        <Image
          source={require('../assets/images/reload.png')}
          style={styles.icons}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={pauseGame}>
        {/* <Icon
          name={isPaused ? 'play-circle' : 'pause-circle'}
          size={35}
          color={Colors.primary}
        /> */}
        {isPaused ? (
          <Image
            source={require('../assets/images/play.png')}
            style={styles.playpause}
          />
        ) : (
          <Image
            source={require('../assets/images/pause.png')}
            style={styles.playpause}
          />
        )}
      </TouchableOpacity>

      {children}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: width,
    flex: 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: Colors.primary,
    borderWidth: 12,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 0,
    padding: 15,
    backgroundColor: Colors.background,
  },
  icons: {
    width: 35,
    height: 35,
  },
  playpause: {
    width: 40,
    height: 40,
  },
});
