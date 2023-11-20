import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import ReactDOM from 'react-dom';

const App: React.FC = () => {

  const [steps, setSteps] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);

  const averageStepLength = 0.82;

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );

  useEffect(() => {
    let subscription: Accelerometer.EventSubscription | null = null;

    const handleMovement = ({ x, y, z }: Accelerometer.ThreeAxisMeasurement) => {
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      if (magnitude > 1.4) {
        setSteps((prevSteps) => prevSteps + 1);
      }
    };

    subscription = Accelerometer.addListener(handleMovement);

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  useEffect(() => {
    setDistance(steps * averageStepLength);
  }, [steps]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Store your device in your pocket and let StepCounter estimate the distance you have walked.</Text>
      <Text style={styles.text}>Steps:</Text>
      <Text style={styles.stepCount}>{steps}</Text>
      <Text style={styles.text}>Distance (m):</Text>
      <Text style={styles.stepCount}>{distance.toFixed(2)}</Text>
      <Text style={styles.footer}>Please note that this is not final; we are still working on it.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  stepCount: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  header:{
    fontSize: 20,
    marginBottom: 30
  },
  footer:{
    fontSize: 20,
    marginTop: 30
  }
});

export default App;