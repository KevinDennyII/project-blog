'use client';

import React from 'react';
import clsx from 'clsx';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';
import {motion} from 'framer-motion'

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  // TODO: This value should increase by 1 every second:
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [showPlayButton, setShowPlayButton] = React.useState(true);
  const id = React.useId()

  React.useEffect(() =>{
    if(showPlayButton) return
    const intervalId = setInterval((function() {
      setTimeElapsed((currentValue) => currentValue + 1)
    }), 1000);

    return () => {clearInterval(intervalId)}
  })

  // TODO: This value should cycle through the colors in the
  // COLORS array:
  const selectedColor = COLORS[timeElapsed % COLORS.length];

  function handlePlayButton(){
    setShowPlayButton(!showPlayButton)
    // this removes the short delay that may happen when clicking the play button, not the ideal
    // way to capture time - TODO - grab real time that stopped
    if(showPlayButton) setTimeElapsed(timeElapsed + 1)

  }

  function handleResetButton(){
    setShowPlayButton(true)
    setTimeElapsed(0)
  }

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected =
            color.value === selectedColor.value;

          return (
            <li
              className={styles.color}
            >
              {isSelected && (
                <motion.div
                  className={
                    styles.selectedColorOutline
                  }
                  layoutId={`${id}-selected-color-outline`}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected &&
                    styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>
                  {color.label}
                </VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={handlePlayButton}>
            {!showPlayButton ? <Pause /> : <Play />}
            <VisuallyHidden>{!showPlayButton ? <Pause /> : <Play />}</VisuallyHidden>
          </button>
          <button onClick={handleResetButton}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
