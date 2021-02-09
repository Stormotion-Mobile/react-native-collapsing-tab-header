import { RefObject, useEffect, useRef } from "react";
import { Animated } from "react-native";

const useScrollValue = (
  intialValue: number = 0
): [Animated.Value, RefObject<number>, (...args: any[]) => void] => {
  const scrollValue = useRef(new Animated.Value(intialValue)).current;

  const value = useRef<number>(intialValue);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollValue } } }],
    { useNativeDriver: true }
  );

  const setValue: Animated.ValueListenerCallback = (event) => {
    value.current = event.value;
  };

  useEffect(() => {
    const key = scrollValue.addListener(setValue);

    return () => scrollValue.removeListener(key);
  }, []);

  return [scrollValue, value, handleScroll];
};

export default useScrollValue;
