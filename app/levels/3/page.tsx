'use client'
import GeneralCanvas from '@/components/generalCanvas'
import { useEffect } from 'react';

const SIZE = 600;
const RADIUS = 10;
const VELOCITY = 5;

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

const ball = { x: SIZE / 4 + RADIUS, y: RADIUS, vx: VELOCITY, vy: VELOCITY, r: RADIUS };
const walls: Record<"up" | "down" | "left" | "right", { from: [number, number], to: [number, number], mode: WallMode }> = {
  up: { from: [SIZE / 2, 0], to: [SIZE / 2, SIZE / 3], mode: WallMode.Through }, 
  left: { from: [0, SIZE / 2], to: [SIZE / 3, SIZE / 2], mode: WallMode.Through }, 
  right: { from: [SIZE, SIZE / 2], to: [SIZE * 2 / 3, SIZE / 2], mode: WallMode.Through }, 
  down: { from: [SIZE / 2, SIZE], to: [SIZE / 2, SIZE * 2 / 3], mode: WallMode.Through }, 
} as const;
let shifting = false;

function onKeyDown(key: string) {
  console.log(key)
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
  console.log("")
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
      wall.mode === WallMode.Block ? "red" : "purple"
    ctx.beginPath();
    ctx.moveTo(...wall.from);
    ctx.lineTo(...wall.to);
    ctx.stroke();
  }

  ctx.fillStyle = "white"
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, RADIUS, 0, 2 * Math.PI, false)
  ctx.fill()

  ball.x += ball.vx;
  ball.y += ball.vy;

  if (ball.x < RADIUS || SIZE - RADIUS < ball.x) {
    ball.vx = -ball.vx;
  }
  if (ball.y < RADIUS || SIZE - RADIUS < ball.y) {
    ball.vy = -ball.vy;
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