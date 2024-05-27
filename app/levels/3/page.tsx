'use client'
import GeneralCanvas from '@/components/generalCanvas'
import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { Piano } from '@tonejs/piano';

const SIZE = 600;
const RADIUS = 10;
const VELOCITY = 5;
const DELTA = RADIUS - VELOCITY;

const score = [
                                                  ['G4'], ['G4'], 
  ['C5'], ['C5'], ['C5'], ['E5'], ['G5'], ['G5'], ['G5'], ['C5'], 
  ['B4'], ['B4'], ['B4'], ['E5'], ['G5'], ['G5'], ['G5'], ['G5'], 
  ['A5'], ['A5'], ['A5'], ['B5'], ['C6'], ['C6'], ['A5'], ['A5'], 
  ['G5'], ['G5'], ['G5'], ['G5'], ['G5'], ['G5'], ['E5'], ['D5'], 
  ['C5'], ['C5'], ['C5'], ['C5'], ['C5'], ['C5'], ['E5'], ['D5'], 
  ['C5'], ['C5'], ['C5'], ['C5'], ['C5'], ['C5'], ['D5'], ['E5'], 
  ['D5'], ['D5'], ['D5'], ['A4'], ['B4'], ['B4'], ['C5'], ['D5'], 
  ['C5'], ['C5'], ['C5'], ['C5'], ['C5'], ['C5'], 
]
let scoreIndex = score.length - 1;
// let scoreIndex = 0;

export default function Tres() {
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const pianoRef = useRef<Piano>();

  useEffect(() => {
    const piano = new Piano({
      velocities: 5,
    });

    piano.toDestination();
    piano.load().then(() => {
      pianoRef.current = piano;
      setLoading(false);
    });

    return () => {
      if (pianoRef.current) {
        pianoRef.current.dispose();
      }
    };
  }, []);

  async function playNote() {
    if (!pianoRef.current) return;

    if (Tone.getContext().state !== 'running') {
      await Tone.start();
    }

    const notes = score[scoreIndex];
    scoreIndex = scoreIndex === 0 ? score.length - 1 : scoreIndex - 1;
    // scoreIndex = scoreIndex === score.length - 1 ? 0 : scoreIndex + 1;

    for (const note of notes) {
      pianoRef.current.keyDown({ note, time: Tone.now(), velocity: 0.1 });
      pianoRef.current.keyUp({ note, time: Tone.now() + 1.5 });
    }
  }

  function onclick() {
    setStarted(true)
  }

  if (loading) {
    return (
      <>
        <h1>¿Cómo cantar?</h1>
        <p>Cargando...</p>
      </>
    )
  }

  return (
    <>
      <h1>¿Cómo cantar?</h1>
      <GeneralCanvas
        animate={(ctx) => animate(ctx, playNote, started)}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onClick={onclick}
        width={SIZE}
        height={SIZE}
      ></GeneralCanvas>
    </>
  )
}

enum WallMode {
  Through, Block, Mirror
}

const ball = { x: SIZE / 4 + RADIUS, y: RADIUS, vx: -VELOCITY, vy: -VELOCITY, r: RADIUS };
const walls: Record<"up" | "down" | "left" | "right", { from: [number, number], to: [number, number], mode: WallMode }> = {
  up:    { from: [SIZE / 2, 0],    to: [SIZE / 2, SIZE / 3],     mode: WallMode.Through }, 
  left:  { from: [0, SIZE / 2],    to: [SIZE / 3, SIZE / 2],     mode: WallMode.Through }, 
  right: { from: [SIZE, SIZE / 2], to: [SIZE * 2 / 3, SIZE / 2], mode: WallMode.Through }, 
  down:  { from: [SIZE / 2, SIZE], to: [SIZE / 2, SIZE * 2 / 3], mode: WallMode.Through }, 
} as const;
const targets = [
  [{ x: SIZE     / 4 + DELTA, y: DELTA }       , { x: DELTA       , y: SIZE     / 4 + DELTA }], 
  [{ x: SIZE * 3 / 4 - DELTA, y: DELTA }       , { x: SIZE - DELTA, y: SIZE     / 4 + DELTA }], 
  [{ x: SIZE     / 4 + DELTA, y: SIZE - DELTA }, { x: DELTA       , y: SIZE * 3 / 4 - DELTA }], 
  [{ x: SIZE * 3 / 4 - DELTA, y: SIZE - DELTA }, { x: SIZE - DELTA, y: SIZE * 3 / 4 - DELTA }], 
]

let target = structuredClone(targets[0]);
let lastTarget = 0;
let mode: WallMode = WallMode.Through;
let blockKey: boolean = false;
let mirrorKey: boolean = false;

function onKeyDown(code: string) {
  switch (code) {
    case 'KeyZ':
      mode = WallMode.Block;
      blockKey = true;
      break;
    case 'KeyX':
      mode = WallMode.Mirror;
      mirrorKey = true;
      break;
  }
  walls.up.mode = walls.left.mode = walls.down.mode = walls.right.mode = mode;
}

function onKeyUp(code: string) {
  switch (code) {
    case 'KeyZ':
      mode = mirrorKey ? WallMode.Mirror : WallMode.Through;
      blockKey = false;
      break;
    case 'KeyX':
      mode = blockKey ? WallMode.Block : WallMode.Through;
      mirrorKey = false;
      break;
  }
  walls.up.mode = walls.left.mode = walls.down.mode = walls.right.mode = mode;
}

function animate(ctx: CanvasRenderingContext2D, playNextNote: () => void, started: boolean) {
  ctx.clearRect(0, 0, SIZE, SIZE)

  if (!started) {
    const text = ctx.measureText("Haz clic para comenzar.");
    const width = text.width;
    const height = text.fontBoundingBoxAscent + text.fontBoundingBoxDescent;
    ctx.fillStyle = "#ffffff"
    ctx.font = "48px arial"
    ctx.fillText("Haz clic para comenzar.", (SIZE - width) / 2, (SIZE + height) / 2)
    return;
  }

  ctx.lineWidth = 3;
  for (const wall of Object.values(walls)) {
    ctx.strokeStyle = 
      wall.mode === WallMode.Through ? "green" : 
      wall.mode === WallMode.Block ? "red" : "blue"
    ctx.beginPath();
    ctx.moveTo(...wall.from);
    ctx.lineTo(...wall.to);
    ctx.stroke();
  }

  ctx.fillStyle = "purple"
  ctx.beginPath()
  ctx.arc(target[0].x, target[0].y, RADIUS, 0, 2 * Math.PI, false)
  ctx.fill()

  ctx.fillStyle = "white"
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, RADIUS, 0, 2 * Math.PI, false)
  ctx.fill()

  ball.x += ball.vx;
  ball.y += ball.vy;

  let collide = false;
  if (ball.x < RADIUS || SIZE - RADIUS < ball.x) {
    ball.vx = -ball.vx;
    collide = true;
  }
  if (ball.y < RADIUS || SIZE - RADIUS < ball.y) {
    ball.vy = -ball.vy;
    collide = true;
  }
  
  if (collide) {
    playNextNote();

    if (ball.x === target[0].x && ball.y === target[0].y) {
      target.shift();
      if (target.length === 0) {
        let r = lastTarget
        while (r === lastTarget) {
          r = Math.floor(Math.random() * targets.length);
        }
        let [a, b] = targets[r];
        if (Math.random() > 0.5) {
          [a, b] = [b, a];
        }
        lastTarget = r;
        target = [a, b];
      }
    }
    else {
      // alert("You suck");
    }
  }

  if (ball.x === SIZE / 2) {
    playNextNote();
    switch (mode) {
      case WallMode.Block:
        ball.vx = -ball.vx;
        break;

      case WallMode.Mirror:
        ball.vy = -ball.vy;
    }
  }

  if (ball.y === SIZE / 2) {
    playNextNote();
    switch (mode) {
      case WallMode.Block:
        ball.vy = -ball.vy;
        break;

      case WallMode.Mirror:
        ball.vx = -ball.vx;
    }
  }
}
