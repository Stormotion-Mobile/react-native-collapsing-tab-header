import { useRef } from "react";
import { Animated } from "react-native";

const useScrollValue = (
  intialValue: 0
): [Animated.Value, (...args: any[]) => void] => {
  const scrollValue = useRef(new Animated.Value(intialValue)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollValue } } }],
    { useNativeDriver: true }
  );

  return [scrollValue, handleScroll];
};

export default useScrollValue;
