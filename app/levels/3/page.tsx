'use client'
import GeneralCanvas from '@/components/generalCanvas'
import { useEffect } from 'react';

const SIZE = 600;
const RADIUS = 10;
const VELOCITY = 10;
const DELTA = RADIUS - VELOCITY;

export default function Tres() {

  useEffect(() => {
  });

  return (
    <>
      <h1>¿Qué cosa hay aquí?</h1>
      <GeneralCanvas
        animate={animate}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
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
let shifting = false;

function onKeyDown(key: string) {
  switch (key) {
    case 'w': case 'W':
      walls.up.mode = shifting ? WallMode.Mirror : WallMode.Block;
      break;
    case 'a': case 'A':
      walls.left.mode = shifting ? WallMode.Mirror : WallMode.Block;
      break;
    case 's': case 'S':
      walls.down.mode = shifting ? WallMode.Mirror : WallMode.Block;
      break;
    case 'd': case 'D':
      walls.right.mode = shifting ? WallMode.Mirror : WallMode.Block;
      break;
    case 'Shift':
      shifting = true;
      if (walls.up.mode === WallMode.Block) walls.up.mode = WallMode.Mirror;
      if (walls.left.mode === WallMode.Block) walls.left.mode = WallMode.Mirror;
      if (walls.down.mode === WallMode.Block) walls.down.mode = WallMode.Mirror;
      if (walls.right.mode === WallMode.Block) walls.right.mode = WallMode.Mirror;
      break;
  }
}

function onKeyUp(key: string) {
  switch (key) {
    case 'w': case "W":
      walls.up.mode = WallMode.Through;
      break;
    case 'a': case "A":
      walls.left.mode = WallMode.Through;
      break;
    case 's': case "S":
      walls.down.mode = WallMode.Through;
      break;
    case 'd': case "D":
      walls.right.mode = WallMode.Through;
      break;
    case 'Shift':
      shifting = false;
      if (walls.up.mode === WallMode.Mirror) walls.up.mode = WallMode.Block;
      if (walls.left.mode === WallMode.Mirror) walls.left.mode = WallMode.Block;
      if (walls.down.mode === WallMode.Mirror) walls.down.mode = WallMode.Block;
      if (walls.right.mode === WallMode.Mirror) walls.right.mode = WallMode.Block;
      break;
  }
}

function animate(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, SIZE, SIZE)

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
    if (walls.up.mode === WallMode.Block && ball.y < SIZE / 2 || walls.down.mode === WallMode.Block && ball.y > SIZE / 2) {
      ball.vx = -ball.vx;
    }
    if (walls.up.mode === WallMode.Mirror && ball.y < SIZE / 2 || walls.down.mode === WallMode.Mirror && ball.y > SIZE / 2) {
      ball.vy = -ball.vy;
    }
  }

  if (ball.y === SIZE / 2) {
    if (walls.left.mode === WallMode.Block && ball.x < SIZE / 2 || walls.right.mode === WallMode.Block && ball.x > SIZE / 2) {
      ball.vy = -ball.vy;
    }
    if (walls.left.mode === WallMode.Mirror && ball.x < SIZE / 2 || walls.right.mode === WallMode.Mirror && ball.x > SIZE / 2) {
      ball.vx = -ball.vx;
    }
  }
}