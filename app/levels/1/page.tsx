'use client'
import GeneralCanvas from '@/components/generalCanvas'
import { useEffect } from 'react';

const SIZE = 600;

export default function Uno() {
  useEffect(() => {
    // @ts-ignore
    globalThis.test = function () {
      console.log("hi");
    }
  });

  return (
    <>
      <h1>¿Qué cosa hay aquí?</h1>
      <GeneralCanvas
        animate={animate}
        onHover={onHover}
        width={SIZE}
        height={SIZE}
      ></GeneralCanvas>
    </>
  )
}

interface Point {
  id: string;
  m: number;
  g: number;
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  t: string;
}

enum Stage {
  Normal, Gocha, Dropping, Si, Otra
}

const _points: Point[][] = [
  [
    { id: 'i', m: 0, g: 2, x: 0, y: 275, w: 14, h: 36, vx: 0, vy: 0, t: '¡' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 35, h: 36, vx: 0, vy: 0, t: 'H' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 27, h: 26, vx: 0, vy: 0, t: 'o' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 12, h: 36, vx: 0, vy: 0, t: 'l' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'a' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 18, h: 18, vx: 0, vy: 0, t: ' ' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 40, h: 36, vx: 0, vy: 0, t: 'M' }, 
    { id: '7', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'u' }, 
    { id: '8', m: 0, g: 1, x: 0, y: 0, w: 27, h: 26, vx: 0, vy: 0, t: 'n' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 26, h: 36, vx: 0, vy: 0, t: 'd' }, 
    { id: '9', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'o' }, 
    { id: 'e', m: 0, g: 2, x: 0, y: 0, w: 14, h: 36, vx: 0, vy: 0, t: '!' }, 
  ], 
  [
    { id: '0', m: 0, g: 1, x: 0, y: 325, w: 34, h: 36, vx: 0, vy: 0, t: 'A' }, 
    { id: '1', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'q' }, 
    { id: '2', m: 0, g: 1, x: 0, y: 0, w: 27, h: 26, vx: 0, vy: 0, t: 'u' }, 
    { id: '3', m: 0, g: 1, x: 0, y: 0, w: 14, h: 36, vx: 0, vy: 0, t: 'í' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 18, h: 18, vx: 0, vy: 0, t: ' ' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 27, h: 26, vx: 0, vy: 0, t: 'n' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'o' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 18, h: 18, vx: 0, vy: 0, t: ' ' }, 
    { id: '4', m: 0, g: 1, x: 0, y: 0, w: 27, h: 36, vx: 0, vy: 0, t: 'h' }, 
    { id: '5', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'a' }, 
    { id: '6', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'y' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 18, h: 18, vx: 0, vy: 0, t: ' ' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 27, h: 26, vx: 0, vy: 0, t: 'n' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'a' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 26, h: 36, vx: 0, vy: 0, t: 'd' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'a' }, 
    { id: 'p', m: 0, g: 3, x: 0, y: 0, w: 14, h: 14, vx: 0, vy: 0, t: '.' }, 
  ]
]

const answers: Point[][] = [
  [
    { id: '0', m: 0, g: 1, x: 0, y: 300, w: 34, h: 36, vx: 0, vy: 0, t: 'A' }, 
    { id: '1', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'q' }, 
    { id: '2', m: 0, g: 1, x: 0, y: 0, w: 27, h: 26, vx: 0, vy: 0, t: 'u' }, 
    { id: '3', m: 0, g: 1, x: 0, y: 0, w: 14, h: 36, vx: 0, vy: 0, t: 'í' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 18, h: 18, vx: 0, vy: 0, t: ' ' }, 
    { id: '4', m: 0, g: 1, x: 0, y: 0, w: 27, h: 36, vx: 0, vy: 0, t: 'h' }, 
    { id: '5', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'a' }, 
    { id: '6', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'y' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 18, h: 18, vx: 0, vy: 0, t: ' ' }, 
    { id: '7', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'u' }, 
    { id: '8', m: 0, g: 1, x: 0, y: 0, w: 27, h: 26, vx: 0, vy: 0, t: 'n' }, 
    { id: '9', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'o' }, 
  ], [
    { id: '0', m: 0, g: 1, x: 0, y: 300, w: 34, h: 36, vx: 0, vy: 0, t: 'A' }, 
    { id: '1', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'q' }, 
    { id: '2', m: 0, g: 1, x: 0, y: 0, w: 27, h: 26, vx: 0, vy: 0, t: 'u' }, 
    { id: '3', m: 0, g: 1, x: 0, y: 0, w: 14, h: 36, vx: 0, vy: 0, t: 'í' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 18, h: 18, vx: 0, vy: 0, t: ' ' }, 
    { id: '4', m: 0, g: 1, x: 0, y: 0, w: 27, h: 36, vx: 0, vy: 0, t: 'h' }, 
    { id: '5', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'a' }, 
    { id: '6', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'y' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 18, h: 18, vx: 0, vy: 0, t: ' ' }, 
    { id: '7', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'u' }, 
    { id: '8', m: 0, g: 1, x: 0, y: 0, w: 27, h: 26, vx: 0, vy: 0, t: 'n' }, 
    { id: '9', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'o' }, 
    { id: 'p', m: 0, g: 3, x: 0, y: 0, w: 14, h: 14, vx: 0, vy: 0, t: '.' }, 
  ], [
    { id: '0', m: 0, g: 1, x: 0, y: 300, w: 34, h: 36, vx: 0, vy: 0, t: 'A' }, 
    { id: '1', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'q' }, 
    { id: '2', m: 0, g: 1, x: 0, y: 0, w: 27, h: 26, vx: 0, vy: 0, t: 'u' }, 
    { id: '3', m: 0, g: 1, x: 0, y: 0, w: 14, h: 36, vx: 0, vy: 0, t: 'í' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 18, h: 18, vx: 0, vy: 0, t: ' ' }, 
    { id: '4', m: 0, g: 1, x: 0, y: 0, w: 27, h: 36, vx: 0, vy: 0, t: 'h' }, 
    { id: '5', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'a' }, 
    { id: '6', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'y' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 18, h: 18, vx: 0, vy: 0, t: ' ' }, 
    { id: 'i', m: 0, g: 2, x: 0, y: 0, w: 14, h: 36, vx: 0, vy: 0, t: '¡' }, 
    { id: '7', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'u' }, 
    { id: '8', m: 0, g: 1, x: 0, y: 0, w: 27, h: 26, vx: 0, vy: 0, t: 'n' }, 
    { id: '9', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'o' }, 
    { id: 'e', m: 0, g: 2, x: 0, y: 0, w: 14, h: 36, vx: 0, vy: 0, t: '!' }, 
  ], [
    { id: '0', m: 0, g: 1, x: 0, y: 300, w: 34, h: 36, vx: 0, vy: 0, t: 'A' }, 
    { id: '1', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'q' }, 
    { id: '2', m: 0, g: 1, x: 0, y: 0, w: 27, h: 26, vx: 0, vy: 0, t: 'u' }, 
    { id: '3', m: 0, g: 1, x: 0, y: 0, w: 14, h: 36, vx: 0, vy: 0, t: 'í' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 18, h: 18, vx: 0, vy: 0, t: ' ' }, 
    { id: '4', m: 0, g: 1, x: 0, y: 0, w: 27, h: 36, vx: 0, vy: 0, t: 'h' }, 
    { id: '5', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'a' }, 
    { id: '6', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'y' }, 
    { id: '', m: 0, g: 0, x: 0, y: 0, w: 18, h: 18, vx: 0, vy: 0, t: ' ' }, 
    { id: 'i', m: 0, g: 2, x: 0, y: 0, w: 14, h: 36, vx: 0, vy: 0, t: '¡' }, 
    { id: '7', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'u' }, 
    { id: '8', m: 0, g: 1, x: 0, y: 0, w: 27, h: 26, vx: 0, vy: 0, t: 'n' }, 
    { id: '9', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0, t: 'o' }, 
    { id: 'e', m: 0, g: 2, x: 0, y: 0, w: 14, h: 36, vx: 0, vy: 0, t: '!' }, 
    { id: 'p', m: 0, g: 3, x: 0, y: 0, w: 14, h: 14, vx: 0, vy: 0, t: '.' }, 
  ]
];

const si: Point[] = [
  { id: '', m: 0, g: 1, x: 0, y: 0, w: 32, h: 36, vx: 0, vy: 0.5, t: 'S' }, 
  { id: '', m: 0, g: 1, x: 0, y: 0, w: 14, h: 36, vx: 0, vy: 0.5, t: 'í' }, 
  { id: '', m: 0, g: 3, x: 0, y: 0, w: 14, h: 14, vx: 0, vy: 0.5, t: '.' }, 
];

const otra: Point[] = [
  { id: '', m: 0, g: 1, x: 0, y: 0, w: 34, h: 36, vx: 0, vy: 0.5, t: 'A' }, 
  { id: '', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0.5, t: 'q' }, 
  { id: '', m: 0, g: 1, x: 0, y: 0, w: 27, h: 26, vx: 0, vy: 0.5, t: 'u' }, 
  { id: '', m: 0, g: 1, x: 0, y: 0, w: 14, h: 36, vx: 0, vy: 0.5, t: 'í' }, 
  { id: '', m: 0, g: 0, x: 0, y: 0, w: 18, h: 18, vx: 0, vy: 0.5, t: ' ' }, 
  { id: '', m: 0, g: 1, x: 0, y: 0, w: 27, h: 36, vx: 0, vy: 0.5, t: 'h' }, 
  { id: '', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0.5, t: 'a' }, 
  { id: '', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0.5, t: 'y' }, 
  { id: '', m: 0, g: 0, x: 0, y: 0, w: 18, h: 18, vx: 0, vy: 0.5, t: ' ' }, 
  { id: '', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0.5, t: 'o' }, 
  { id: '', m: 0, g: 1, x: 0, y: 0, w: 16, h: 26, vx: 0, vy: 0.5, t: 't' }, 
  { id: '', m: 0, g: 1, x: 0, y: 0, w: 20, h: 26, vx: 0, vy: 0.5, t: 'r' }, 
  { id: '', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0.5, t: 'a' }, 
  { id: '', m: 0, g: 0, x: 0, y: 0, w: 18, h: 18, vx: 0, vy: 0.5, t: ' ' }, 
  { id: '', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0.5, t: 'c' }, 
  { id: '', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0.5, t: 'o' }, 
  { id: '', m: 0, g: 1, x: 0, y: 0, w: 24, h: 26, vx: 0, vy: 0.5, t: 's' }, 
  { id: '', m: 0, g: 1, x: 0, y: 0, w: 26, h: 26, vx: 0, vy: 0.5, t: 'a' }, 
  { id: '', m: 0, g: 3, x: 0, y: 0, w: 14, h: 14, vx: 0, vy: 0.5, t: '.' }, 
];

_points.forEach(expand);
answers.forEach(expand);
expand(si);
expand(otra);

let points = deepCopy(_points).flat().filter(({ t, id }) => t !== ' ' && id)
let stage = Stage.Normal;
let ans: Point[] = [];

const nOnes = points.filter(({ g }) => g === 1).length;

function animate(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, SIZE, SIZE)

  points.forEach(({ x, y, w, h, t }) => {
    ctx.strokeStyle = "#ff0000"
    ctx.lineWidth = 2
    ctx.strokeRect(x - w/2, y - h/2, w, h)
  
    ctx.fillStyle = "#ffffff"
    ctx.font = "48px arial"
    ctx.fillText(t, x - w/2, y + h/2)
  })

  physics();

  switch(stage) {
    case Stage.Normal:
      const c = checkNormal();
      if (c >= 0) {
        ans = answers[c];
        stage = Stage.Gocha;
      }
      break;

    case Stage.Gocha:
      moveToAnswer();
      if (checkGocha()) {
        stage = Stage.Dropping;
        points.forEach(p => p.vy = 1.25);
      }
      break;

    case Stage.Dropping:
      if (points.length === 0) {
        stage = Stage.Si;
        points = si.filter(({ t }) => t !== ' ');
      }
      break;

    case Stage.Si:
      if (points.length === 0) {
        stage = Stage.Otra;
        points = otra.filter(({ t }) => t !== ' ');
      }
      break;

    case Stage.Otra:
      if (points.length === 0) {
        stage = Stage.Otra;
        points = otra;
      }
      break;
  }
}

function onHover(x: number, y: number) {
  points.forEach(point => {
    const { x: px, y: py, w: pw, h: ph } = point;

    const dx = px - x;
    const dy = py - y;
    if (Math.abs(dx) < pw/2 && Math.abs(dy) < ph/2) {
      point.m = 1;
      if (pw/2 - Math.abs(dx) < ph/2 - Math.abs(dy)) {
        point.vx += 0.1 * Math.min(pw/2 / dx, 10);
      }
      else {
        point.vy += 0.1 * Math.min(ph/2 / dy, 10);
      }
    }
  })
}

function expand(sentence: Point[]): void {
  let x = (SIZE - sentence.reduce((acc, { w }) => acc + w, 0) + sentence[0].w) / 2;
  let y = sentence[0].y;
  sentence[0].x = x;
  sentence[0].y = y;

  for (let i = 1; i < sentence.length; i++) {
    x += (sentence[i-1].w + sentence[i].w) / 2;
    sentence[i].x = x;
    sentence[i].y = y + (sentence[0].h - sentence[i].h) / 2;
  }
}

function physics() {
  points = points.filter((point) => {
    point.x += point.vx;
    point.y += point.vy;
  
    if (point.x < -20 || point.x > SIZE + 20 || point.y < -20 || point.y > SIZE + 20) {
      return false;
    }
  
    point.vx *= 0.999;
    point.vy *= 0.999;
  
    point.vx = Math.min(5, Math.max(point.vx, -5))
    point.vy = Math.min(5, Math.max(point.vy, -5))

    return true;
  })
}

function moveToAnswer() {
  points.forEach((point) => {
    const target = ans.find(({ id }) => id === point.id);
    if (!target) return;

    point.x += point.vx;
    point.y += point.vy;
  
    point.vx *= 0.999;
    point.vy *= 0.999;
  
    point.vx = 0.01 * (target.x - point.x);
    point.vy = 0.01 * (target.y - point.y);
  })
}

function checkNormal() {
  if (points.filter(({ g }) => g === 0).length !== 0) return -1;
  if (points.filter(({ m, g }) => g === 1 && !m).length !== nOnes) return -1;

  const escLen = points.filter(({ m, g }) => g === 2 && !m).length;
  if (escLen === 1) return 0;

  const punLen = points.filter(({ g }) => g === 3).length;
  return escLen + punLen;
}

function checkGocha() {
  return points.every((point) => {
    const target = ans.find(({ id }) => id === point.id);
    if (!target) return false;
    return Math.abs(point.x - target.x) < 0.5 && Math.abs(point.y - target.y) < 0.5;
  })
}

function deepCopy<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}