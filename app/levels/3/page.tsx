'use client'
import GeneralCanvas from '@/components/generalCanvas'
import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { Piano } from '@tonejs/piano';

const SIZE = 608;
const RADIUS = 8;
const VELOCITY = 8;
const DELTA = RADIUS - VELOCITY;

const right: (undefined | [string, number])[] = [
                                                                               ['G5', 2], 
  ['C6', 3], undefined, undefined, ['E6', 1], ['G6', 3], undefined, undefined, ['C6', 1], 
  ['B5', 3], undefined, undefined, ['E6', 1], ['G6', 3], undefined, undefined, ['G6', 1], 
  ['A6', 3], undefined, undefined, ['B6', 1], ['C7', 3], undefined, undefined, ['A6', 2], 
  undefined, ['G6', 3], undefined, undefined, undefined, undefined, ['E6', 1], ['D6', 1], 
  ['C6', 3], undefined, undefined, ['C6', 1], ['C6', 3], undefined, ['E6', 1], ['D6', 1], 
  ['C6', 3], undefined, undefined, ['C6', 1], ['C6', 2], undefined, ['D6', 1], ['E6', 1], 
  ['D6', 2], undefined, undefined, ['A5', 1], ['B5', 2], undefined, ['D6', 2], undefined, 
  ['C6', 4], undefined, undefined, undefined, undefined, undefined, 
                                                                    ['G6', 2], undefined, 
  ['E6', 3], undefined, undefined, ['D6', 1], ['C6', 2], undefined, ['G6', 2], undefined, 
  ['B5', 4], undefined, undefined, undefined, undefined, undefined, ['A5', 1], ['B5', 1], 
  ['A5', 3], undefined, undefined, ['B5', 1], ['A5', 2], undefined, ['G5', 2], undefined, 
  ['E6', 4], undefined, undefined, undefined, undefined, undefined, ['G6', 2], undefined, 
  ['E6', 3], undefined, undefined, ['D6', 1], ['C6', 2], undefined, ['G6', 2], undefined, 
  ['B5', 4], undefined, undefined, undefined, undefined, undefined, ['A5', 1], ['B5', 1], 
  ['C6', 3], undefined, undefined, ['C6', 1], ['C6', 2], undefined, ['D6', 1], ['E6', 1], 
  ['D6', 4], undefined, undefined, undefined, undefined, undefined, undefined, 
                                                                               ['G5', 2], 
  ['C6', 3], undefined, undefined, ['E6', 1], ['G6', 3], undefined, undefined, ['C6', 1], 
  ['B5', 3], undefined, undefined, ['E6', 1], ['G6', 3], undefined, undefined, ['G6', 1], 
  ['A6', 3], undefined, undefined, ['B6', 1], ['C7', 3], undefined, undefined, ['A6', 2], 
  undefined, ['G6', 3], undefined, undefined, undefined, undefined, ['E6', 1], ['D6', 1], 
  ['C6', 3], undefined, undefined, ['C6', 1], ['C6', 3], undefined, ['E6', 1], ['D6', 1], 
  ['C6', 3], undefined, undefined, ['C6', 1], ['C6', 2], undefined, ['D6', 1], ['E6', 1], 
  ['D6', 2], undefined, undefined, ['A5', 1], ['B5', 2], undefined, ['D6', 2], undefined, 
  ['C6', 4], undefined, undefined, undefined, undefined, undefined, undefined
]
const left: (undefined | [string, number])[] = [
                                                                               ['G4', 1], 
  ['C4', 1], ['G4', 1], ['C5', 1], ['G4', 1], ['C4', 1], ['G4', 1], ['C5', 1], ['G4', 1], 
  ['E4', 1], ['B4', 1], ['E5', 1], ['B4', 1], ['E4', 1], ['B4', 1], ['E5', 1], ['B4', 1], 
  ['F4', 1], ['C5', 1], ['F5', 1], ['C5', 1], ['F4', 1], ['C5', 1], ['F5', 1], ['C5', 1], 
  ['C4', 1], ['G4', 1], ['C5', 1], ['G4', 1], ['C4', 1], ['G4', 1], ['C5', 1], ['G4', 1], 
  ['A3', 1], ['E4', 1], ['A4', 1], ['E4', 1], ['A3', 1], ['E4', 1], ['A4', 1], ['E4', 1], 
  ['F3', 1], ['C4', 1], ['F4', 1], ['C4', 1], ['F3', 1], ['C4', 1], ['F4', 1], ['C4', 1], 
  ['D4', 1], ['A4', 1], ['D5', 1], ['A4', 1], ['G3', 1], ['D4', 1], ['G4', 1], ['D4', 1], 
  ['C4', 1], ['G4', 1], ['C5', 1], ['G4', 1], ['C4', 1], ['G4', 1], 
                                                                    ['C5', 1], ['G4', 1], 
  ['C4', 1], ['G4', 1], ['C5', 1], ['G4', 1], ['C4', 1], ['G4', 1], ['C5', 1], ['G4', 1], 
  ['E4', 1], ['B4', 1], ['E5', 1], ['B4', 1], ['E4', 1], ['B4', 1], ['E5', 1], ['B4', 1], 
  ['F4', 1], ['C5', 1], ['F5', 1], ['C5', 1], ['G4', 1], ['D5', 1], ['G5', 1], ['D5', 1], 
  ['C4', 1], ['G4', 1], ['C5', 1], ['G4', 1], ['C4', 1], ['G4', 1], ['C5', 1], ['G4', 1], 
  ['C4', 1], ['G4', 1], ['C5', 1], ['G4', 1], ['C4', 1], ['G4', 1], ['C5', 1], ['G4', 1], 
  ['E4', 1], ['B4', 1], ['E5', 1], ['B4', 1], ['E4', 1], ['B4', 1], ['E5', 1], ['B4', 1], 
  ['F4', 1], ['C5', 1], ['F5', 1], ['C5', 1], ['F4', 1], ['C5', 1], ['F5', 1], ['C5', 1], 
  ['G4', 1], ['D5', 1], ['G5', 1], ['D5', 1], ['B5', 2], undefined, undefined, 
                                                                               undefined, 
  ['C4', 1], ['G4', 1], ['C5', 1], ['G4', 1], ['C4', 1], ['G4', 1], ['C5', 1], ['G4', 1], 
  ['E4', 1], ['B4', 1], ['E5', 1], ['B4', 1], ['E4', 1], ['B4', 1], ['E5', 1], ['B4', 1], 
  ['F4', 1], ['C5', 1], ['F5', 1], ['C5', 1], ['F4', 1], ['C5', 1], ['F5', 1], ['C5', 1], 
  ['C4', 1], ['G4', 1], ['C5', 1], ['G4', 1], ['C4', 1], ['G4', 1], ['C5', 1], ['G4', 1], 
  ['A3', 1], ['E4', 1], ['A4', 1], ['E4', 1], ['A3', 1], ['E4', 1], ['A4', 1], ['E4', 1], 
  ['F3', 1], ['C4', 1], ['F4', 1], ['C4', 1], ['F3', 1], ['C4', 1], ['F4', 1], ['C4', 1], 
  ['D4', 1], ['A4', 1], ['D5', 1], ['A4', 1], ['G3', 1], ['D4', 1], ['G4', 1], ['D4', 1], 
  ['C4', 1], ['G4', 1], ['C5', 1], ['G4', 1], ['C4', 1], ['G4', 1], ['C5', 1], 
]

// let index = 0;
let index = left.length - 1;

export default function Tres() {
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const pianoRef = useRef<Piano>();

  useEffect(() => {
    const piano = new Piano({
      velocities: 5,
    });

    piano.toDestination();
    piano.load().then(() => {
      pianoRef.current = piano;
      setLoading(false);
    }).catch(console.log);

    game.reset();

    return () => {
      if (pianoRef.current) {
        pianoRef.current.dispose();
      }
    };
  }, []);

  async function playNote(direction: number) {
    if (!pianoRef.current) return;

    if (Tone.getContext().state !== 'running') {
      await Tone.start();
    }

    const leftNote = left[index];
    const rightNote = right[index];

    // index += direction;
    // if (index > left.length - 1) {
    //   setFinished(true);

    //   game.ball.x += game.ball.vx;
    //   game.ball.y += game.ball.vy;
    //   game.ball.vx = -game.ball.vx;
    //   game.ball.vy = -game.ball.vy;

    //   index = left.length - 1;
    //   return;
    // }

    index -= direction;
    if (index < 0) {
      setFinished(true);
      game.sequence.pop();
      game.ball.x += game.ball.vx;
      game.ball.y += game.ball.vy;
      game.ball.vx = -game.ball.vx;
      game.ball.vy = -game.ball.vy;
      index = 0;
      return;
    }

    if (leftNote) {
      pianoRef.current.keyDown({ note: leftNote[0], time: Tone.now(), velocity: 0.1 });
      pianoRef.current.keyUp({ note: leftNote[0], time: Tone.now() + 1.5 * (leftNote[1] ?? 1) });
    }
    if (rightNote) {
      pianoRef.current.keyDown({ note: rightNote[0], time: Tone.now(), velocity: 0.1 });
      pianoRef.current.keyUp({ note: rightNote[0], time: Tone.now() + 1.5 * (rightNote[1] ?? 1) });
    }
  }

  function onclick() {
    setStarted(true)
    game.reset();
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
      <p>Una pequeña caja de música, que según la leyenda es una reliquia de un gran hombre.</p>
      <p>Retrocediendo en el tiempo, en una noche donde la luz de la luna ilumina la tierra, toca una melodía.</p>
      <p>La melodía fluye silenciosamente en el corazón.</p>
      <p>Por favor, cuida con esmero las piezas dentro de la caja, no las rompas.</p>
      <GeneralCanvas
        animate={(ctx) => {
          const pass = animate(ctx, playNote, started, finished);
          // if (!pass) {
          //   setStarted(false);
          //   leftIndex = 0;
          //   rightIndex = 0;
          // }
        }}
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

const game: {
  ball: { x: number, y: number, vx: number, vy: number, r: number }, 
  walls: Record<'up' | 'left' | 'right' | 'down', { from: [number, number], to: [number, number] }>, 
  targets: [{ x: number, y: number }, { x: number, y: number }][], 
  target: { x: number, y: number }[], 
  lastTarget: number, 
  mode: WallMode, 
  blockKey: boolean, 
  mirrorKey: boolean, 
  sequence: WallMode[], 
  reset(): void
} = {
  ball: { x: SIZE / 4 + RADIUS, y: RADIUS, vx: -VELOCITY, vy: -VELOCITY, r: RADIUS }, 
  walls: {
    up:    { from: [SIZE / 2, 0],    to: [SIZE / 2, SIZE / 3],    }, 
    left:  { from: [0, SIZE / 2],    to: [SIZE / 3, SIZE / 2],    }, 
    right: { from: [SIZE, SIZE / 2], to: [SIZE * 2 / 3, SIZE / 2] }, 
    down:  { from: [SIZE / 2, SIZE], to: [SIZE / 2, SIZE * 2 / 3] }, 
  }, 
  targets: [
    [{ x: SIZE     / 4 + DELTA, y: DELTA }       , { x: DELTA       , y: SIZE     / 4 + DELTA }], 
    [{ x: SIZE * 3 / 4 - DELTA, y: DELTA }       , { x: SIZE - DELTA, y: SIZE     / 4 + DELTA }], 
    [{ x: SIZE     / 4 + DELTA, y: SIZE - DELTA }, { x: DELTA       , y: SIZE * 3 / 4 - DELTA }], 
    [{ x: SIZE * 3 / 4 - DELTA, y: SIZE - DELTA }, { x: SIZE - DELTA, y: SIZE * 3 / 4 - DELTA }], 
  ], 
  
  target: [], 
  lastTarget: 0, 
  mode: WallMode.Through, 
  blockKey: false, 
  mirrorKey: false, 
  sequence: [], 

  reset() {
    this.ball = { x: SIZE / 4 + RADIUS, y: RADIUS, vx: -VELOCITY, vy: -VELOCITY, r: RADIUS };
    this.walls = {
      up:    { from: [SIZE / 2, 0],    to: [SIZE / 2, SIZE / 3],    }, 
      left:  { from: [0, SIZE / 2],    to: [SIZE / 3, SIZE / 2],    }, 
      right: { from: [SIZE, SIZE / 2], to: [SIZE * 2 / 3, SIZE / 2] }, 
      down:  { from: [SIZE / 2, SIZE], to: [SIZE / 2, SIZE * 2 / 3] }, 
    };
    this.targets = [
      [{ x: SIZE     / 4 + DELTA, y: DELTA }       , { x: DELTA       , y: SIZE     / 4 + DELTA }], 
      [{ x: SIZE * 3 / 4 - DELTA, y: DELTA }       , { x: SIZE - DELTA, y: SIZE     / 4 + DELTA }], 
      [{ x: SIZE     / 4 + DELTA, y: SIZE - DELTA }, { x: DELTA       , y: SIZE * 3 / 4 - DELTA }], 
      [{ x: SIZE * 3 / 4 - DELTA, y: SIZE - DELTA }, { x: SIZE - DELTA, y: SIZE * 3 / 4 - DELTA }], 
    ];

    this.target = structuredClone(this.targets[0]);
    this.lastTarget = 0;
    this.mode = WallMode.Through;
    this.blockKey = false;
    this.mirrorKey = false;
    this.sequence = [];
  }
}

function onKeyDown(code: string, e: KeyboardEvent) {
  if (e.repeat) return;

  switch (code) {
    case 'KeyZ':
      game.mode = WallMode.Block;
      game.blockKey = true;
      break;
    case 'KeyX':
      game.mode = WallMode.Mirror;
      game.mirrorKey = true;
      break;
  }
}

function onKeyUp(code: string) {
  switch (code) {
    case 'KeyZ':
      game.mode = game.mirrorKey ? WallMode.Mirror : WallMode.Through;
      game.blockKey = false;
      break;
    case 'KeyX':
      game.mode = game.blockKey ? WallMode.Block : WallMode.Through;
      game.mirrorKey = false;
      break;
  }
}

function animate(ctx: CanvasRenderingContext2D, playNextNote: (dir: number) => void, started: boolean, finished: boolean): boolean {
  ctx.clearRect(0, 0, SIZE, SIZE)

  if (finished) {
    if (!game.sequence.length) {
      return true;
    }

    game.mode = game.sequence[game.sequence.length - 1];
    for (const wall of Object.values(game.walls)) {
      ctx.strokeStyle = 
        game.mode === WallMode.Block ? "red" : 
        game.mode === WallMode.Mirror ? "blue" : "green"
      ctx.beginPath();
      ctx.moveTo(...wall.from);
      ctx.lineTo(...wall.to);
      ctx.stroke();
    }

    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.arc(game.ball.x, game.ball.y, RADIUS, 0, 2 * Math.PI, false)
    ctx.fill()

    const collideEdge = physics();
    const collideWall = contactWall();

    if (collideEdge || collideWall) {
      playNextNote(-1);
      game.sequence.pop();
    }

    return true;
  }

  if (!started) {
    let text = ctx.measureText("Haz clic para comenzar.");
    let width = text.width;
    let height = text.fontBoundingBoxAscent + text.fontBoundingBoxDescent;
    ctx.fillStyle = "#ffffff"
    ctx.font = "48px arial"
    ctx.fillText("Haz clic para comenzar.", (SIZE - width) / 2, (SIZE + height) / 2 - 84)
    
    text = ctx.measureText("Presiona Z/X para cambiar");
    width = text.width;
    height = text.fontBoundingBoxAscent + text.fontBoundingBoxDescent;
    ctx.fillText("Presiona Z/X para cambiar", (SIZE - width) / 2, (SIZE + height) / 2 - 24)
    
    text = ctx.measureText("los modos de control");
    width = text.width;
    height = text.fontBoundingBoxAscent + text.fontBoundingBoxDescent;
    ctx.fillText("los modos de control", (SIZE - width) / 2, (SIZE + height) / 2 + 36)

    return false;
  }

  ctx.lineWidth = 3;
  for (const wall of Object.values(game.walls)) {
    ctx.strokeStyle = 
      game.mode === WallMode.Block ? "red" : 
      game.mode === WallMode.Mirror ? "blue" : "green"
    ctx.beginPath();
    ctx.moveTo(...wall.from);
    ctx.lineTo(...wall.to);
    ctx.stroke();
  }

  ctx.fillStyle = "purple"
  ctx.beginPath()
  ctx.arc(game.target[0].x, game.target[0].y, RADIUS, 0, 2 * Math.PI, false)
  ctx.fill()

  ctx.fillStyle = "orange"
  ctx.fillRect(game.target[0].x - RADIUS, game.target[0].y - RADIUS, RADIUS * 2, RADIUS * 2);

  ctx.fillStyle = "white"
  ctx.beginPath()
  ctx.arc(game.ball.x, game.ball.y, RADIUS, 0, 2 * Math.PI, false)
  ctx.fill()

  const collide = physics();
  
  if (collide) {
    game.sequence.push(game.mode);
    playNextNote(1);

    if (game.ball.x === game.target[0].x && game.ball.y === game.target[0].y) {
      game.target.shift();
      if (game.target.length === 0) {
        let r = game.lastTarget
        while (r === game.lastTarget) {
          r = Math.floor(Math.random() * game.targets.length);
        }
        let [a, b] = game.targets[r];
        if (Math.random() > 0.5) {
          [a, b] = [b, a];
        }
        game.lastTarget = r;
        game.target = [a, b];
      }
    }
    else {
      return false;
    }
  }

  if (contactWall()) {
    game.sequence.push(game.mode);
    game.mode = WallMode.Through;
    playNextNote(1);

  }

  return true;
}

function physics(): boolean {
  game.ball.x += game.ball.vx;
  game.ball.y += game.ball.vy;

  if (game.ball.x < RADIUS || SIZE - RADIUS < game.ball.x) {
    game.ball.vx = -game.ball.vx;
    return true;
  }
  if (game.ball.y < RADIUS || SIZE - RADIUS < game.ball.y) {
    game.ball.vy = -game.ball.vy;
    return true;
  }
  return false;
}

function contactWall(): boolean {
  if (game.ball.x === SIZE / 2) {
    switch (game.mode) {
      case WallMode.Block:
        game.ball.vx = -game.ball.vx;
        break;

      case WallMode.Mirror:
        game.ball.vy = -game.ball.vy;
    }
    return true;
  }

  if (game.ball.y === SIZE / 2) {
    switch (game.mode) {
      case WallMode.Block:
        game.ball.vy = -game.ball.vy;
        break;

      case WallMode.Mirror:
        game.ball.vx = -game.ball.vx;
    }
    return true;
  }

  return false;
}