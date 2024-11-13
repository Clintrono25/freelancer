import {
  View,
  Text,
  Image,
} from 'react-native';
import React from 'react';
import styles from '../styles/Style';
import { decode } from "html-entities";

const JobCategoryCard = ({item}) => {
  return (
    <View
    style={styles.jobCatCardParent}>
    <View
      style={styles.jobCatCardImageParentCard}>
      <Image
        resizeMode="stretch"
        style={styles.jobCatCardImageStyle}
        source={{uri: item.icon_image}}
      />
    </View>
    <Text
      style={styles.jobCatCardTextStyle}>
      {decode(item.name)}
    </Text>
  </View>
  )
}

export default JobCategoryCard