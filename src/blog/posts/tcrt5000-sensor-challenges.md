---
slug: tcrt5000-sensor-challenges
title: "Reading Data from a TCRT5000 Sensor: From Testing to Integration"
description: "How I tested TCRT5000 infrared sensors using ESP32 analogue readings, sample averaging, and threshold-based detection for an IoT RC car racing system."
date: 2026-10-13
category: IoT
project: racetrack-circuit
tags:
  - TCRT5000
  - ESP32
  - Embedded Systems
  - Sensors
  - Debugging
readingTime: 5
coverImage:
coverAlt:
featured: true
draft: false
---

# Reading Data from a TCRT5000 Sensor: From Testing to Integration

Getting a sensor to produce a reading is one thing. Getting that reading to work reliably as part of a larger system is another.

While developing our RC Car IoT Racing System, I worked with TCRT5000 infrared sensors as part of the track's movement and lap-detection setup. The track circuit used five TCRT5000 sensors alongside servos, a stepper motor, a DC motor, and an ESP32-based control system.

One of the challenges we encountered was inconsistent sensor triggering in sunlight. This made sensor behaviour something we needed to pay attention to rather than simply assuming that a basic reading would be sufficient.

Here's how I approached sensor testing and incorporated analogue readings into the track controller.

## 1. Starting with individual sensor readings

My first step was to isolate the sensor-reading process and inspect the output through the Arduino IDE's Serial Monitor.

The standalone test sketch reads three analogue sensor inputs connected to ESP32 GPIOs 32, 34, and 35. It also reads a separate digital input on GPIO 13.

For the analogue sensors, the code uses `analogRead()` and prints the results alongside the corresponding pin numbers.

```cpp
const int sensorPins[3] = {32, 34, 35};
int sensorValues[3];

int readAveraged(int pin, int samples) {
  long sum = 0;

  for (int i = 0; i < samples; i++) {
    sum += analogRead(pin);
    delay(2);
  }

  return sum / samples;
}
```

Rather than relying on a single reading, the function takes five samples and returns their arithmetic mean.

This provides a simple way to inspect the sensor output while reducing the influence of variation between individual samples. Averaging does not eliminate every source of noise or guarantee reliable detection, but it gives the controller a more consistent value to work with.

The readings are printed to the Serial Monitor approximately every 200 milliseconds, making it possible to observe how the reported values change over time.

## 2. Why analogue readings?

The integrated controller needed to make decisions based on the values reported by the track sensors.

Using analogue readings allowed the code to compare the sensor output against a numerical threshold instead of relying exclusively on a digital HIGH or LOW state.

In the integrated sketch, the three track sensors use GPIOs 32, 34, and 35. Their readings are averaged before being compared with a shared threshold:

```cpp
const int sensorPins[3] = {32, 34, 35};
const int irAnalogThreshold = 200;

int readAveraged(int pin, int samples) {
  long total = 0;

  for (int i = 0; i < samples; i++) {
    total += analogRead(pin);
    delayMicroseconds(200);
  }

  return total / samples;
}
```

The two sketches use different sampling delays: the standalone test waits two milliseconds between samples, while the integrated controller uses a 200-microsecond delay.

This is an example of how code written for isolated testing can differ from code integrated into a larger application with other tasks to perform.

The threshold of 200 is the value configured in this particular implementation. It should not be treated as a universal TCRT5000 threshold because readings depend on the module, its configuration, the wiring, and the operating conditions.

## 3. Moving from readings to detection

Once the analogue readings were integrated into the track controller, the next step was deciding when a reading should count as a detection.

The controller does not trigger a servo immediately whenever a single averaged reading falls below the threshold. Instead, it requires the condition to remain true for a configured period.

The relevant logic is:

```cpp
const int irAnalogThreshold = 200;
const int stableTime = 100;

// Inside the sensor-processing loop:
int sensorValue = readAveraged(sensorPins[i], 5);

if (sensorValue < irAnalogThreshold) {
  if (lastBelowThreshold[i] == 0) {
    lastBelowThreshold[i] = now;
  } else if (now - lastBelowThreshold[i] >= stableTime) {
    servos[i].write(targetPos[i]);
    servoTriggered[i] = true;
    triggerTime[i] = now;
  }
} else {
  lastBelowThreshold[i] = 0;
}
```

This simplified example illustrates the threshold and stability logic from the integrated sketch. It omits the surrounding servo-state and cooldown checks.

The controller requires the reading to remain below 200 for approximately 100 milliseconds before triggering the servo. If the reading rises above the threshold, the stability timer is reset.

This helps avoid reacting immediately to brief threshold crossings. However, it also introduces a delay before a detection is accepted, so the timing needs to suit the physical system.

After triggering, the full implementation holds the servo at its target position for seven seconds before returning it to its home position, followed by a three-second cooldown before another trigger can be accepted.

The project also uses a separate digital input on GPIO 13 for an IR-trigger event communicated to the backend. Analogue readings therefore handle the three track-sensor control paths, while digital detection remains part of another function.

## 4. The challenge of sunlight

One of the issues we encountered with the TCRT5000 sensors was false triggering in sunlight.

This highlighted an important consideration when working with reflective infrared sensors: their behaviour depends on the optical conditions around them, not just on the code reading their output.

Analogue readings provide more information than a simple binary state, but that does not automatically make a sensor immune to ambient light or other environmental influences.

A threshold that works in one environment may not behave identically in another. Averaging samples and requiring a stable detection are useful software techniques, but they do not, by themselves, prove that the underlying lighting problem has been resolved.

For a more complete investigation, I would want to record actual sensor readings under different lighting conditions and document which threshold and configuration provide reliable detection.

## 5. From a sensor test to an integrated system

The difference between the two sketches reflects the wider development process.

The standalone sketch focuses on observing the sensor outputs. The integrated sketch uses those readings to control servos and coordinate behaviour with other parts of the racetrack system.

The track controller also handles Wi-Fi communication, a TFT display, a stepper motor, and a DC motor. Sensor processing therefore operates alongside several other responsibilities.

This is why I found it useful to separate the initial task of understanding sensor readings from the larger task of integrating them into the system.

A component can appear to work during a simple test while still presenting challenges when it becomes part of a complete physical application.

## What I learned

Working with the TCRT5000 sensors reinforced the importance of understanding the data coming from hardware before building control logic around it.

Reading analogue values, averaging samples, choosing a threshold, and requiring a stable detection are distinct decisions. Each affects how the system responds to the physical environment.

The experience also highlighted that software techniques can improve how readings are processed, but they cannot replace testing under the conditions in which the hardware will actually operate.

For me, the most useful lesson was that embedded development involves an ongoing interaction between code, hardware, and the environment. Getting a reading is only the beginning; making that reading useful to the wider system is where the engineering challenge becomes interesting.
