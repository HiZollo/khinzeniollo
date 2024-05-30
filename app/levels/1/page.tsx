'use client'
import GeneralCanvas from '@/components/generalCanvas'
import { useEffect, useState } from 'react';
import data from "./data.json";

const SIZE = 600;
const COSA_SIZE = 210;

interface Point {
  id: string;
  moved: boolean;
  group: Group;
  char: string;
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
}

enum Stage {
  Normal, Gocha, Dropping, Followup, Cosa
}

enum Group {
  Trash, Answer, Exclamation, Period
}

export default function Uno() {
  const [image, setImage] = useState<ImageData>();

  useEffect(() => {
    setImage(new ImageData(new Uint8ClampedArray(data.data), COSA_SIZE, COSA_SIZE));
  }, []);

  if (!image) {
    return (
      <>
        <h1>¿Qué cosa hay aquí?</h1>
        <p>Cargando...</p>
      </>
    )
  }

  return (
    <>
      <h1>¿Qué cosa hay aquí?</h1>
      <GeneralCanvas
        animate={(ctx) => animate(ctx, image)}
        onHover={onHover}
        width={SIZE}
        height={SIZE}
      ></GeneralCanvas>
    </>
  )
}

data.points.forEach(expand);
data.answers.forEach(expand);
data.followup.forEach(expand);

let points = structuredClone(data.points).flat().filter(({ char }) => char !== ' ')
let stage = Stage.Normal;
let ans: Point[] = [];
let cosaAlpha = 1;

const nAnswer = points.filter(({ group }) => group === Group.Answer).length;

function animate(ctx: CanvasRenderingContext2D, image: ImageData) {
  ctx.clearRect(0, 0, SIZE, SIZE)

  points.forEach(({ x, y, w, h, char }) => {
    // ctx.strokeStyle = "#ff0000"
    // ctx.lineWidth = 2
    // ctx.strokeRect(x - w/2, y - h/2, w, h)
  
    ctx.fillStyle = "#ffffff"
    ctx.font = "48px arial"
    ctx.fillText(char, x - w/2, y + h/2)
  })

  physics();

  switch(stage) {
    case Stage.Normal:
      const c = checkNormal();
      if (c >= 0) {
        ans = data.answers[c];
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
        stage = Stage.Followup;
        points = data.followup[0].filter(({ char }) => char !== ' ');
        data.followup.shift();
      }
      break;

    case Stage.Followup:
      if (points.length === 0) {
        if (!data.followup.length) {
          stage = Stage.Cosa;
          break;
        }
        points = data.followup[0].filter(({ char }) => char !== ' ');
        data.followup.shift();
      }
      break;

    case Stage.Cosa:
      ctx.putImageData(image, (SIZE - COSA_SIZE) / 2, (SIZE - COSA_SIZE) / 2);
      
      ctx.globalAlpha = cosaAlpha;
      cosaAlpha = Math.max(cosaAlpha - 0.005, 0);
      ctx.fillStyle = "black";
      ctx.fillRect((SIZE - COSA_SIZE) / 2, (SIZE - COSA_SIZE) / 2, COSA_SIZE, COSA_SIZE);
      ctx.globalAlpha = 1;
      break;
  }
}

function onHover(x: number, y: number) {
  points.forEach(point => {
    const { x: px, y: py, w: pw, h: ph } = point;

    const dx = px - x;
    const dy = py - y;
    if (Math.abs(dx) < pw/2 && Math.abs(dy) < ph/2) {
      point.moved = false;
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
  if (points.some(({ group }) => group === Group.Trash)) return -1;
  if (points.filter(({ moved, group }) => group === Group.Answer && !moved).length !== nAnswer) return -1;

  const excLen = points.filter(({ group }) => group === Group.Exclamation).length;
  if (excLen === 1) return -1;

  const punLen = points.filter(({ group }) => group === Group.Period).length;
  return excLen + punLen;
}

function checkGocha() {
  return points.every((point) => {
    const target = ans.find(({ id }) => id === point.id);
    if (!target) return false;
    return Math.abs(point.x - target.x) < 0.5 && Math.abs(point.y - target.y) < 0.5;
  })
}
